import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { translations } from "./translations";

export type Language = "ru" | "en";
export type TranslationKey = keyof typeof translations.ru;

interface I18nState {
  language: Language;
}

const initialState: I18nState = {
  language: "ru",
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = i18nSlice.actions;

// Selector to get translations
export const getTranslation = (
  state: { i18n: I18nState },
  key: TranslationKey,
): string => {
  return translations[state.i18n.language][key] || key;
};

export default i18nSlice.reducer;
