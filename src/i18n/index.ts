import { AppLocale } from "@/shared/enums/locale.enum";
import type { LocaleConfig } from "@/shared/types/locale.types";
import { enUS } from "@/i18n/locales/en-US";
import { id } from "@/i18n/locales/id";
import { ms } from "@/i18n/locales/ms";
import { zh } from "@/i18n/locales/zh";
import { ta } from "@/i18n/locales/ta";
import { ar } from "@/i18n/locales/ar";

export const LOCALE_CONFIGS: LocaleConfig[] = [
  { code: AppLocale.EnUS, name: "English", nativeName: "English", country: "United States", dir: "ltr", flag: "🇺🇸", isoCode: "US" },
  { code: AppLocale.Id, name: "Indonesian", nativeName: "Bahasa Indonesia", country: "Indonesia", dir: "ltr", flag: "🇮🇩", isoCode: "ID" },
  { code: AppLocale.Ms, name: "Malay — Malaysia", nativeName: "Bahasa Melayu", country: "Malaysia", dir: "ltr", flag: "🇲🇾", isoCode: "MY" },
  { code: AppLocale.Zh, name: "Chinese — China", nativeName: "中文", country: "China", dir: "ltr", flag: "🇨🇳", isoCode: "CN" },
  { code: AppLocale.Ta, name: "Tamil — India", nativeName: "தமிழ்", country: "India", dir: "ltr", flag: "🇮🇳", isoCode: "IN" },
  { code: AppLocale.Ar, name: "Arabic — Saudi Arabia", nativeName: "العربية", country: "Saudi Arabia", dir: "rtl", flag: "🇸🇦", isoCode: "SA" },
];

const TRANSLATIONS: Record<AppLocale, Record<string, string>> = {
  [AppLocale.EnUS]: enUS,
  [AppLocale.Id]: id,
  [AppLocale.Ms]: ms,
  [AppLocale.Zh]: zh,
  [AppLocale.Ta]: ta,
  [AppLocale.Ar]: ar,
};

export function getTranslations(locale: AppLocale): Record<string, string> {
  if (locale === AppLocale.EnUS) return TRANSLATIONS[AppLocale.EnUS];
  return { ...TRANSLATIONS[AppLocale.EnUS], ...(TRANSLATIONS[locale] ?? {}) };
}

export function t(translations: Record<string, string>, key: string, fallback?: string): string {
  return translations[key] ?? fallback ?? key;
}

export function getLocaleConfig(locale: AppLocale): LocaleConfig {
  return LOCALE_CONFIGS.find((c) => c.code === locale) ?? LOCALE_CONFIGS[0];
}
