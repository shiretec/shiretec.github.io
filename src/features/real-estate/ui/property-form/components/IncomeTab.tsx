import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { FormField } from "./FormField";
import { CheckboxField } from "./CheckboxField";
import { RealEstateFormState } from "../../../model";

interface IncomeTabProps {
  formData: RealEstateFormState;
  handleNumberChange: (name: string, value: string) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currencySymbol: string;
  translations: {
    monthlyRent: string;
    occupancyRate: string;
    seasonalAdjustments: string;
  };
}

export const IncomeTab: React.FC<IncomeTabProps> = ({
  formData,
  handleNumberChange,
  handleCheckboxChange,
  currencySymbol,
  translations,
}) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      <GridItem>
        <FormField
          label={translations.monthlyRent}
          name="monthlyRent"
          value={formData.monthlyRent}
          onChange={(e) => handleNumberChange("monthlyRent", e.target.value)}
          type="number"
          suffix={`${currencySymbol}/mo`}
        />
      </GridItem>

      <GridItem>
        <FormField
          label={translations.occupancyRate}
          name="occupancyRate"
          value={formData.occupancyRate}
          onChange={(e) => handleNumberChange("occupancyRate", e.target.value)}
          type="number"
          suffix="%"
          min={0}
          max={100}
        />
      </GridItem>

      <GridItem>
        <CheckboxField
          label={translations.seasonalAdjustments}
          name="seasonalAdjustments"
          checked={formData.seasonalAdjustments}
          onChange={handleCheckboxChange}
        />
      </GridItem>
    </Grid>
  );
};
