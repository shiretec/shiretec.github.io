import React from "react";
import { Box, Fieldset, Stack, Switch } from "@chakra-ui/react";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/shared/ui/number-input.tsx";
import { Field } from "@/shared/ui/field.tsx";

export interface RealEstateDetails {
  id: string;
  cash: string;
  mortgagePercentage: string;
  strategy: boolean;
}

interface RealEstateCardProps {
  details: RealEstateDetails;
  onDetailsChange: (details: RealEstateDetails) => void;
}

export const RealEstateCard: React.FC<RealEstateCardProps> = ({
  details,
  onDetailsChange,
}) => {
  return (
    <Box
      maxW="sm"
      maxH="sm"
      overflowY="auto"
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      boxShadow="md"
    >
      <Fieldset.Root size="lg">
        <Stack>
          <Fieldset.Legend>Property {details.id}</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          {/* Cash Input */}

          <Field label="Cash">
            <NumberInputRoot
              name="cash"
              maxW="200px"
              step={1000}
              min={0}
              formatOptions={{
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }}
              value={details.cash}
              onValueChange={(e) => {
                onDetailsChange({ ...details, cash: e.value });
              }}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Field>

          <Field label="Mortgage Percentage">
            <NumberInputRoot
              name="morgagePercentage"
              min={0}
              step={0.01}
              formatOptions={{
                style: "percent",
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }}
              value={details.mortgagePercentage}
              onValueChange={(e) => {
                onDetailsChange({ ...details, mortgagePercentage: e.value });
              }}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Field>

          <Field label="Cash2">
            <NumberInputRoot name="cash2" maxW="200px" value={details.cash}>
              <NumberInputField />
            </NumberInputRoot>
          </Field>
          <Field label="Cash3">
            <NumberInputRoot name="cash3" maxW="200px" value={details.cash}>
              <NumberInputField />
            </NumberInputRoot>
          </Field>
          <Field label="Cash4">
            <NumberInputRoot name="cash4" maxW="200px" value={details.cash}>
              <NumberInputField />
            </NumberInputRoot>
          </Field>
          <Field label="Cash5">
            <NumberInputRoot name="cash5" maxW="200px" value={details.cash}>
              <NumberInputField />
            </NumberInputRoot>
          </Field>
          <Field label="Cash6">
            <NumberInputRoot name="cash6" maxW="200px" value={details.cash}>
              <NumberInputField />
            </NumberInputRoot>
          </Field>
          <Field label="Cash7">
            <NumberInputRoot name="cash7" maxW="200px" value={details.cash}>
              <NumberInputField />
            </NumberInputRoot>
          </Field>

          {/* Strategy Toggle */}
          <Switch.Root
            checked={details.strategy}
            onCheckedChange={(e) => {
              onDetailsChange({ ...details, strategy: e.checked });
            }}
          >
            <Switch.HiddenInput />
            <Switch.Label>Rent</Switch.Label>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Label>Sale</Switch.Label>
          </Switch.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </Box>
  );
};
