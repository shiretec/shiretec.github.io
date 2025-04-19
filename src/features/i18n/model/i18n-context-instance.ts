import { createContext } from "react";
import { Currency } from "../../currency/model/types";
import { Language, TranslationKey } from "./types";

// Define the I18n context type
export interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (key: TranslationKey) => string;
  formatAmount: (amount: number) => string;
}

// Create the context
export const I18nContext = createContext<I18nContextType | undefined>(
  undefined,
);
