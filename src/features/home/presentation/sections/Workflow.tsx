import { component$, useContext, useComputed$, useSignal, useVisibleTask$, useStore, $ } from "@builder.io/qwik";
import { useStyles$ } from "@builder.io/qwik";
import { LocaleContext } from "@/app/providers/locale.provider";
import { getTranslations, t } from "@/i18n/index";
import styles from "@/features/home/presentation/styles/Workflow.css?inline";

const ICON_PATHS: Record<string, string> = {
  signup: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M8.5 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8z|M20 8v6|M23 11h-6",
  verify: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z|M9 12l3 3 4-5",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M17 8l-5-5-5 5|M12 3v12",
  edit: "M12 20h9|M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z|M17 21v-8H7v8|M7 3v5h8",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M7 10l5 5 5-5|M12 15V3",
  history: "M1 4v6h6|M3.51 15a9 9 0 1 0 .49-3.1|M12 7v5l3 3",
  share: "M18 5a3 3 0 1 1 0-6 3 3 0 0 1 0 6z|M6 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z|M18 19a3 3 0 1 1 0-6 3 3 0 0 1 0 6z|M8.59 13.51l6.83 3.98|M15.41 6.51l-6.82 3.98",
  fork: "M6 3v12|M18 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z|M6 18a3 3 0 1 1 0-6 3 3 0 0 1 0 6z|M18 9a9 9 0 0 1-9 9",
};

const FILLED_ICONS: Record<string, string> = {
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

const renderIcon = (name: string, size = 18) => {
  if (FILLED_ICONS[name]) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={FILLED_ICONS[name]} />
      </svg>
    );
  }
  const paths = (ICON_PATHS[name] || "").split("|");
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
};

interface StepDef {
  id: string;
  num: string;
  icon: string;
  titleKey: string;
  descKey: string;
  isBranch?: boolean;
  branchTag?: string;
}

interface PhaseDef {
  id: string;
  labelKey: string;
  num: string;
  steps: StepDef[];
}

const PHASES: PhaseDef[] = [
  {
    id: "onboarding", labelKey: "workflow.phase1", num: "01",
    steps: [
      { id: "signup", num: "01", icon: "signup", titleKey: "workflow.step1.title", descKey: "workflow.step1.desc" },
      { id: "verify", num: "02", icon: "verify", titleKey: "workflow.step2.title", descKey: "workflow.step2.desc" },
    ],
  },
  {
    id: "choose", labelKey: "workflow.phase2", num: "02",
    steps: [
      { id: "import", num: "03", icon: "upload", titleKey: "workflow.step3.title", descKey: "workflow.step3.desc", isBranch: true, branchTag: "A" },
      { id: "linkedin", num: "03", icon: "linkedin", titleKey: "workflow.step4.title", descKey: "workflow.step4.desc", isBranch: true, branchTag: "B" },
      { id: "scratch", num: "03", icon: "edit", titleKey: "workflow.step5.title", descKey: "workflow.step5.desc", isBranch: true, branchTag: "C" },
    ],
  },
  {
    id: "finalize", labelKey: "workflow.phase3", num: "03",
    steps: [
      { id: "autosave", num: "04", icon: "save", titleKey: "workflow.step6.title", descKey: "workflow.step6.desc" },
      { id: "export", num: "05", icon: "download", titleKey: "workflow.step7.title", descKey: "workflow.step7.desc" },
      { id: "history", num: "06", icon: "history", titleKey: "workflow.step8.title", descKey: "workflow.step8.desc" },
      { id: "share", num: "07", icon: "share", titleKey: "workflow.step9.title", descKey: "workflow.step9.desc" },
    ],
  },
];

const AUTO_ADVANCE_MS = 8000;

