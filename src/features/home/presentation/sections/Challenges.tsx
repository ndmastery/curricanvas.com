import {
  component$,
  useContext,
  useComputed$,
  useSignal,
  useVisibleTask$,
  $,
  useStore,
} from "@builder.io/qwik";
import { useStyles$ } from "@builder.io/qwik";
import { LocaleContext } from "@/app/providers/locale.provider";
import { getTranslations, t } from "@/i18n/index";
import styles from "@/features/home/presentation/styles/Challenges.css?inline";

const ChallengeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "ats":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
      );
    case "format":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="13" x2="15" y2="13"/>
          <line x1="9" y1="17" x2="12" y2="17"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
        </svg>
      );
    case "link":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          <line x1="2" y1="2" x2="22" y2="22"/>
        </svg>
      );
    case "depth":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
          <line x1="12" y1="2" x2="12" y2="22" stroke-dasharray="4 2"/>
        </svg>
      );
    case "history":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="1 4 1 10 7 10"/>
          <path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
          <polyline points="12 7 12 12 15 15"/>
        </svg>
      );
    default:
      return null;
  }
};

const AlertSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const CheckSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ArrowRightSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

interface Challenge {
  id: string;
  num: string;
  iconType: string;
  titleKey: string;
  contextKey: string;
  impactKey: string;
  solutionKey: string;
}

const CHALLENGES: Challenge[] = [
  { id: "ats", num: "01", iconType: "ats", titleKey: "challenges.problem1.title", contextKey: "challenges.problem1.context", impactKey: "challenges.problem1.impact", solutionKey: "challenges.problem1.solution" },
  { id: "format", num: "02", iconType: "format", titleKey: "challenges.problem2.title", contextKey: "challenges.problem2.context", impactKey: "challenges.problem2.impact", solutionKey: "challenges.problem2.solution" },
  { id: "link", num: "03", iconType: "link", titleKey: "challenges.problem3.title", contextKey: "challenges.problem3.context", impactKey: "challenges.problem3.impact", solutionKey: "challenges.problem3.solution" },
  { id: "depth", num: "04", iconType: "depth", titleKey: "challenges.problem4.title", contextKey: "challenges.problem4.context", impactKey: "challenges.problem4.impact", solutionKey: "challenges.problem4.solution" },
  { id: "history", num: "05", iconType: "history", titleKey: "challenges.problem5.title", contextKey: "challenges.problem5.context", impactKey: "challenges.problem5.impact", solutionKey: "challenges.problem5.solution" },
];

const AUTO_ADVANCE_MS = 8000;

