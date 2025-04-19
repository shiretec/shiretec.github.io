/**
 * Environment configuration for the application
 * These values are loaded from environment variables at build time
 */

// Default environment values (used in development)
const defaultEnv = {
  GOOGLE_SHEETS_API_KEY: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || "",
};

// Export environment configuration
export const env = {
  ...defaultEnv,

  // Helper to check if the Google Sheets API key is configured
  isGoogleSheetsConfigured: () => !!defaultEnv.GOOGLE_SHEETS_API_KEY,
};