export const Workflow = component$(() => {
  useStyles$(styles);
  const locale = useContext(LocaleContext);
  const translations = useComputed$(() => getTranslations(locale.value));

  const isVisible = useSignal(false);
  const activePhaseIdx = useSignal(0);
  const progressPct = useSignal(0);
  const timerState = useStore({ rafId: 0, startTime: 0, pauseElapsed: 0 });

  const goTo = $((idx: number) => {
    activePhaseIdx.value = idx;
    progressPct.value = 0;
    timerState.startTime = Date.now();
    timerState.pauseElapsed = 0;
  });

  useVisibleTask$(({ cleanup }) => {
    const section = document.getElementById("workflow");
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
      { threshold: 0.08 }
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
          const next = (activePhaseIdx.value + 1) % PHASES.length;
          activePhaseIdx.value = next;
          progressPct.value = 0;
          timerState.startTime = Date.now();
          timerState.pauseElapsed = 0;
        }
      }
      timerState.rafId = requestAnimationFrame(tick);
    };
    timerState.rafId = requestAnimationFrame(tick);
    cleanup(() => cancelAnimationFrame(timerState.rafId));
  });

  const activePhase = PHASES[activePhaseIdx.value];

  return (
    <section
      class={`wfl section ${isVisible.value ? "wfl--visible" : ""}`}
      id="workflow"
      aria-label="How CurriCanvas works"
    >
      
      <div class="wfl__bg-mesh" aria-hidden="true" />
      <div class="wfl__bg-grain" aria-hidden="true" />

      <div class="wfl__wrap">
        
        <div class={`sh ${isVisible.value ? "sh--visible" : "sh--hidden"}`}>
          <h2 class="sh__heading">{t(translations.value, "workflow.title")}</h2>
          <p class="sh__desc">{t(translations.value, "workflow.subtitle")}</p>
        </div>

        
        <nav class="wfl__rail" role="tablist" aria-label="Workflow phases">
          {PHASES.map((phase, i) => {
            const isActive = activePhaseIdx.value === i;
            const isDone = i < activePhaseIdx.value;
            return (
              <div key={phase.id} class="wfl__rail-item" style={{ display: "contents" }}>
                <button
                  role="tab"
                  aria-selected={isActive}
                  class={`wfl__rail-btn ${isActive ? "wfl__rail-btn--active" : ""} ${isDone ? "wfl__rail-btn--done" : ""}`}
                  onClick$={() => goTo(i)}
                >
                  <span class="wfl__rail-num">{phase.num}</span>
                  <span class="wfl__rail-label">{t(translations.value, phase.labelKey)}</span>
                  {isActive && (
                    <span class="wfl__rail-progress" style={{ width: `${progressPct.value}%` }} aria-hidden="true" />
                  )}
                </button>
                {i < PHASES.length - 1 && (
                  <span class={`wfl__rail-connector ${isDone ? "wfl__rail-connector--done" : ""}`} aria-hidden="true">
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
                      <path d="M0 6h18M14 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        
        <div class="wfl__stage" key={activePhase.id}>
          
          <div class="wfl__phase-banner">
            <span class="wfl__phase-num">{activePhase.num}</span>
            <span class="wfl__phase-title">{t(translations.value, activePhase.labelKey)}</span>
          </div>

          
          <div class={`wfl__steps ${activePhase.id === "choose" ? "wfl__steps--branch" : ""}`}>
            {activePhase.steps.map((step, idx) => (
              <div key={step.id} class={`wfl__step ${step.isBranch ? "wfl__step--branch" : ""}`} style={{ "--step-i": idx }}>
                
                <div class="wfl__step-head">
                  <span class="wfl__step-icon">
                    {renderIcon(step.icon, 20)}
                  </span>
                  <span class="wfl__step-num">
                    {step.num}{step.branchTag || ""}
                  </span>
                </div>

                
                <h3 class="wfl__step-title">{t(translations.value, step.titleKey)}</h3>
                <p class="wfl__step-desc">{t(translations.value, step.descKey)}</p>

                
                <span class="wfl__step-accent" aria-hidden="true" />
              </div>
            ))}
          </div>

          
          {activePhase.id === "choose" && (
            <div class="wfl__fork-indicator">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                {ICON_PATHS.fork.split("|").map((d, i) => <path key={i} d={d} />)}
              </svg>
              <span>{t(translations.value, "workflow.chooseOne")}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
