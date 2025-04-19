import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency, currencies, exchangeRates } from "./types";

interface CurrencyState {
  currency: Currency;
}

const initialState: CurrencyState = {
  currency: "RUB",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;

// Selectors
export const selectCurrency = (state: { currency: CurrencyState }): Currency =>
  state.currency.currency;

export const selectCurrencySymbol = (state: {
  currency: CurrencyState;
}): string => currencies[state.currency.currency].symbol;

// Helper function to format currency amounts
export const formatAmount = (
  amount: number,
  state: { currency: CurrencyState },
  locale?: string,
): string => {
  const selectedCurrency = state.currency.currency;
  const value = amount * exchangeRates[selectedCurrency];
  return `${value.toLocaleString(locale)} ${currencies[selectedCurrency].symbol}`;
};

export default currencySlice.reducer;
