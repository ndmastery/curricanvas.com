import { component$, type QRL, type Signal } from "@builder.io/qwik";
import { AppLocale } from "@/shared/enums/locale.enum";
import { LOCALE_CONFIGS } from "@/i18n/index";
import { IconX } from "@/app/shell/header-icons";

interface LocaleModalProps {
  locale: Signal<AppLocale>;
  open: Signal<boolean>;
  selectLocale$: QRL<(code: AppLocale) => void>;
}

export const LocaleModal = component$((props: LocaleModalProps) => (
  <div class={`bs-lang-modal ${props.open.value ? "bs-lang-modal--open" : ""}`} role="dialog" aria-modal="true" aria-label="Select language" aria-hidden={!props.open.value}>
    <div class="bs-lang-modal__backdrop" onClick$={() => {
      props.open.value = false;
    }} />
    <div class="bs-lang-modal__panel">
      <div class="bs-lang-modal__header">
        <h3 class="bs-lang-modal__title">Language</h3>
        <button class="bs-lang-modal__close" onClick$={() => {
          props.open.value = false;
        }} aria-label="Close language picker">
          <IconX />
        </button>
      </div>
      <div class="bs-lang-modal__grid" role="listbox" aria-label="Available languages">
        {LOCALE_CONFIGS.map((cfg, index) => (
          <button key={cfg.code} class={`bs-lang-modal__option ${props.locale.value === cfg.code ? "bs-lang-modal__option--active" : ""}`} style={{ "--lang-i": index }} onClick$={() => props.selectLocale$(cfg.code as AppLocale)} role="option" aria-selected={props.locale.value === cfg.code}>
            <span class="bs-lang-modal__flag" aria-hidden="true">{cfg.flag}</span>
            <span class="bs-lang-modal__name">{cfg.nativeName}</span>
            {props.locale.value === cfg.code && (
              <span class="bs-lang-modal__check" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  </div>
));