export const Challenges = component$(() => {
  useStyles$(styles);
  const locale = useContext(LocaleContext);
  const translations = useComputed$(() => getTranslations(locale.value));
  const isVisible = useSignal(false);
  const activeIdx = useSignal(0);
  const contentKey = useSignal(0); 
  const progressPct = useSignal(0);
  const timerState = useStore({ rafId: 0, startTime: 0, pauseElapsed: 0 });

  const goTo = $((idx: number) => {
    activeIdx.value = idx;
    contentKey.value++;
    progressPct.value = 0;
    timerState.startTime = Date.now();
    timerState.pauseElapsed = 0;
  });

  const goNext = $(() => {
    const next = (activeIdx.value + 1) % CHALLENGES.length;
    goTo(next);
  });

  const goPrev = $(() => {
    const prev = (activeIdx.value - 1 + CHALLENGES.length) % CHALLENGES.length;
    goTo(prev);
  });

  useVisibleTask$(({ cleanup }) => {
    const section = document.getElementById("challenges");
    if (!section) { isVisible.value = true; return; }

    
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          isVisible.value = true;
          
          timerState.startTime = Date.now() - timerState.pauseElapsed;
        } else {
          if (isVisible.value) {
            
            timerState.pauseElapsed = Date.now() - timerState.startTime;
          }
          isVisible.value = false;
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(section);
    cleanup(() => obs.disconnect());

    
    timerState.startTime = Date.now();
    const tick = () => {
      if (isVisible.value) {
        const elapsed = Date.now() - timerState.startTime;
        const pct = Math.min((elapsed / AUTO_ADVANCE_MS) * 100, 100);
        progressPct.value = pct;
        if (elapsed >= AUTO_ADVANCE_MS) {
          goNext();
        }
      }
      timerState.rafId = requestAnimationFrame(tick);
    };
    timerState.rafId = requestAnimationFrame(tick);
    cleanup(() => cancelAnimationFrame(timerState.rafId));
  });

  const active = CHALLENGES[activeIdx.value];

  return (
    <section
      class={`chl ${isVisible.value ? "chl--visible" : ""}`}
      id="challenges"
      aria-label="Why CurriCanvas"
    >
      
      <div class="chl__bg-mesh" aria-hidden="true" />
      <div class="chl__bg-grain" aria-hidden="true" />

      <div class="chl__wrap">

        
        <header class={`sh ${isVisible.value ? "sh--visible" : "sh--hidden"}`}>
          <h2 class="sh__heading">
            {t(translations.value, "challenges.title")}
          </h2>
          <p class="sh__desc">
            {t(translations.value, "challenges.subtitle")}
          </p>
        </header>

        
        <div class="chl__stage" key={contentKey.value}>

          
          <div class="chl__stage-left">
            <div class="chl__watermark" aria-hidden="true">{active.num}</div>
            <div class="chl__stage-icon">
              <ChallengeIcon type={active.iconType} />
            </div>
            <h3 class="chl__stage-title">
              {t(translations.value, active.titleKey)}
            </h3>
            <p class="chl__stage-context">
              {t(translations.value, active.contextKey)}
            </p>
          </div>

          
          <div class="chl__stage-right">
            
            <div class="chl__panel chl__panel--problem">
              <div class="chl__panel-head">
                <AlertSvg />
                <span>{t(translations.value, "challenges.industryReality")}</span>
              </div>
              <p class="chl__panel-text">
                {t(translations.value, active.impactKey)}
              </p>
            </div>
            
            <div class="chl__panel-connector" aria-hidden="true">
              <ArrowRightSvg />
            </div>
            
            <div class="chl__panel chl__panel--solve">
              <div class="chl__panel-head">
                <CheckSvg />
                <span>{t(translations.value, "challenges.howSolves")}</span>
              </div>
              <p class="chl__panel-text">
                {t(translations.value, active.solutionKey)}
              </p>
            </div>
          </div>
        </div>

        
        <nav class="chl__tabs" aria-label="Challenge navigation">
          {CHALLENGES.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              class={`chl__tab ${activeIdx.value === idx ? "chl__tab--active" : ""}`}
              onClick$={() => goTo(idx)}
              aria-selected={activeIdx.value === idx}
              aria-label={`Challenge ${c.num}`}
              id={`chl-tab-${c.id}`}
            >
              <span class="chl__tab-num">{c.num}</span>
              <span class="chl__tab-icon"><ChallengeIcon type={c.iconType} /></span>
              <span class="chl__tab-label">{t(translations.value, c.titleKey)}</span>
              
              {activeIdx.value === idx && (
                <span
                  class="chl__tab-progress"
                  style={{ width: `${progressPct.value}%` }}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </nav>

        
        <div class="chl__mobile-nav">
          <button type="button" class="chl__mobile-btn" onClick$={goPrev} aria-label="Previous challenge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div class="chl__mobile-dots">
            {CHALLENGES.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                class={`chl__mobile-dot ${activeIdx.value === idx ? "chl__mobile-dot--active" : ""}`}
                onClick$={() => goTo(idx)}
                aria-label={`Challenge ${c.num}`}
              />
            ))}
          </div>
          <button type="button" class="chl__mobile-btn" onClick$={goNext} aria-label="Next challenge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
});
