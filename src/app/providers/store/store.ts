import {
  Action,
  configureStore,
  ThunkAction,
  Middleware,
  EnhancedStore,
} from "@reduxjs/toolkit";
import { counterSlice } from "@/widgets/clicks-counter";
import i18nReducer from "../../../features/i18n/model/i18n-slice";
import currencyReducer from "../../../features/currency/model/currency-slice";
import propertyFormReducer from "../../../features/real-estate/model/property-form-slice";
import propertiesReducer from "../../../features/real-estate/model/properties-slice";
import googleSheetsReducer from "../../../features/google-sheets/model/google-sheets-slice";
import {
  createLocalStorageMiddleware,
  loadStateFromLocalStorage,
} from "../../middleware/local-storage-middleware";
import { createGoogleSheetsMiddleware } from "../../middleware/google-sheets-middleware";

// Load saved properties from localStorage
const PROPERTIES_STORAGE_KEY = "real_estate_properties";
const savedProperties = loadStateFromLocalStorage(PROPERTIES_STORAGE_KEY, {
  properties: [],
  selectedPropertyId: null,
});

// Create local storage middleware
const localStorageMiddleware: Middleware = createLocalStorageMiddleware([
  { stateKey: "properties", storageKey: PROPERTIES_STORAGE_KEY },
]);

// Create Google Sheets middleware
const googleSheetsMiddleware: Middleware = createGoogleSheetsMiddleware();

// Define store with proper typing
export const store: EnhancedStore = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    i18n: i18nReducer,
    currency: currencyReducer,
    propertyForm: propertyFormReducer,
    properties: propertiesReducer,
    googleSheets: googleSheetsReducer,
  },
  preloadedState: {
    properties: savedProperties,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      localStorageMiddleware,
      googleSheetsMiddleware,
    ),
});

// Define types without circular references
export type AppStore = EnhancedStore;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
