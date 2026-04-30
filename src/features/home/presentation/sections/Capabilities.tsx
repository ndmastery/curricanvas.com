import {
  component$,
  useSignal,
  useContext,
  useComputed$,
  $,
  useVisibleTask$,
  useStore,
} from "@builder.io/qwik";
import { useStyles$ } from "@builder.io/qwik";
import { LocaleContext } from "@/app/providers/locale.provider";
import { getTranslations, t } from "@/i18n/index";
import styles from "@/features/home/presentation/styles/Capabilities.css?inline";

import { CAPABILITY_TABS, CAPABILITY_TAB_DURATION_MS, SORTED_CAPABILITY_ITEMS, renderCapabilityIcon } from "@/features/home/data/capabilities.data";
import type { TabId } from "@/features/home/data/capabilities.data";

export const Capabilities = component$(() => {
  useStyles$(styles);
  const locale = useContext(LocaleContext);
  const translations = useComputed$(() => getTranslations(locale.value));
  const activeIdx = useSignal(0);
  const isVisible = useSignal(false);
  const progressPct = useSignal(0);
  const timerState = useStore({ rafId: 0, startTime: 0, pauseElapsed: 0 });

  const goTo = $((idx: number) => {
    activeIdx.value = idx;
    progressPct.value = 0;
    timerState.startTime = Date.now();
    timerState.pauseElapsed = 0;
    
    const strip = document.getElementById(`cap-strip-${CAPABILITY_TABS[idx].id}`);
    if (strip) strip.scrollLeft = 0;
  });

  useVisibleTask$(({ cleanup }) => {
    const section = document.getElementById("capabilities");
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
    const tabCount = CAPABILITY_TABS.length;

    
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = () => {
      if (isVisible.value) {
        const currentTabId = CAPABILITY_TABS[activeIdx.value].id;
        const duration = CAPABILITY_TAB_DURATION_MS[currentTabId];
        const elapsed = Date.now() - timerState.startTime;
        const pct = Math.min((elapsed / duration) * 100, 100);
        progressPct.value = pct;

        
        const strip = document.getElementById(`cap-strip-${currentTabId}`);
        if (strip) {
          const maxScroll = strip.scrollWidth - strip.clientWidth;
          if (maxScroll > 0) {
            const scrollStart = 0.10; 
            const scrollEnd = 0.80;   
            const scrollPct = pct / 100;

            if (scrollPct <= scrollStart) {
              strip.scrollLeft = 0;
            } else if (scrollPct >= scrollEnd) {
              strip.scrollLeft = maxScroll;
            } else {
              
              const normalizedPct = (scrollPct - scrollStart) / (scrollEnd - scrollStart);
              strip.scrollLeft = maxScroll * easeInOutCubic(normalizedPct);
            }
          }
        }

        
        if (elapsed >= duration) {
          const next = (activeIdx.value + 1) % tabCount;
          activeIdx.value = next;
          progressPct.value = 0;
          timerState.startTime = Date.now();
          timerState.pauseElapsed = 0;
          
          const nextStrip = document.getElementById(`cap-strip-${CAPABILITY_TABS[next].id}`);
          if (nextStrip) nextStrip.scrollLeft = 0;
        }
      }
      timerState.rafId = requestAnimationFrame(tick);
    };
    timerState.rafId = requestAnimationFrame(tick);
    cleanup(() => cancelAnimationFrame(timerState.rafId));
  });

  const openTabId = CAPABILITY_TABS[activeIdx.value].id;

  return (
    <section
      class={`cap ${isVisible.value ? "cap--visible" : ""}`}
      id="capabilities"
      aria-label="Capabilities"
    >
      <div class="cap__bg-mesh" aria-hidden="true" />
      <div class="cap__bg-grain" aria-hidden="true" />

      <div class="cap__wrap">
        
        <div class={`sh ${isVisible.value ? "sh--visible" : "sh--hidden"}`}>
          <h2 class="sh__heading">
            {t(translations.value, "capabilities.title")}
          </h2>
          <p class="sh__desc">
            {t(translations.value, "capabilities.subtitle")}
          </p>
        </div>

        
        <div class="cap__accordion">
          {CAPABILITY_TABS.map((tab, tabIdx) => {
            const isOpen = openTabId === tab.id;
            const isActive = activeIdx.value === tabIdx;
            const items = SORTED_CAPABILITY_ITEMS[tab.id];
            return (
              <div
                key={tab.id}
                class={`cap__group ${isOpen ? "cap__group--open" : ""}`}
                style={{ "--group-i": tabIdx }}
              >
                
                <h3 class="cap__trigger-heading">
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`cap-panel-${tab.id}`}
                    id={`cap-trigger-${tab.id}`}
                    class="cap__trigger"
                    onClick$={() => goTo(tabIdx)}
                  >
                    <span class="cap__trigger-left">
                      <span class="cap__trigger-icon">
                        {renderCapabilityIcon(tab.icon, 18)}
                      </span>
                      <span class="cap__trigger-label">
                        {t(translations.value, tab.labelKey)}
                      </span>
                    </span>
                    <span class="cap__trigger-right">
                      <span class="cap__trigger-count">
                        {items.length}
                      </span>
                      <span class={`cap__trigger-chevron ${isOpen ? "cap__trigger-chevron--open" : ""}`}>
                        {renderCapabilityIcon("chevron", 16)}
                      </span>
                    </span>

                    
                    {isActive && (
                      <span
                        class="cap__trigger-progress"
                        style={{ width: `${progressPct.value}%` }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </h3>

                
                <div
                  class={`cap__panel ${isOpen ? "cap__panel--open" : ""}`}
                  id={`cap-panel-${tab.id}`}
                  role="region"
                  aria-labelledby={`cap-trigger-${tab.id}`}
                >
                  <div class="cap__strip" id={`cap-strip-${tab.id}`}>
                    {items.map((item, idx) => (
                      <div
                        key={item.titleKey}
                        class={`cap__card ${item.exclusive ? "cap__card--exclusive" : ""}`}
                        style={{ "--card-i": idx }}
                      >
                        
                        <div class="cap__card-icon" aria-hidden="true">
                          {renderCapabilityIcon(item.icon, 20)}
                        </div>

                        
                        <div class="cap__card-body">
                          <div class="cap__card-head">
                            <h4 class="cap__card-title">
                              {t(translations.value, item.titleKey)}
                            </h4>
                            {item.exclusive && (
                              <span class="cap__exclusive">Exclusive</span>
                            )}
                          </div>
                          <p class="cap__card-desc">
                            {t(translations.value, item.descKey)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
