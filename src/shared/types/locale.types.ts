import type { AppLocale } from "@/shared/enums/locale.enum";

export interface LocaleConfig {
  code: AppLocale;
  name: string;
  nativeName: string;
  country: string;
  dir: "ltr" | "rtl";
  flag: string;
  isoCode: string;
}

export type TranslationKey = string;

export interface TranslationMap {
  [key: string]: string | TranslationMap;
}
