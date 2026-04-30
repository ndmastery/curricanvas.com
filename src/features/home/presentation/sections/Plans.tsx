import {
  component$,
  useContext,
  useComputed$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useStyles$ } from "@builder.io/qwik";
import { LocaleContext } from "@/app/providers/locale.provider";
import { getTranslations, t } from "@/i18n/index";
import {
  CREDIT_PRICE_USD,
} from "@/shared/constants/app.constants";
import styles from "@/features/home/presentation/styles/Plans.css?inline";

const CheckSvg = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ArrowSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const StarSvg = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const DollarSvg = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const GiftIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);
const CardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><path d="M15 7H9" />
  </svg>
);

const CREDIT_SCHEDULE = [
  { actionKey: "plans.payg.feat2", credits: 1 },
  { actionKey: "plans.payg.feat3", credits: 0.5 },
  { actionKey: "plans.payg.feat4", credits: 0.5 },
  { actionKey: "plans.payg.feat5", credits: 0.5 },
  { actionKey: "plans.payg.feat6", credits: 3 },
  { actionKey: "plans.payg.feat7", credits: 0.5 },
  { actionKey: "plans.payg.feat8", credits: 999 },
];

const FREE_FEATURES = [
  "plans.free.feat1", "plans.free.feat2", "plans.free.feat3",
  "plans.free.feat4", "plans.free.feat5", "plans.free.feat6", "plans.free.feat7",
];

const ENTERPRISE_FEATURES = [
  "plans.enterprise.feat1", "plans.enterprise.feat2", "plans.enterprise.feat3",
  "plans.enterprise.feat4", "plans.enterprise.feat5", "plans.enterprise.feat6",
  "plans.enterprise.feat7", "plans.enterprise.feat8",
];

export const Plans = component$(() => {
  useStyles$(styles);
  const locale = useContext(LocaleContext);
  const translations = useComputed$(() => getTranslations(locale.value));
  const isVisible = useSignal(false);

  useVisibleTask$(() => {
    const section = document.getElementById("plans");
    if (!section) { isVisible.value = true; return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { isVisible.value = true; observer.disconnect(); } },
      { threshold: 0.06 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  });

  return (
    <section
      class={`pl section ${isVisible.value ? "pl--visible" : ""}`}
      id="plans"
      aria-label="Pricing plans"
    >
      <div class="pl__bg-mesh" aria-hidden="true" />
      <div class="pl__bg-grain" aria-hidden="true" />

      <div class="pl__wrap">
        
        <div class={`sh ${isVisible.value ? "sh--visible" : "sh--hidden"}`}>
          <h2 class="sh__heading">{t(translations.value, "plans.title")}</h2>
          <p class="sh__desc">{t(translations.value, "plans.subtitle")}</p>
        </div>

        
        <div class="pl__grid">

          
          <div class="pl__card" id="plan-free">
            <div class="pl__card-accent" aria-hidden="true" />
            <div class="pl__card-head">
              <div class="pl__card-head-row">
                <span class="pl__card-icon"><GiftIcon /></span>
              </div>
              <h3 class="pl__card-name">{t(translations.value, "plans.free.name")}</h3>
              <p class="pl__card-desc">{t(translations.value, "plans.free.desc")}</p>
            </div>

            <div class="pl__price-block">
              <span class="pl__price-label">{t(translations.value, "plans.free.credits")}</span>
            </div>

            <div class="pl__cta-wrap">
              <a href="#platforms" class="pl__cta pl__cta--outline" id="plans-free-cta">
                {t(translations.value, "plans.free.cta")}
                <span class="pl__cta-arrow"><ArrowSvg /></span>
              </a>
            </div>

            <div class="pl__divider" />

            <div class="pl__feat-section">
              <p class="pl__feat-label">{t(translations.value, "plans.whatsIncluded")}</p>
              <ul class="pl__feat-list" aria-label="Free plan features">
                {FREE_FEATURES.map((key) => (
                  <li key={key} class="pl__feat-item">
                    <span class="pl__feat-check"><CheckSvg /></span>
                    <span>{t(translations.value, key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          
          <div class="pl__card pl__card--featured" id="plan-payg">
            <div class="pl__card-accent" aria-hidden="true" />
            <div class="pl__card-head">
              <div class="pl__card-head-row">
                <span class="pl__card-icon"><CardIcon /></span>
                <span class="pl__badge"><StarSvg />{t(translations.value, "plans.popular")}</span>
              </div>
              <h3 class="pl__card-name">{t(translations.value, "plans.payg.name")}</h3>
              <p class="pl__card-desc">{t(translations.value, "plans.payg.desc")}</p>
            </div>

            <div class="pl__price-block">
              <div class="pl__price-row">
                <span class="pl__price-value">${CREDIT_PRICE_USD.toFixed(2)}</span>
                <span class="pl__price-sub">{t(translations.value, "plans.payg.priceSub")}</span>
              </div>
            </div>

            <div class="pl__cta-wrap">
              <a href="#platforms" class="pl__cta pl__cta--primary" id="plans-payg-cta">
                {t(translations.value, "plans.payg.cta")}
                <span class="pl__cta-arrow"><ArrowSvg /></span>
              </a>
            </div>

            <div class="pl__divider" />

            <div class="pl__schedule">
              <p class="pl__schedule-label">{t(translations.value, "plans.payg.deductionsTitle")}</p>
              <table class="pl__schedule-table">
                <tbody>
                  {CREDIT_SCHEDULE.map((d) => (
                    <tr key={d.actionKey} class="pl__schedule-row">
                      <td class="pl__schedule-action">{t(translations.value, d.actionKey).replace(/\s*—.*/, "")}</td>
                      <td class="pl__schedule-cost"><span class="pl__cr-pill">{d.credits}cr</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          
          <div class="pl__card pl__card--ent" id="plan-enterprise">
            <div class="pl__card-accent" aria-hidden="true" />
            <div class="pl__card-head">
              <div class="pl__card-head-row">
                <span class="pl__card-icon"><BriefcaseIcon /></span>
              </div>
              <h3 class="pl__card-name">{t(translations.value, "plans.enterprise.name")}</h3>
              <p class="pl__card-desc">{t(translations.value, "plans.enterprise.desc")}</p>
            </div>

            <div class="pl__price-block">
              <span class="pl__price-label">{t(translations.value, "plans.enterprise.price")}</span>
            </div>

            <div class="pl__cta-wrap">
              <a
                href="/support"
                class="pl__cta pl__cta--outline"
                id="plans-enterprise-cta"
              >
                {t(translations.value, "plans.enterprise.cta")}
                <span class="pl__cta-arrow"><ArrowSvg /></span>
              </a>
            </div>

            <div class="pl__divider" />

            <div class="pl__feat-section">
              <p class="pl__feat-label">{t(translations.value, "plans.enterpriseIncludes")}</p>
              <ul class="pl__feat-list" aria-label="Enterprise plan features">
                {ENTERPRISE_FEATURES.map((key) => (
                  <li key={key} class="pl__feat-item">
                    <span class="pl__feat-check pl__feat-check--muted"><CheckSvg /></span>
                    <span>{t(translations.value, key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});
