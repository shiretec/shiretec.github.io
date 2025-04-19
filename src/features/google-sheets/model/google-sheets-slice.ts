import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/providers/store/store";

export interface GoogleSheetsState {
  isConfigured: boolean;
  isSaving: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: GoogleSheetsState = {
  isConfigured: false,
  isSaving: false,
  isLoading: false,
  error: null,
};

export const googleSheetsSlice = createSlice({
  name: "googleSheets",
  initialState,
  reducers: {
    setConfigured: (state, action: PayloadAction<boolean>) => {
      state.isConfigured = action.payload;
    },
    setSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetState: (state) => {
      state.isSaving = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setConfigured, setSaving, setLoading, setError, resetState } =
  googleSheetsSlice.actions;

// Selectors
export const selectGoogleSheetsState = (state: RootState) => state.googleSheets;
export const selectIsConfigured = (state: RootState) =>
  state.googleSheets.isConfigured;
export const selectIsSaving = (state: RootState) => state.googleSheets.isSaving;
export const selectIsLoading = (state: RootState) =>
  state.googleSheets.isLoading;
export const selectError = (state: RootState) => state.googleSheets.error;

export default googleSheetsSlice.reducer;
