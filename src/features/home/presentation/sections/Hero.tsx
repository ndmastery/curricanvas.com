import { component$, useContext, useComputed$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useStyles$ } from "@builder.io/qwik";
import { LocaleContext } from "@/app/providers/locale.provider";
import { getTranslations, t } from "@/i18n/index";
import styles from "@/features/home/presentation/styles/Hero.css?inline";

const PenIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const CpuIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);
const FileExportIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <polyline points="9 15 12 18 15 15" />
  </svg>
);
const GiftIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const LinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const EditPenIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const BADGES = [
  { Icon: ShieldIcon, key: "hero.badge1" },
  { Icon: CpuIcon, key: "hero.badge2" },
  { Icon: FileExportIcon, key: "hero.badge3" },
  { Icon: GiftIcon, key: "hero.badge4" },
  { Icon: LinkIcon, key: "hero.badge5" },
  { Icon: EditPenIcon, key: "hero.badge6" },
];

export const Hero = component$(() => {
  useStyles$(styles);
  const locale = useContext(LocaleContext);
  const translations = useComputed$(() => getTranslations(locale.value));
  const isVisible = useSignal(false);

  useVisibleTask$(() => {
    const section = document.getElementById("hero");
    if (!section) { isVisible.value = true; return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  });

  return (
    <section
      class={`hro ${isVisible.value ? "hro--visible" : ""}`}
      id="hero"
      aria-label="Hero section"
    >

      <div class="hro__bg-mesh" aria-hidden="true" />
      <div class="hro__bg-orb hro__bg-orb--1" aria-hidden="true" />
      <div class="hro__bg-orb hro__bg-orb--2" aria-hidden="true" />


      <div class="hro__stage">


        <div class="hro__content">

          <div class="hro__eyebrow">
            <GlobeIcon />
            {t(translations.value, "hero.badge")}
          </div>


          <h1 class="hro__headline">
            {t(translations.value, "hero.title").split("\n").map((line, i) => (
              <span key={i} class={i === 1 ? "hro__headline-accent" : ""}>
                {line}
                {i < t(translations.value, "hero.title").split("\n").length - 1 && <br />}
              </span>
            ))}
          </h1>


          <p class="hro__lead">
            {t(translations.value, "hero.subtitle")}
          </p>


          <div class="hro__actions">
            <a href="/#platforms" class="hro__btn-primary" id="hero-cta-primary">
              <PenIcon />
              {t(translations.value, "hero.ctaPrimary")}
            </a>
            <a href="/#capabilities" class="hro__btn-ghost" id="hero-cta-secondary">
              {t(translations.value, "hero.ctaSecondary")}
              <ArrowRightIcon />
            </a>
          </div>


          <div class="hro__stats" role="list" aria-label="Key features">
            {BADGES.map((b) => (
              <div key={b.key} class="hro__stat-pill" role="listitem">
                <span class="hro__stat-icon"><b.Icon /></span>
                <span class="hro__stat-label">{t(translations.value, b.key)}</span>
              </div>
            ))}
          </div>
        </div>


        <div class="hro__showcase">
          <div class="hro__showcase-window">
            <picture>
              <source
                type="image/webp"
                srcset="/curricanvas-preview-800w.webp 800w, /curricanvas-preview-1200w.webp 1200w, /curricanvas-preview.webp 2898w"
                sizes="(max-width: 640px) 100vw, (max-width: 960px) 80vw, 600px"
              />
              <img
                src="/curricanvas-preview.png"
                alt="CurriCanvas resume builder interface — showing the editor and ATS-optimized preview"
                class="hro__showcase-img"
                width="900"
                height="600"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>


            <div class="hro__float hro__float--ats" aria-hidden="true">
              <div class="hro__float-header">AI-Powered</div>
              <div class="hro__float-body">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="hro__float-icon">
                  <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
                  <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
                  <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
                </svg>
                <span class="hro__float-val-sm">Resume Builder</span>
              </div>
            </div>


            <div class="hro__float hro__float--export" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" />
                <line x1="12" y1="22" x2="12" y2="7" />
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
              <span>Free Forever · 3 Credits/mo</span>
            </div>


            <div class="hro__float hro__float--share" aria-hidden="true">
              <div class="hro__float-share-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="hro__float-share-icon">
                  <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span class="hro__float-share-label">Custom Domain</span>
              </div>
              <div class="hro__float-share-url">yourdomain.com</div>
              <div class="hro__float-share-stats">
                <span class="hro__float-share-stat">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  142 views
                </span>
                <span class="hro__float-share-stat">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  38 downloads
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});
