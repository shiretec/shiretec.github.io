import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { RealEstateFormState } from "./types";

export interface RealEstateProperty extends RealEstateFormState {
  id: string;
}

interface PropertiesState {
  properties: RealEstateProperty[];
  selectedPropertyId: string | null;
}

const initialState: PropertiesState = {
  properties: [],
  selectedPropertyId: null,
};

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    // Add a new property to the comparison list
    addProperty: (state, action: PayloadAction<RealEstateFormState>) => {
      const newProperty: RealEstateProperty = {
        ...action.payload,
        id: uuid(),
      };
      state.properties.push(newProperty);
    },

    // Update an existing property
    updateProperty: (
      state,
      action: PayloadAction<{ id: string; property: RealEstateFormState }>,
    ) => {
      const { id, property } = action.payload;
      const index = state.properties.findIndex((prop) => prop.id === id);

      if (index !== -1) {
        state.properties[index] = {
          ...property,
          id,
        };
      }
    },

    // Remove a property from the list
    removeProperty: (state, action: PayloadAction<string>) => {
      state.properties = state.properties.filter(
        (property) => property.id !== action.payload,
      );

      // If the selected property is removed, clear the selection
      if (state.selectedPropertyId === action.payload) {
        state.selectedPropertyId = null;
      }
    },

    // Set the selected property
    selectProperty: (state, action: PayloadAction<string | null>) => {
      state.selectedPropertyId = action.payload;
    },

    // Clear all properties
    clearProperties: (state) => {
      state.properties = [];
      state.selectedPropertyId = null;
    },

    // Set properties (used when loading from Google Sheets)
    setProperties: (state, action: PayloadAction<RealEstateProperty[]>) => {
      state.properties = action.payload;
    },
  },
});

export const {
  addProperty,
  updateProperty,
  removeProperty,
  selectProperty,
  clearProperties,
  setProperties,
} = propertiesSlice.actions;

// Selectors
export const selectProperties = (state: { properties: PropertiesState }) =>
  state.properties.properties;

export const selectSelectedPropertyId = (state: {
  properties: PropertiesState;
}) => state.properties.selectedPropertyId;

export const selectSelectedProperty = (state: {
  properties: PropertiesState;
}) => {
  const selectedId = state.properties.selectedPropertyId;
  if (!selectedId) return null;

  return (
    state.properties.properties.find(
      (property) => property.id === selectedId,
    ) || null
  );
};

export default propertiesSlice.reducer;
