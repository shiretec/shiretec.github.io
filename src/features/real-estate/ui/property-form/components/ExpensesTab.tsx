import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { FormField } from "./FormField";
import { RealEstateFormState } from "../../../model";

interface ExpensesTabProps {
  formData: RealEstateFormState;
  handleNumberChange: (name: string, value: string) => void;
  currencySymbol: string;
  translations: {
    interestRate: string;
    loanTerm: string;
    propertyTax: string;
    insurance: string;
    utilities: string;
    maintenance: string;
    managementFees: string;
    years: string;
  };
}

export const ExpensesTab: React.FC<ExpensesTabProps> = ({
  formData,
  handleNumberChange,
  currencySymbol,
  translations,
}) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      <GridItem>
        <FormField
          label={translations.interestRate}
          name="interestRate"
          value={formData.interestRate}
          onChange={(e) => handleNumberChange("interestRate", e.target.value)}
          type="number"
          suffix="%"
        />
      </GridItem>

      <GridItem>
        <FormField
          label={translations.loanTerm}
          name="loanTerm"
          value={formData.loanTerm}
          onChange={(e) => handleNumberChange("loanTerm", e.target.value)}
          type="number"
          suffix={translations.years}
        />
      </GridItem>

      <GridItem>
        <FormField
          label={translations.propertyTax}
          name="propertyTax"
          value={formData.propertyTax}
          onChange={(e) => handleNumberChange("propertyTax", e.target.value)}
          type="number"
          suffix={`${currencySymbol}/yr`}
        />
      </GridItem>

      <GridItem>
        <FormField
          label={translations.insurance}
          name="insurance"
          value={formData.insurance}
          onChange={(e) => handleNumberChange("insurance", e.target.value)}
          type="number"
          suffix={`${currencySymbol}/yr`}
        />
      </GridItem>

      <GridItem>
        <FormField
          label={translations.utilities}
          name="utilities"
          value={formData.utilities}
          onChange={(e) => handleNumberChange("utilities", e.target.value)}
          type="number"
          suffix={`${currencySymbol}/mo`}
        />
      </GridItem>

      <GridItem>
        <FormField
          label={translations.maintenance}
          name="maintenance"
          value={formData.maintenance}
          onChange={(e) => handleNumberChange("maintenance", e.target.value)}
          type="number"
          suffix={`${currencySymbol}/mo`}
        />
      </GridItem>

      <GridItem>
        <FormField
          label={translations.managementFees}
          name="managementFees"
          value={formData.managementFees}
          onChange={(e) => handleNumberChange("managementFees", e.target.value)}
          type="number"
          suffix={`${currencySymbol}/mo`}
        />
      </GridItem>
    </Grid>
  );
};
