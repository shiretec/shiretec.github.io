import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { FormField } from "./FormField";
import { SelectField } from "./SelectField";
import { RealEstateFormState } from "../../../model";

interface BasicInfoTabProps {
  formData: RealEstateFormState;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleNumberChange: (name: string, value: string) => void;
  currencySymbol: string;
  translations: {
    propertyName: string;
    propertyType: string;
    initialInvestment: string;
    downPayment: string;
    apartment: string;
    house: string;
    commercial: string;
  };
}

export const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  formData,
  handleChange,
  handleNumberChange,
  currencySymbol,
  translations,
}) => {
  const propertyTypeOptions = [
    { value: "apartment", label: translations.apartment },
    { value: "house", label: translations.house },
    { value: "commercial", label: translations.commercial },
  ];

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      <GridItem>
        <FormField
          label={translations.propertyName}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={translations.propertyName}
        />
      </GridItem>

      <GridItem>
        <SelectField
          label={translations.propertyType}
          name="propertyType"
          value={formData.propertyType}
          options={propertyTypeOptions}
          onChange={handleChange}
        />
      </GridItem>

      <GridItem>
        <FormField
          label={translations.initialInvestment}
          name="initialInvestment"
          value={formData.initialInvestment}
          onChange={(e) =>
            handleNumberChange("initialInvestment", e.target.value)
          }
          type="number"
          suffix={currencySymbol}
        />
      </GridItem>

      <GridItem>
        <FormField
          label={translations.downPayment}
          name="downPayment"
          value={formData.downPayment}
          onChange={(e) => handleNumberChange("downPayment", e.target.value)}
          type="number"
          suffix={currencySymbol}
        />
      </GridItem>
    </Grid>
  );
};
