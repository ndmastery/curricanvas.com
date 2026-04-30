import { component$, type QRL, type Signal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { AppTheme } from "@/shared/enums/theme.enum";
import type { LocaleConfig } from "@/shared/types/locale.types";
import { NAV_ITEMS } from "@/shared/constants/nav.constants";
import { APP_NAME } from "@/shared/constants/app.constants";
import { LogoIcon } from "@/shared/ui/icons/LogoIcon";
import { t } from "@/i18n/index";
import { IconAmoled, IconMoon, IconSun, IconSystem, IconX } from "@/app/shell/header-icons";

interface MobileMenuProps {
  currentLocale: LocaleConfig;
  cycleTheme$: QRL<() => void>;
  isOpen: Signal<boolean>;
  openLocale$: QRL<() => void>;
  theme: Signal<AppTheme>;
  themeLabel: string;
  translations: Record<string, string>;
}

export const MobileMenu = component$((props: MobileMenuProps) => (
  <div class={`bs-overlay ${props.isOpen.value ? "bs-overlay--open" : ""}`} role="dialog" aria-modal="true" aria-label="Navigation menu" aria-hidden={!props.isOpen.value}>
    <div class="bs-overlay__backdrop" onClick$={() => {
      props.isOpen.value = false;
    }} />
    <div class="bs-overlay__content">
      <div class="bs-overlay__header">
        <a href="/" class="bs-brand" aria-label={APP_NAME} onClick$={() => {
          props.isOpen.value = false;
        }}>
          <LogoIcon size={28} class="bs-brand__logo" />
          <span class="bs-brand__name">{APP_NAME}</span>
        </a>
        <button class="bs-overlay__close" onClick$={() => {
          props.isOpen.value = false;
        }} aria-label="Close menu">
          <IconX />
        </button>
      </div>
      <nav class="bs-overlay__nav" aria-label="Mobile Navigation">
        {NAV_ITEMS.map((item, index) => (
          <div key={item.id} class="bs-overlay__navitem" style={{ "--stagger": index }}>
            <a href={item.href} class="bs-overlay__navlink" onClick$={() => {
              props.isOpen.value = false;
            }}>
              {t(props.translations, item.labelKey)}
            </a>
          </div>
        ))}
      </nav>
      <div class="bs-overlay__footer">
        <div class="bs-overlay__controls-row">
          <button class="bs-theme-cycle bs-theme-cycle--mobile" onClick$={props.cycleTheme$} aria-label={`Theme: ${props.themeLabel}. Click to switch.`}>
            <span class={`bs-theme-cycle__icon ${props.theme.value === AppTheme.System ? "bs-theme-cycle__icon--visible" : ""}`}><IconSystem /></span>
            <span class={`bs-theme-cycle__icon ${props.theme.value === AppTheme.Light ? "bs-theme-cycle__icon--visible" : ""}`}><IconSun /></span>
            <span class={`bs-theme-cycle__icon ${props.theme.value === AppTheme.Dark ? "bs-theme-cycle__icon--visible" : ""}`}><IconMoon /></span>
            <span class={`bs-theme-cycle__icon ${props.theme.value === AppTheme.Black ? "bs-theme-cycle__icon--visible" : ""}`}><IconAmoled /></span>
            <span class="bs-theme-cycle__label">{props.themeLabel}</span>
          </button>
          <button class="bs-locale-trigger bs-locale-trigger--mobile" onClick$={props.openLocale$} aria-label={`Language: ${props.currentLocale.nativeName}`}>
            <span class="bs-locale-trigger__flag">{props.currentLocale.flag}</span>
            <span class="bs-locale-trigger__code">{props.currentLocale.nativeName}</span>
          </button>
        </div>
        <Link href="/support" class="bs-cta bs-cta--full" onClick$={() => {
          props.isOpen.value = false;
        }}>
          {t(props.translations, "nav.support")}
        </Link>
      </div>
    </div>
  </div>
));
