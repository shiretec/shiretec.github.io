import React from "react";
import {
  Box,
  Heading,
  Text,
  IconButton,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { RealEstateProperty } from "../../model";
import { useI18n } from "../../../i18n/model/use-i18n";

interface ComparisonTableProps {
  properties: RealEstateProperty[];
  onEdit: (propertyId: string) => void;
  onDelete: (propertyId: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  properties,
  onEdit,
  onDelete,
}) => {
  const { t } = useI18n();
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
                  <IconButton
                    aria-label="Edit property"
                    _icon={{ boxSize: 4 }}
                    size="xs"
                    onClick={() => onEdit(property.id)}
                  />
                  <IconButton
                    aria-label="Delete property"
                    _icon={{ boxSize: 4 }}
                    size="xs"
                    colorScheme="red"
                    onClick={() => onDelete(property.id)}
                  />
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
            {property.initialInvestment.toLocaleString()} {t("rubles")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("downPayment")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.downPayment.toLocaleString()} {t("rubles")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("interestRate")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>{property.interestRate}{t("percent")}</GridItem>
        ))}

        <GridItem fontWeight="bold">{t("loanTerm")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>{property.loanTerm} {t("years")}</GridItem>
        ))}

        {/* Expenses */}
        <GridItem colSpan={properties.length + 1}>
          <Box borderBottomWidth="1px" my={2} />
          <Heading size="sm">{t("expensesTab")}</Heading>
        </GridItem>

        <GridItem fontWeight="bold">{t("propertyTax")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.propertyTax.toLocaleString()} {t("perYear")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("insurance")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.insurance.toLocaleString()} {t("perYear")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("utilities")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.utilities.toLocaleString()} {t("perMonth")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("maintenance")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.maintenance.toLocaleString()} {t("perMonth")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("managementFees")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.managementFees.toLocaleString()} {t("perMonth")}
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
            {property.monthlyRent.toLocaleString()} {t("perMonth")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("occupancyRate")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>{property.occupancyRate}{t("percent")}</GridItem>
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
            {(property.cashFlow || 0).toLocaleString()} {t("perMonth")}
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
            {(property.roi || 0).toFixed(2)}{t("percent")}
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
            {(property.cashOnCash || 0).toFixed(2)}{t("percent")}
          </GridItem>
        ))}

        <GridItem fontWeight="bold">{t("capRate")}</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {(property.capRate || 0).toFixed(2)}{t("percent")}
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
