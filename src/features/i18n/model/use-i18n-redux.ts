import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/providers/store/hooks';
import { setLanguage, TranslationKey } from './i18n-slice';
import { setCurrency } from '../../currency/model/currency-slice';
import { translations } from './translations';
import { Currency, currencies, exchangeRates } from '../../currency/model/types';
import { RootState } from '../../../app/providers/store/store';

export const useI18n = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state: RootState) => state.i18n.language);
  const currency = useAppSelector((state: RootState) => state.currency.currency);
  
  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[language][key] || key;
    },
    [language]
  );

  const formatAmount = useCallback(
    (amount: number): string => {
      const locale = language === 'en' ? 'en-US' : 'ru-RU';
      const value = amount * exchangeRates[currency];
      return `${value.toLocaleString(locale)} ${currencies[currency].symbol}`;
    },
    [language, currency]
  );

  const changeLanguage = useCallback(
    (newLanguage: 'ru' | 'en') => {
      dispatch(setLanguage(newLanguage));
    },
    [dispatch]
  );

  const changeCurrency = useCallback(
    (newCurrency: Currency) => {
      dispatch(setCurrency(newCurrency));
    },
    [dispatch]
  );

  return {
    language,
    setLanguage: changeLanguage,
    t,
    currency,
    setCurrency: changeCurrency,
    formatAmount
  };
};
