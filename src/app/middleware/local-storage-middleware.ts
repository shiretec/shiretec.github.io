import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../providers/store/store";

/**
 * Middleware that saves specified parts of the Redux state to localStorage
 * whenever those parts change
 */
export const createLocalStorageMiddleware = (
  keys: { stateKey: keyof RootState; storageKey: string }[],
): Middleware => {
  return (store) => (next) => (action) => {
    // Run the action first
    const result = next(action);

    // Then check if we need to save anything to localStorage
    const state = store.getState();

    keys.forEach(({ stateKey, storageKey }) => {
      try {
        // Get the slice of state we want to save
        const stateSlice = state[stateKey];
        if (stateSlice) {
          // Save to localStorage
          localStorage.setItem(storageKey, JSON.stringify(stateSlice));
        }
      } catch (error) {
        // Handle any serialization errors
        console.error(
          `Error saving ${String(stateKey)} to localStorage:`,
          error,
        );
      }
    });

    return result;
  };
};

/**
 * Load state from localStorage
 */
export const loadStateFromLocalStorage = <T>(
  key: string,
  defaultValue: T,
): T => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) {
      return defaultValue;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(
      `Error loading state from localStorage for key ${key}:`,
      error,
    );
    return defaultValue;
  }
};
