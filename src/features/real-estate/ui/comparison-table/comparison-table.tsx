import React from "react";
import { Box, Heading, Text, Button, Grid, GridItem } from "@chakra-ui/react";
import { useI18n } from "../../../i18n/model/use-i18n-redux";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../app/providers/store/hooks";
import { RootState } from "../../../../app/providers/store/store";
import {
  selectProperties,
  removeProperty,
  selectProperty,
} from "../../model/properties-slice";

// No props needed as we're using Redux
type ComparisonTableProps = Record<string, never>;

export const ComparisonTable: React.FC<ComparisonTableProps> = () => {
  const { t, formatAmount } = useI18n();
  const dispatch = useAppDispatch();

  // Get properties from Redux store
  const properties = useAppSelector((state: RootState) =>
    selectProperties(state),
  );

  const handleEdit = (propertyId: string) => {
    dispatch(selectProperty(propertyId));
  };

  const handleDelete = (propertyId: string) => {
    dispatch(removeProperty(propertyId));
  };

  if (properties.length === 0) {
    return (
      <Box mt={8} p={4} textAlign="center" bg="gray.50" borderRadius="md">
        <Text>{t("noPropertiesMessage")}</Text>
      </Box>
    );
  }

  // Find best metrics for highlighting
  const highestCashFlow = Math.max(...properties.map((p) => p.cashFlow || 0));
  const highestROI = Math.max(...properties.map((p) => p.roi || 0));
  const lowestPaybackPeriod = Math.min(
    ...properties
      .filter((p) => (p.paybackPeriod || 0) > 0)
      .map((p) => p.paybackPeriod || Infinity),
  );

  return (
    <Box mt={8}>
      <Heading size="md" mb={4}>
        {t("comparisonTableTitle")}
      </Heading>

      <Grid templateColumns={`auto repeat(${properties.length}, 1fr)`} gap={4}>
        {/* Header row */}
        <GridItem></GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            <Box borderWidth="1px" borderRadius="md" overflow="hidden">
              <Box bg="gray.100" p={2}>
                <Heading size="sm">
                  {property.name || t("propertyFormTitle")}
                </Heading>
                <Box mt={2} display="flex" gap={2}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleEdit(property.id)}
                    mr={2}
                  >
                    {t("edit")}
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(property.id)}
                  >
                    {t("delete")}
                  </Button>
                </Box>
              </Box>
            </Box>
          </GridItem>
        ))}

        {/* Property Information */}
        <GridItem fontWeight="bold">{t("propertyType")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.propertyType === "apartment"
              ? t("apartment")
              : property.propertyType === "house"
                ? t("house")
                : property.propertyType === "commercial"
                  ? t("commercial")
                  : property.propertyType}
          </GridItem>
        ))}

        {/* Investment Information */}
        <GridItem fontWeight="bold">{t("initialInvestment")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {formatAmount(property.initialInvestment)}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("downPayment")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {formatAmount(property.downPayment)}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("interestRate")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.interestRate}
            {t("percent")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("loanTerm")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.loanTerm} {t("years")}
          </GridItem>
        ))}

        {/* Expenses */}
        <GridItem colSpan={properties.length + 1}>
          <Box borderBottomWidth="1px" my={2} />
          <Heading size="sm">{t("expensesTab")}</Heading>
        </GridItem>

        <GridItem fontWeight="bold">{t("propertyTax")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {formatAmount(property.propertyTax)} {t("perYear")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("insurance")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {formatAmount(property.insurance)} {t("perYear")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("utilities")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {formatAmount(property.utilities)} {t("perMonth")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("maintenance")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {formatAmount(property.maintenance)} {t("perMonth")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("managementFees")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {formatAmount(property.managementFees)} {t("perMonth")}
          </GridItem>
        ))}

        {/* Income */}
        <GridItem colSpan={properties.length + 1}>
          <Box borderBottomWidth="1px" my={2} />
          <Heading size="sm">{t("incomeTab")}</Heading>
        </GridItem>

        <GridItem fontWeight="bold">{t("monthlyRent")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {formatAmount(property.monthlyRent)} {t("perMonth")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("occupancyRate")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.occupancyRate}
            {t("percent")}
          </GridItem>
        ))}

        {/* Calculated Metrics */}
        <GridItem colSpan={properties.length + 1}>
          <Box borderBottomWidth="1px" my={2} />
          <Heading size="sm">{t("calculatedMetrics")}</Heading>
        </GridItem>

        <GridItem fontWeight="bold">{t("cashFlow")}</GridItem>
        {properties.map((property) => (
          <GridItem
            key={property.id}
            bg={
              (property.cashFlow || 0) === highestCashFlow &&
              highestCashFlow > 0
                ? "green.100"
                : undefined
            }
            fontWeight={
              (property.cashFlow || 0) === highestCashFlow &&
              highestCashFlow > 0
                ? "bold"
                : "normal"
            }
          >
            {formatAmount(property.cashFlow || 0)} {t("perMonth")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("roi")}</GridItem>
        {properties.map((property) => (
          <GridItem
            key={property.id}
            bg={
              (property.roi || 0) === highestROI && highestROI > 0
                ? "green.100"
                : undefined
            }
            fontWeight={
              (property.roi || 0) === highestROI && highestROI > 0
                ? "bold"
                : "normal"
            }
          >
            {(property.roi || 0).toFixed(2)}
            {t("percent")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("paybackPeriod")}</GridItem>
        {properties.map((property) => (
          <GridItem
            key={property.id}
            bg={
              (property.paybackPeriod || 0) === lowestPaybackPeriod &&
              lowestPaybackPeriod < Infinity
                ? "green.100"
                : undefined
            }
            fontWeight={
              (property.paybackPeriod || 0) === lowestPaybackPeriod &&
              lowestPaybackPeriod < Infinity
                ? "bold"
                : "normal"
            }
          >
            {(property.paybackPeriod || 0).toFixed(2)} {t("years")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("cashOnCash")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {(property.cashOnCash || 0).toFixed(2)}
            {t("percent")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("capRate")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {(property.capRate || 0).toFixed(2)}
            {t("percent")}
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
