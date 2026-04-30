import {
  component$,
  useContext,
  useSignal,
  useTask$,
  useVisibleTask$,
  useComputed$,
  $,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useStyles$ } from "@builder.io/qwik";
import { ThemeContext } from "@/app/providers/theme.provider";
import { LocaleContext } from "@/app/providers/locale.provider";
import { AppTheme } from "@/shared/enums/theme.enum";
import { AppLocale } from "@/shared/enums/locale.enum";
import { LOCALE_CONFIGS, getTranslations, t } from "@/i18n/index";
import { NAV_ITEMS } from "@/shared/constants/nav.constants";
import { APP_NAME } from "@/shared/constants/app.constants";
import { LogoIcon } from "@/shared/ui/icons/LogoIcon";
import { getRemainingTime, isCountdownComplete, isCountdownEnabled } from "@/shared/config/countdown.config";
import { getAnnouncementMessage } from "@/shared/config/changelog.config";
import styles from "@/app/shell/Header.css?inline";

import { IconAmoled, IconChevronRight, IconMenu, IconMoon, IconSun, IconSystem } from "@/app/shell/header-icons";
import { HeaderLocaleModal } from "@/app/shell/HeaderLocaleModal";
import { HeaderMobileMenu } from "@/app/shell/HeaderMobileMenu";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export const Header = component$(() => {
  useStyles$(styles);

  const theme = useContext(ThemeContext);
  const locale = useContext(LocaleContext);

  const isScrolled = useSignal(false);
  const showLocaleModal = useSignal(false);
  const isMobileOpen = useSignal(false);
  const indicatorLeft = useSignal(0);
  const indicatorWidth = useSignal(0);
  const indicatorVisible = useSignal(false);
  const countdownEnabled = isCountdownEnabled();
  const countdownDone = useSignal(isCountdownComplete());
  const cDays = useSignal(0);
  const cHours = useSignal(0);
  const cMinutes = useSignal(0);
  const cSeconds = useSignal(0);
  const announcementMsg = getAnnouncementMessage();

  const translations = useComputed$(() => getTranslations(locale.value));

  const currentLocale = useComputed$(
    () => LOCALE_CONFIGS.find((c) => c.code === locale.value) ?? LOCALE_CONFIGS[0]
  );
  const THEME_ORDER = [AppTheme.System, AppTheme.Light, AppTheme.Dark, AppTheme.Black];
  const themeLabel = useComputed$(() => {
    switch (theme.value) {
      case AppTheme.System: return 'System';
      case AppTheme.Light: return 'Light';
      case AppTheme.Dark: return 'Dark';
      case AppTheme.Black: return 'Black';
      default: return 'System';
    }
  });
  useVisibleTask$(() => {
    const handler = () => {
      isScrolled.value = window.scrollY > 24;
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  });
  useVisibleTask$(() => {
    if (!countdownEnabled || countdownDone.value) return;
    const tick = () => {
      const now = new Date();
      if (isCountdownComplete(now)) {
        countdownDone.value = true;
        return;
      }
      const r = getRemainingTime(now);
      cDays.value = r.days;
      cHours.value = r.hours;
      cMinutes.value = r.minutes;
      cSeconds.value = r.seconds;
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  });
  useTask$(({ track }) => {
    track(() => showLocaleModal.value);
    if (typeof document === "undefined") return;
    if (showLocaleModal.value) {
      document.body.style.overflow = "hidden";
    } else if (!isMobileOpen.value) {
      document.body.style.overflow = "";
    }
  });
  useTask$(({ track }) => {
    track(() => isMobileOpen.value);
    if (typeof document === "undefined") return;
    if (isMobileOpen.value) {
      document.body.style.overflow = "hidden";
    } else if (!showLocaleModal.value) {
      document.body.style.overflow = "";
    }
  });
  const cycleTheme = $(() => {
    const idx = THEME_ORDER.indexOf(theme.value);
    theme.value = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
  });

  const selectLocale = $((code: AppLocale) => {
    locale.value = code;
    showLocaleModal.value = false;
  });

  const openLocaleModal = $(() => {
    showLocaleModal.value = true;
  });

  const onNavEnter = $((e: MouseEvent) => {
    const link = (e.target as HTMLElement).closest(".bs-nav__link") as HTMLElement | null;
    if (!link) return;
    const nav = link.parentElement;
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    indicatorLeft.value = linkRect.left - navRect.left;
    indicatorWidth.value = linkRect.width;
    indicatorVisible.value = true;
  });

  const onNavLeave = $(() => {
    indicatorVisible.value = false;
  });

  const showTopbar = countdownEnabled || !!announcementMsg;
  return (
    <>
      <div class="bs-header">
        {showTopbar && (
          <div
            class={`bs-ribbon ${isScrolled.value ? "bs-ribbon--hidden" : ""}`}
            role="region"
            aria-label="Announcement"
          >
            <span class="bs-ribbon__edge" aria-hidden="true" />

            <div class="bs-ribbon__capsule">
              {countdownEnabled && !countdownDone.value ? (
                <>
                  <span class="bs-ribbon__icon" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </span>
                  <span class="bs-ribbon__label">
                    {t(translations.value, "header.countdown_prefix", "New version releasing in")}
                  </span>
                  <time class="bs-ribbon__timer" aria-live="polite">
                    {cDays.value > 0 && (
                      <>
                        <span class="bs-ribbon__timer-chip">{cDays.value}</span>
                        <span class="bs-ribbon__timer-sep">d</span>
                      </>
                    )}
                    <span class="bs-ribbon__timer-chip">{pad(cHours.value)}</span>
                    <span class="bs-ribbon__timer-sep">h</span>
                    <span class="bs-ribbon__timer-chip">{pad(cMinutes.value)}</span>
                    <span class="bs-ribbon__timer-sep">m</span>
                    <span class="bs-ribbon__timer-chip">{pad(cSeconds.value)}</span>
                    <span class="bs-ribbon__timer-sep">s</span>
                  </time>
                </>
              ) : (
                <>
                  <span class="bs-ribbon__icon" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
                  </span>
                  <span class="bs-ribbon__marquee-wrap">
                    <span class="bs-ribbon__marquee" aria-label={announcementMsg}>
                      <span class="bs-ribbon__marquee-track">
                        <span class="bs-ribbon__text">{announcementMsg}</span>
                        <span class="bs-ribbon__text" aria-hidden="true">{announcementMsg}</span>
                      </span>
                    </span>
                  </span>
                  <Link href="/changelog" class="bs-ribbon__action">
                    <span class="bs-ribbon__action-label">Changelog</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        <header class={`bs-bar ${isScrolled.value ? "bs-bar--floating" : ""}`}>
          <div class="bs-bar__inner">
            <a href="/" class="bs-brand" aria-label={APP_NAME}>
              <LogoIcon size={28} class="bs-brand__logo" />
              <span class="bs-brand__name">{APP_NAME}</span>
            </a>
            <nav
              class="bs-capsule"
              aria-label="Main navigation"
              onMouseLeave$={onNavLeave}
            >
              <span
                class={`bs-capsule__indicator ${indicatorVisible.value ? "bs-capsule__indicator--show" : ""}`}
                style={{
                  left: `${indicatorLeft.value}px`,
                  width: `${indicatorWidth.value}px`,
                }}
                aria-hidden="true"
              />
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  class="bs-nav__link"
                  onMouseEnter$={onNavEnter}
                >
                  {t(translations.value, item.labelKey)}
                </a>
              ))}
            </nav>
            <div class="bs-actions">
              <button
                class="bs-theme-cycle"
                onClick$={cycleTheme}
                aria-label={`Theme: ${themeLabel.value}. Click to switch.`}
                title={themeLabel.value}
              >
                <span class={`bs-theme-cycle__icon ${theme.value === AppTheme.System ? 'bs-theme-cycle__icon--visible' : ''}`}><IconSystem /></span>
                <span class={`bs-theme-cycle__icon ${theme.value === AppTheme.Light ? 'bs-theme-cycle__icon--visible' : ''}`}><IconSun /></span>
                <span class={`bs-theme-cycle__icon ${theme.value === AppTheme.Dark ? 'bs-theme-cycle__icon--visible' : ''}`}><IconMoon /></span>
                <span class={`bs-theme-cycle__icon ${theme.value === AppTheme.Black ? 'bs-theme-cycle__icon--visible' : ''}`}><IconAmoled /></span>
              </button>
              <button
                class="bs-locale-trigger"
                onClick$={() => {
                  showLocaleModal.value = true;
                }}
                aria-haspopup="dialog"
                aria-label={`Language: ${currentLocale.value.nativeName}`}
                title={currentLocale.value.nativeName}
              >
                <span class="bs-locale-trigger__flag">{currentLocale.value.flag}</span>
                <span class="bs-locale-trigger__code">{currentLocale.value.code.split('-')[0].toUpperCase()}</span>
              </button>

              <Link href="/support" class="bs-cta">
                {t(translations.value, "nav.support")}
              </Link>

              <button
                class="bs-menu-btn"
                onClick$={() => {
                  isMobileOpen.value = true;
                }}
                aria-label="Open navigation menu"
              >
                <IconMenu />
              </button>
            </div>
          </div>
        </header>
      </div>
      <HeaderLocaleModal locale={locale} open={showLocaleModal} selectLocale$={selectLocale} />
      <HeaderMobileMenu
        currentLocale={currentLocale.value}
        cycleTheme$={cycleTheme}
        isOpen={isMobileOpen}
        openLocale$={openLocaleModal}
        theme={theme}
        themeLabel={themeLabel.value}
        translations={translations.value}
      />
    </>
  );
});
