import React, { createContext, useState, ReactNode } from "react";
import { translations } from "./translations";
import { Currency, formatCurrency } from "../../currency/model";

type Language = "ru" | "en";
type TranslationKey = keyof typeof translations.ru;

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (key: TranslationKey) => string;
  formatAmount: (amount: number) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(
  undefined,
);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("ru");
  const [currency, setCurrency] = useState<Currency>("RUB");

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  const formatAmount = (amount: number): string => {
    return formatCurrency(
      amount,
      currency,
      language === "en" ? "en-US" : "ru-RU",
    );
  };

  return (
    <I18nContext.Provider
      value={{ language, setLanguage, currency, setCurrency, t, formatAmount }}
    >
      {children}
    </I18nContext.Provider>
  );
};
