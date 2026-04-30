import {
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useVisibleTask$,
  Slot,
  type Signal,
} from "@builder.io/qwik";
import { AppLocale } from "@/shared/enums/locale.enum";
import { getLocaleConfig } from "@/i18n/index";

export const LocaleContext = createContextId<Signal<AppLocale>>("curricanvas.locale");

const STORAGE_KEY = "curricanvas_locale";

export const LocaleProvider = component$(() => {
  const locale = useSignal<AppLocale>(AppLocale.EnUS);

  useVisibleTask$(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as AppLocale | null;
    if (stored && Object.values(AppLocale).includes(stored)) {
      locale.value = stored;
    }
  });

  useVisibleTask$(({ track }) => {
    const current = track(() => locale.value);
    localStorage.setItem(STORAGE_KEY, current);

    const config = getLocaleConfig(current);
    document.documentElement.setAttribute("lang", current);
    document.documentElement.setAttribute("dir", config.dir);
  });

  useContextProvider(LocaleContext, locale);

  return <Slot />;
});
