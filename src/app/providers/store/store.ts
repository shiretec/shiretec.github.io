import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { counterSlice } from "@/widgets/clicks-counter";

export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
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
