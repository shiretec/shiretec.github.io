import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/providers/store/hooks";
import { Currency, currencies } from "../model";
import { RootState } from "../../../app/providers/store/store";
import { setCurrency } from "../model/currency-slice";

export const CurrencySelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCurrency = useAppSelector(
    (state: RootState) => state.currency.currency,
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrency(e.target.value as Currency));
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
