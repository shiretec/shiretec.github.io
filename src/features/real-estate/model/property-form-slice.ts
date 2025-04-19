import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RealEstateFormState } from "./types";

// Define the initial state
const defaultValues: RealEstateFormState = {
  name: "",
  propertyType: "apartment",
  address: "",
  photoUrl: "",
  initialInvestment: 10000000,
  downPayment: 3000000,
  interestRate: 7.5,
  loanTerm: 20,
  propertyTax: 20000,
  insurance: 15000,
  utilities: 5000,
  maintenance: 10000,
  managementFees: 5000,
  monthlyRent: 50000,
  occupancyRate: 90,
  seasonalAdjustments: false,
};

interface PropertyFormState {
  formData: RealEstateFormState;
  activeTab: "basic" | "expenses" | "income";
}

const initialState: PropertyFormState = {
  formData: defaultValues,
  activeTab: "basic",
};

export const propertyFormSlice = createSlice({
  name: "propertyForm",
  initialState,
  reducers: {
    // Set the entire form data (used for initialization)
    setFormData: (state, action: PayloadAction<RealEstateFormState>) => {
      state.formData = action.payload;
    },

    // Update a single field in the form
    updateField: (
      state,
      action: PayloadAction<{ name: string; value: string | number | boolean }>,
    ) => {
      const { name, value } = action.payload;
      // Using a safer approach without type assertions
      state.formData = {
        ...state.formData,
        [name]: value,
      };
    },

    // Update a numeric field
    updateNumberField: (
      state,
      action: PayloadAction<{ name: string; value: string }>,
    ) => {
      const { name, value } = action.payload;
      // Using a safer approach without type assertions
      state.formData = {
        ...state.formData,
        [name]: parseFloat(value) || 0,
      };
    },

    // Set the active tab
    setActiveTab: (
      state,
      action: PayloadAction<"basic" | "expenses" | "income">,
    ) => {
      state.activeTab = action.payload;
    },

    // Reset the form to default values
    resetForm: (state) => {
      state.formData = defaultValues;
      state.activeTab = "basic";
    },
  },
});

export const {
  setFormData,
  updateField,
  updateNumberField,
  setActiveTab,
  resetForm,
} = propertyFormSlice.actions;

// Selectors
export const selectFormData = (state: { propertyForm: PropertyFormState }) =>
  state.propertyForm.formData;

export const selectActiveTab = (state: { propertyForm: PropertyFormState }) =>
  state.propertyForm.activeTab;

export default propertyFormSlice.reducer;
