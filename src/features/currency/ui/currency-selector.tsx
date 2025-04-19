import React from "react";
import { Currency, currencies } from "../model";

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCurrencyChange(e.target.value as Currency);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontWeight: "bold" }}>Currency:</span>
      <select
        value={selectedCurrency}
        onChange={handleChange}
        style={{ padding: "4px 8px", borderRadius: "4px" }}
      >
        {Object.values(currencies).map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code} ({currency.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};
