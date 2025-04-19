import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../providers/store/store";
import { env } from "../config/env";

// Google Sheets API configuration
const GOOGLE_SHEETS_API_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const SPREADSHEET_ID_KEY = "real_estate_spreadsheet_id";
const GOOGLE_SHEETS_SAVE_ACTION = "googleSheets/saveToGoogle";
const GOOGLE_SHEETS_LOAD_ACTION = "googleSheets/loadFromGoogle";
const GOOGLE_SHEETS_SET_SPREADSHEET_ID_ACTION = "googleSheets/setSpreadsheetId";

// Define action types for type safety
interface GoogleSheetsAction {
  type: string;
  payload?: unknown;
}

/**
 * Middleware that handles Google Sheets integration
 */
export const createGoogleSheetsMiddleware = (): Middleware => {
  // Get API key from environment configuration
  const apiKey = env.GOOGLE_SHEETS_API_KEY;

  return (store) => (next) => (action: unknown) => {
    const typedAction = action as GoogleSheetsAction;
    // First, pass the action through the middleware chain
    const result = next(action);

    // Get current state
    const state = store.getState() as RootState;

    // Handle Google Sheets actions
    switch (typedAction.type) {
      // API key is now from environment, so we don't need to handle setting it

      case GOOGLE_SHEETS_SET_SPREADSHEET_ID_ACTION: {
        // Save spreadsheet ID to localStorage
        try {
          localStorage.setItem(
            SPREADSHEET_ID_KEY,
            typedAction.payload as string,
          );
        } catch (error) {
          console.error("Error saving spreadsheet ID to localStorage:", error);
        }
        break;
      }

      case GOOGLE_SHEETS_SAVE_ACTION: {
        // Save properties to Google Sheets
        if (!apiKey) {
          console.error("Google Sheets API key not configured in environment");
          // Dispatch an error action
          store.dispatch({
            type: "googleSheets/setError",
            payload:
              "Google Sheets API key not configured. Please contact the administrator.",
          });
          break;
        }

        const spreadsheetId = localStorage.getItem(SPREADSHEET_ID_KEY);
        if (!spreadsheetId) {
          console.error("Spreadsheet ID not set");
          break;
        }

        // Get properties from state
        const properties = state.properties.properties;

        // Save properties to Google Sheets
        savePropertiesToGoogleSheets(apiKey, spreadsheetId, properties)
          .then(() => {
            console.log("Properties saved to Google Sheets");
          })
          .catch((error) => {
            console.error("Error saving properties to Google Sheets:", error);
          });
        break;
      }

      case GOOGLE_SHEETS_LOAD_ACTION: {
        // Load properties from Google Sheets
        if (!apiKey) {
          console.error("Google Sheets API key not configured in environment");
          // Dispatch an error action
          store.dispatch({
            type: "googleSheets/setError",
            payload:
              "Google Sheets API key not configured. Please contact the administrator.",
          });
          break;
        }

        const sheetId = localStorage.getItem(SPREADSHEET_ID_KEY);
        if (!sheetId) {
          console.error("Spreadsheet ID not set");
          break;
        }

        // Load properties from Google Sheets
        loadPropertiesFromGoogleSheets(apiKey, sheetId)
          .then((properties) => {
            if (properties && properties.length > 0) {
              // Dispatch action to set properties in store
              store.dispatch({
                type: "properties/setProperties",
                payload: properties,
              });
              console.log("Properties loaded from Google Sheets");
            }
          })
          .catch((error) => {
            console.error(
              "Error loading properties from Google Sheets:",
              error,
            );
          });
        break;
      }
    }

    return result;
  };
};

/**
 * Save properties to Google Sheets
 */
// Define property interface to avoid any types
interface RealEstateProperty {
  id: string;
  name: string;
  propertyType: string;
  initialInvestment: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTax: number;
  insurance: number;
  utilities: number;
  maintenance: number;
  managementFees: number;
  monthlyRent: number;
  occupancyRate: number;
  cashFlow?: number;
  roi?: number;
  capRate?: number;
  cashOnCash?: number;
  paybackPeriod?: number;
}

