import { $, component$, useComputed$, useContext, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { useStyles$ } from "@builder.io/qwik";
import { LocaleContext } from "@/app/providers/locale.provider";
import { getTranslations, t } from "@/i18n/index";
import styles from "@/features/home/presentation/styles/Benchmark.css?inline";

import { GAUGE_C, GAUGE_R, GROUPED, RIVALS, STEP_HOLD_MS, STEP_TRANSITION_MS, RIVAL_PAUSE_MS, totalFeatures, computeScore } from "@/features/home/data/benchmark.data";
import { BenchmarkCategories } from "@/features/home/presentation/sections/BenchmarkCategories";

export const Benchmark = component$(() => {
  useStyles$(styles);
  const locale = useContext(LocaleContext);
  const translations = useComputed$(() => getTranslations(locale.value));

  const isVisible = useSignal(false);
  const activeIdx = useSignal(0); 
  const activeCatIdx = useSignal(0); 
  const stepProgress = useSignal(0); 
  const expandedCats = useSignal<Record<string, boolean>>({});

  const timerState = useStore({ rafId: 0, startTime: 0 });
  const animScores = useStore({ self: 0, rival: 0 });

  const selectedRival = useComputed$(() => RIVALS[activeIdx.value]);

  const toggleCategory = $((catId: string) => {
    expandedCats.value = {
      ...expandedCats.value,
      [catId]: !expandedCats.value[catId],
    };
  });

  const goTo = $((idx: number) => {
    activeIdx.value = idx;
    activeCatIdx.value = 0;
    stepProgress.value = 0;
    expandedCats.value = { [GROUPED[0].category]: true };
    timerState.startTime = Date.now();
  });

  useVisibleTask$(({ cleanup }) => {
    const section = document.getElementById("benchmark");
    if (!section) {
      isVisible.value = true;
      return;
    }
    let pauseElapsed = 0;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          isVisible.value = true;
          timerState.startTime = Date.now() - pauseElapsed;
        } else {
          if (isVisible.value) {
            pauseElapsed = Date.now() - timerState.startTime;
          }
          isVisible.value = false;
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(section);
    cleanup(() => obs.disconnect());
    timerState.startTime = Date.now();
    const catCount = GROUPED.length;
    const rivalCount = RIVALS.length;
    expandedCats.value = { [GROUPED[0].category]: true };
    const scrollToCategory = (catId: string) => {
      const el = document.getElementById(`bmk-cat-${catId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    };
    const scrollToTop = () => {
      const cats = document.querySelector(".bmk__categories");
      if (cats) {
        cats.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const tick = () => {
      if (isVisible.value) {
        const elapsed = Date.now() - timerState.startTime;
        const pct = Math.min((elapsed / STEP_HOLD_MS) * 100, 100);
        stepProgress.value = pct;

        if (elapsed >= STEP_HOLD_MS) {
          const currentCat = activeCatIdx.value;
          const nextCat = currentCat + 1;

          if (nextCat < catCount) {
            activeCatIdx.value = nextCat;
            expandedCats.value = { [GROUPED[nextCat].category]: true };
            stepProgress.value = 0;
            timerState.startTime = Date.now() + STEP_TRANSITION_MS;
            pauseElapsed = Date.now() - timerState.startTime;
            setTimeout(() => scrollToCategory(GROUPED[nextCat].category), 150);
          } else {
            expandedCats.value = {};
            stepProgress.value = 0;

            setTimeout(() => {
              scrollToTop();
              setTimeout(() => {
                const nextRival = (activeIdx.value + 1) % rivalCount;
                activeIdx.value = nextRival;
                activeCatIdx.value = 0;
                expandedCats.value = { [GROUPED[0].category]: true };
                timerState.startTime = Date.now();
                pauseElapsed = 0;
                animScores.self = 0;
                animScores.rival = 0;
              }, RIVAL_PAUSE_MS);
            }, STEP_TRANSITION_MS);

            timerState.startTime = Date.now() + STEP_TRANSITION_MS + RIVAL_PAUSE_MS + 400;
            pauseElapsed = Date.now() - timerState.startTime;
          }
        }
      }
      const targetSelf = computeScore("curricanvas");
      const targetRival = computeScore(RIVALS[activeIdx.value].id);

      if (isVisible.value) {
        if (Math.abs(animScores.self - targetSelf) > 0.1) {
          animScores.self += (targetSelf - animScores.self) * 0.1;
        } else {
          animScores.self = targetSelf;
        }
        if (Math.abs(animScores.rival - targetRival) > 0.1) {
          animScores.rival += (targetRival - animScores.rival) * 0.1;
        } else {
          animScores.rival = targetRival;
        }
      }

      timerState.rafId = requestAnimationFrame(tick);
    };
    timerState.rafId = requestAnimationFrame(tick);
    cleanup(() => cancelAnimationFrame(timerState.rafId));
  });

  const selfScoreTarget = computeScore("curricanvas");
  const rivalScoreTarget = computeScore(selectedRival.value.id);

  const selfOffset = GAUGE_C - (selfScoreTarget / totalFeatures) * GAUGE_C;
  const rivalOffset = GAUGE_C - (rivalScoreTarget / totalFeatures) * GAUGE_C;
  const activeCatId = GROUPED[activeCatIdx.value]?.category;

  return (
    <section
      class={`bmk ${isVisible.value ? "bmk--visible" : ""}`}
      id="benchmark"
      aria-label="Benchmark comparison"
    >
      <div class="bmk__bg-mesh" aria-hidden="true" />
      <div class="bmk__bg-grain" aria-hidden="true" />

      <div class="bmk__wrap">
        <div class={`sh ${isVisible.value ? "sh--visible" : "sh--hidden"}`}>
          <h2 class="sh__heading">
            {t(translations.value, "benchmark.title")}
          </h2>
          <p class="sh__desc">
            {t(translations.value, "benchmark.subtitle")}
          </p>
        </div>
        <div class="bmk__selector-wrap">
          <div class="bmk__selector" role="radiogroup" aria-label="Select competitor">
            <div 
              class="bmk__selector-indicator" 
              style={{ 
                transform: `translateX(${activeIdx.value * 100}%)`,
                width: `${100 / RIVALS.length}%`
              }} 
            />
            {RIVALS.map((rival, idx) => {
              const isActive = activeIdx.value === idx;
              const overallPct = isActive
                ? ((activeCatIdx.value + stepProgress.value / 100) / GROUPED.length) * 100
                : 0;
              return (
                <button
                  key={rival.id}
                  class={`bmk__selector-btn ${isActive ? "bmk__selector-btn--active" : ""}`}
                  role="radio"
                  aria-checked={isActive}
                  onClick$={() => goTo(idx)}
                >
                  <span class="bmk__selector-name">{rival.name}</span>
                  {isActive && (
                    <span 
                      class="bmk__selector-progress" 
                      style={{ width: `${overallPct}%` }} 
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div class="bmk__duel-stage">
          <div class="bmk__duel-side bmk__duel-side--self">
            <span class="bmk__duel-title">CurriCanvas</span>
            <div class="bmk__gauge">
              <svg viewBox="0 0 120 120" class="bmk__gauge-svg">
                <circle class="bmk__gauge-track" cx="60" cy="60" r={GAUGE_R} />
                <circle
                  class="bmk__gauge-fill bmk__gauge-fill--self"
                  cx="60" cy="60" r={GAUGE_R}
                  stroke-dasharray={GAUGE_C}
                  stroke-dashoffset={isVisible.value ? selfOffset : GAUGE_C}
                />
              </svg>
              <div class="bmk__gauge-content">
                <span class="bmk__gauge-val">{Math.round(animScores.self)}</span>
                <span class="bmk__gauge-total">/ {totalFeatures}</span>
              </div>
            </div>
            <span class="bmk__duel-badge">Us</span>
          </div>
          <div class="bmk__vs-divider">
            <span class="bmk__vs-line"></span>
            <span class="bmk__vs-text">VS</span>
            <span class="bmk__vs-line"></span>
          </div>
          <div class="bmk__duel-side bmk__duel-side--comp">
            <span class="bmk__duel-title">{selectedRival.value.name}</span>
            <div class="bmk__gauge">
              <svg viewBox="0 0 120 120" class="bmk__gauge-svg">
                <circle class="bmk__gauge-track" cx="60" cy="60" r={GAUGE_R} />
                <circle
                  class="bmk__gauge-fill bmk__gauge-fill--comp"
                  cx="60" cy="60" r={GAUGE_R}
                  stroke-dasharray={GAUGE_C}
                  stroke-dashoffset={isVisible.value ? rivalOffset : GAUGE_C}
                />
              </svg>
              <div class="bmk__gauge-content">
                <span class="bmk__gauge-val">{Math.round(animScores.rival)}</span>
                <span class="bmk__gauge-total">/ {totalFeatures}</span>
              </div>
            </div>
            <span class="bmk__duel-badge bmk__duel-badge--comp">Competitor</span>
          </div>
        </div>
        <BenchmarkCategories
          activeCatId={activeCatId}
          expandedCats={expandedCats}
          isVisible={isVisible.value}
          rival={selectedRival.value}
          stepProgress={stepProgress.value}
          toggleCategory$={toggleCategory}
          translations={translations.value}
        />
        <p class="bmk__source">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          {t(translations.value, "benchmark.source")}
        </p>

      </div>
    </section>
  );
});
