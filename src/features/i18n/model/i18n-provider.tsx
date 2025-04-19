import React, { useState, ReactNode } from "react";
import { translations } from "./translations";
import { Currency, formatCurrency } from "../../currency/model";
import { Language, TranslationKey } from "./types";
import { I18nContext } from "./i18n-context-instance";

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
