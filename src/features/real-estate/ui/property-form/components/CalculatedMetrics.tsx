import React from "react";
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

interface Metrics {
  cashFlow: number;
  roi: number;
  capRate: number;
  cashOnCash: number;
  paybackPeriod: number;
}

interface CalculatedMetricsProps {
  metrics: Metrics;
  currencySymbol: string;
  translations: {
    calculatedMetrics: string;
    cashFlow: string;
    roi: string;
    capRate: string;
    cashOnCash: string;
    paybackPeriod: string;
    years: string;
    percent: string;
  };
}

export const CalculatedMetrics: React.FC<CalculatedMetricsProps> = ({
  metrics,
  currencySymbol,
  translations,
}) => {
  return (
    <Box mt={6} p={4} bg="gray.50" borderRadius="md">
      <Heading size="sm" mb={3}>
        {translations.calculatedMetrics}
      </Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem>
          <Text fontWeight="bold">{translations.cashFlow}:</Text>
          <Text>
            {metrics.cashFlow.toFixed(2)} {currencySymbol}/mo
          </Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">{translations.roi}:</Text>
          <Text>
            {metrics.roi.toFixed(2)}
            {translations.percent}
          </Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">{translations.paybackPeriod}:</Text>
          <Text>
            {metrics.paybackPeriod.toFixed(2)} {translations.years}
          </Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">{translations.cashOnCash}:</Text>
          <Text>
            {metrics.cashOnCash.toFixed(2)}
            {translations.percent}
          </Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">{translations.capRate}:</Text>
          <Text>
            {metrics.capRate.toFixed(2)}
            {translations.percent}
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};
