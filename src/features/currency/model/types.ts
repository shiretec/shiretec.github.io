export type Currency = 'RUB' | 'USD' | 'EUR';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
}

export const currencies: Record<Currency, CurrencyInfo> = {
  RUB: {
    code: 'RUB',
    symbol: '₽',
    name: 'Russian Ruble',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
  },
};

// Exchange rates relative to RUB (as base currency)
// These would typically come from an API in a real application
export const exchangeRates: Record<Currency, number> = {
  RUB: 1,
  USD: 0.011, // 1 RUB = 0.011 USD
  EUR: 0.010, // 1 RUB = 0.010 EUR
};

export const formatCurrency = (
  amount: number,
  currency: Currency,
  locale?: string
): string => {
  const value = amount * exchangeRates[currency];
  return `${value.toLocaleString(locale)} ${currencies[currency].symbol}`;
};

export const convertCurrency = (
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number => {
  // Convert to base currency (RUB) first, then to target currency
  const inRUB = amount / exchangeRates[fromCurrency];
  return inRUB * exchangeRates[toCurrency];
};