async function savePropertiesToGoogleSheets(
  apiKey: string,
  spreadsheetId: string,
  properties: RealEstateProperty[],
): Promise<void> {
  // Convert properties to a format suitable for Google Sheets
  // Each property becomes a row in the sheet
  const rows = properties.map((property) => {
    return [
      property.id,
      property.name,
      property.propertyType,
      property.initialInvestment,
      property.downPayment,
      property.interestRate,
      property.loanTerm,
      property.propertyTax,
      property.insurance,
      property.utilities,
      property.maintenance,
      property.managementFees,
      property.monthlyRent,
      property.occupancyRate,
      property.cashFlow,
      property.roi,
      property.capRate,
      property.cashOnCash,
      property.paybackPeriod,
    ];
  });

  // Create values array with header row and data rows
  const values = [
    [
      "ID",
      "Name",
      "Property Type",
      "Initial Investment",
      "Down Payment",
      "Interest Rate",
      "Loan Term",
      "Property Tax",
      "Insurance",
      "Utilities",
      "Maintenance",
      "Management Fees",
      "Monthly Rent",
      "Occupancy Rate",
      "Cash Flow",
      "ROI",
      "Cap Rate",
      "Cash on Cash",
      "Payback Period",
    ],
    ...rows,
  ];

  // First, check if the sheet exists and clear it
  try {
    // Clear existing data
    await fetch(
      `${GOOGLE_SHEETS_API_URL}/${spreadsheetId}/values/Properties!A1:Z1000:clear`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    // Update with new data
    await fetch(
      `${GOOGLE_SHEETS_API_URL}/${spreadsheetId}/values/Properties!A1:Z${values.length}?valueInputOption=RAW`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values,
        }),
      },
    );
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    throw error;
  }
}

/**
 * Load properties from Google Sheets
 */
async function loadPropertiesFromGoogleSheets(
  apiKey: string,
  spreadsheetId: string,
): Promise<RealEstateProperty[]> {
  try {
    // Fetch data from Google Sheets
    const response = await fetch(
      `${GOOGLE_SHEETS_API_URL}/${spreadsheetId}/values/Properties!A1:Z1000?key=${apiKey}`,
    );
    const data = await response.json();

    if (!data.values || data.values.length <= 1) {
      // No data or only header row
      return [];
    }

    // First row is header (we don't need it since we know the structure)
    const rows = data.values.slice(1);

    // Convert rows to properties
    return rows.map((row: string[]) => {
      const property: RealEstateProperty = {
        id: row[0] || "",
        name: row[1] || "",
        propertyType: row[2] || "apartment",
        initialInvestment: parseFloat(row[3]) || 0,
        downPayment: parseFloat(row[4]) || 0,
        interestRate: parseFloat(row[5]) || 0,
        loanTerm: parseFloat(row[6]) || 0,
        propertyTax: parseFloat(row[7]) || 0,
        insurance: parseFloat(row[8]) || 0,
        utilities: parseFloat(row[9]) || 0,
        maintenance: parseFloat(row[10]) || 0,
        managementFees: parseFloat(row[11]) || 0,
        monthlyRent: parseFloat(row[12]) || 0,
        occupancyRate: parseFloat(row[13]) || 0,
      };

      // Add calculated fields if they exist in the sheet
      if (row[14]) property.cashFlow = parseFloat(row[14]);
      if (row[15]) property.roi = parseFloat(row[15]);
      if (row[16]) property.capRate = parseFloat(row[16]);
      if (row[17]) property.cashOnCash = parseFloat(row[17]);
      if (row[18]) property.paybackPeriod = parseFloat(row[18]);

      return property;
    });
  } catch (error) {
    console.error("Error loading from Google Sheets:", error);
    throw error;
  }
}

// Action creators
export const saveToGoogle = () => ({
  type: GOOGLE_SHEETS_SAVE_ACTION,
});

export const loadFromGoogle = () => ({
  type: GOOGLE_SHEETS_LOAD_ACTION,
});

// No longer needed as we use API key from environment
// export const setApiKey = (apiKey: string) => ({
//   type: GOOGLE_SHEETS_SET_API_KEY_ACTION,
//   payload: apiKey
// });

export const setSpreadsheetId = (spreadsheetId: string) => ({
  type: GOOGLE_SHEETS_SET_SPREADSHEET_ID_ACTION,
  payload: spreadsheetId,
});
