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
import { WEB_APP_URL } from "@/shared/constants/app.constants";
import styles from "@/features/home/presentation/styles/Platforms.css?inline";

const ArrowSvg = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const DownloadSvg = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const GlobeSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const AndroidSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M5 16c0 3.87 3.13 7 7 7s7-3.13 7-7v-4H5v4z" /><path d="M16.12 4.37l2.1-2.1a.5.5 0 0 0-.71-.71l-2.34 2.34A7.4 7.4 0 0 0 12 3.5c-1.1 0-2.15.24-3.17.67L6.5 1.83a.5.5 0 0 0-.71.71l2.1 2.1A7.5 7.5 0 0 0 4.5 12H5v-1h14v1h.5a7.5 7.5 0 0 0-3.38-7.63z" />
  </svg>
);
const AppleSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);
const WindowsSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
  </svg>
);
const MacOSSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="14" rx="2" /><path d="M8 20h8M12 18v2" />
  </svg>
);
const LinuxSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 0 0-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.544-.09.117-.143.249-.143.39v.014c0 .351.23.564.54.564.294 0 .612-.113.903-.26.3-.161.567-.365.805-.559.2-.154.383-.311.5-.44.102-.116.14-.197.155-.256a.16.16 0 0 0 .011-.041c.227-.124.405-.303.574-.483l.053-.065 1.057.748c.019.015.038.027.047.038l.079.06c.006.003.037.024.066.043l.029.02c.02.01.039.022.057.032.038.021.074.042.091.054L8.6 19.5a.388.388 0 0 0 .082-.348c.047-.112.075-.229.082-.348z" />
  </svg>
);

interface PlatformCard {
  id: string;
  icon: any;
  nameKey: string;
  descKey: string;
}

const UPCOMING_PLATFORMS: PlatformCard[] = [
  { id: "android", icon: <AndroidSvg />, nameKey: "platforms.android", descKey: "platforms.androidDesc" },
  { id: "ios", icon: <AppleSvg />, nameKey: "platforms.ios", descKey: "platforms.iosDesc" },
  { id: "windows", icon: <WindowsSvg />, nameKey: "platforms.windows", descKey: "platforms.windowsDesc" },
  { id: "macos", icon: <MacOSSvg />, nameKey: "platforms.macos", descKey: "platforms.macosDesc" },
  { id: "linux", icon: <LinuxSvg />, nameKey: "platforms.linux", descKey: "platforms.linuxDesc" },
];

export const Platforms = component$(() => {
  useStyles$(styles);
  const locale = useContext(LocaleContext);
  const translations = useComputed$(() => getTranslations(locale.value));
  const isVisible = useSignal(false);

  useVisibleTask$(() => {
    const section = document.getElementById("platforms");
    if (!section) { isVisible.value = true; return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { isVisible.value = true; observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  });

  return (
    <section
      class={`pf section ${isVisible.value ? "pf--visible" : ""}`}
      id="platforms"
      aria-label="Available platforms"
    >
      <div class="pf__bg-mesh" aria-hidden="true" />
      <div class="pf__bg-grain" aria-hidden="true" />

      <div class="pf__wrap">
        
        <div class={`sh ${isVisible.value ? "sh--visible" : "sh--hidden"}`}>
          <h2 class="sh__heading">{t(translations.value, "platforms.title")}</h2>
          <p class="sh__desc">{t(translations.value, "platforms.subtitle")}</p>
        </div>

        
        <div class="pf__hero" id="platform-web">
          <span class="pf__hero-accent" aria-hidden="true" />

          <div class="pf__hero-body">
            <span class="pf__hero-icon"><GlobeSvg /></span>
            <div class="pf__hero-info">
              <h3 class="pf__hero-name">{t(translations.value, "platforms.webTitle")}</h3>
              <p class="pf__hero-desc">{t(translations.value, "platforms.webDesc")}</p>
            </div>
          </div>

          <div class="pf__hero-actions">
            <span class="pf__live-pill">
              <span class="pf__live-dot" aria-hidden="true" />
              {t(translations.value, "platforms.available")}
            </span>
            <a
              href={WEB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="pf__cta pf__cta--primary"
              id="platforms-web-cta"
            >
              {t(translations.value, "platforms.webCta")}
              <span class="pf__cta-arrow"><ArrowSvg /></span>
            </a>
          </div>
        </div>

        
        <div class="pf__grid">
          {UPCOMING_PLATFORMS.map((p, i) => (
            <div key={p.id} class="pf__card" style={{ "--card-i": i } as any}>
              <span class="pf__card-icon">{p.icon}</span>
              <span class="pf__card-name">{t(translations.value, p.nameKey)}</span>
              <span class="pf__card-desc">{t(translations.value, p.descKey)}</span>
              <span class="pf__card-status">
                <span class="pf__status-dot" aria-hidden="true" />
                {t(translations.value, "platforms.comingSoon")}
              </span>
              <span class="pf__card-line" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
