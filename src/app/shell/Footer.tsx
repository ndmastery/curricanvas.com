import {
  component$,
  useContext,
  useComputed$,
  useVisibleTask$,
  useSignal,
} from "@builder.io/qwik";
import { useStyles$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LocaleContext } from "@/app/providers/locale.provider";
import { getTranslations, t } from "@/i18n/index";
import { FOOTER_COLUMNS } from "@/shared/constants/nav.constants";
import { SOCIAL_LINKS } from "@/shared/constants/social.constants";
import {
  APP_NAME,
  COMPANY_NAME,
  CURRENT_YEAR,
  WEB_APP_URL,
} from "@/shared/constants/app.constants";
import { LogoIcon } from "@/shared/ui/icons/LogoIcon";
import styles from "@/app/shell/Footer.css?inline";

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const ThreadsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
  </svg>
);
const TikTokIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.54V6.78a4.85 4.85 0 0 1-1.06-.09z" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const ArrowSvg = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const ICON_MAP: Record<string, (() => any) | undefined> = {
  github: GitHubIcon, linkedin: LinkedInIcon, x: XIcon,
  instagram: InstagramIcon, threads: ThreadsIcon,
  tiktok: TikTokIcon, facebook: FacebookIcon,
};

export const Footer = component$(() => {
  useStyles$(styles);
  const locale = useContext(LocaleContext);
  const translations = useComputed$(() => getTranslations(locale.value));
  const footerRef = useSignal<HTMLElement>();

  useVisibleTask$(() => {
    const el = footerRef.value;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.querySelectorAll("[data-reveal]").forEach(n => n.classList.add("ft-vis"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add("ft-vis"); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    el.querySelectorAll("[data-reveal]").forEach(n => obs.observe(n));
    return () => obs.disconnect();
  });

  return (
    <footer class="ft" ref={footerRef} id="site-footer">
      <div class="ft__bg-mesh" aria-hidden="true" />
      <div class="ft__bg-grain" aria-hidden="true" />
      <div class="ft__edge" aria-hidden="true" />

      <div class="ft__inner">

        
        <div class="ft__brand" data-reveal>
          <div class="ft__logo">
            <LogoIcon size={28} class="ft__logo-mark" />
            <span class="ft__logo-text">{APP_NAME}</span>
          </div>
          <p class="ft__tagline">
            {t(translations.value, "footer.tagline") || (
              <>
                Your career deserves a{" "}
                <span class="ft__accent">canvas</span> that works as hard
                as you do.
              </>
            )}
          </p>
          <p class="ft__desc">{t(translations.value, "footer.desc")}</p>

          
          <nav class="ft__social" aria-label="Social media links">
            {SOCIAL_LINKS.map((link, i) => {
              const Icon = ICON_MAP[link.id];
              if (!Icon) return null;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ft__social-link"
                  aria-label={link.label}
                  title={link.label}
                  style={{ "--ft-si": i } as any}
                >
                  <Icon />
                </a>
              );
            })}
          </nav>
        </div>

        
        <div class="ft__nav" data-reveal>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.titleKey} class="ft__col">
              <h4 class="ft__col-title">
                <span class="ft__col-dash" aria-hidden="true" />
                {t(translations.value, col.titleKey)}
              </h4>
              <ul class="ft__col-list">
                {col.links.map((link) => (
                  <li key={link.labelKey}>
                    {link.isDisabled ? (
                      <span class="ft__link ft__link--off" aria-disabled="true">
                        {t(translations.value, link.labelKey)}
                      </span>
                    ) : link.isExternal ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" class="ft__link">
                        {t(translations.value, link.labelKey)}
                      </a>
                    ) : (
                      <Link href={link.href} class="ft__link">
                        {t(translations.value, link.labelKey)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        
        <div class="ft__bottom" data-reveal>
          <p class="ft__copy">
            © {CURRENT_YEAR} {APP_NAME}. {t(translations.value, "footer.rights")}
          </p>
          <p class="ft__built">
            {t(translations.value, "footer.builtBy")}{" "}
            <a href="https://ndmastery.com" target="_blank" rel="noopener noreferrer" class="ft__company">
              {COMPANY_NAME}
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
});
