import {
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useVisibleTask$,
  Slot,
  type Signal,
} from "@builder.io/qwik";
import { AppTheme } from "@/shared/enums/theme.enum";

export const ThemeContext = createContextId<Signal<AppTheme>>("curricanvas.theme");

const STORAGE_KEY = "curricanvas_theme";

export const ThemeProvider = component$(() => {
  const theme = useSignal<AppTheme>(AppTheme.System);

  useVisibleTask$(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as AppTheme | null;
    if (stored && Object.values(AppTheme).includes(stored)) {
      theme.value = stored;
    }
  });

  useVisibleTask$(({ track }) => {
    const current = track(() => theme.value);
    localStorage.setItem(STORAGE_KEY, current);

    const root = document.documentElement;
    root.removeAttribute("data-theme");

    if (current === AppTheme.System) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", prefersDark ? AppTheme.Dark : AppTheme.Light);
    } else {
      root.setAttribute("data-theme", current);
    }
  });

  useContextProvider(ThemeContext, theme);

  return <Slot />;
});
