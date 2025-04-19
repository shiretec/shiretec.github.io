import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { counterSlice } from "@/widgets/clicks-counter";
import i18nReducer from "../../../features/i18n/model/i18n-slice";
import currencyReducer from "../../../features/currency/model/currency-slice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    i18n: i18nReducer,
    currency: currencyReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
