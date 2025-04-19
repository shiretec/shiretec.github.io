import { translations } from "./translations";

export type Language = "ru" | "en";
export type TranslationKey = keyof typeof translations.ru;
