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
  if (properties.length === 0) {
    return (
      <Box mt={8} p={4} textAlign="center" bg="gray.50" borderRadius="md">
        <Text>Добавьте объекты недвижимости для сравнения</Text>
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
        Сравнение объектов
      </Heading>

      <Grid templateColumns={`auto repeat(${properties.length}, 1fr)`} gap={4}>
        {/* Header row */}
        <GridItem></GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            <Box borderWidth="1px" borderRadius="md" overflow="hidden">
              <Box bg="gray.100" p={2}>
                <Heading size="sm">
                  {property.name || "Объект недвижимости"}
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
        <GridItem fontWeight="bold">Тип недвижимости</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.propertyType === "apartment"
              ? "Квартира"
              : property.propertyType === "house"
                ? "Дом"
                : property.propertyType === "commercial"
                  ? "Коммерческая недвижимость"
                  : property.propertyType}
          </GridItem>
        ))}

        {/* Investment Information */}
        <GridItem fontWeight="bold">Стоимость объекта</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.initialInvestment.toLocaleString()} ₽
          </GridItem>
        ))}

        <GridItem fontWeight="bold">Первоначальный взнос</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.downPayment.toLocaleString()} ₽
          </GridItem>
        ))}

        <GridItem fontWeight="bold">Ставка по кредиту</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>{property.interestRate}%</GridItem>
        ))}

        <GridItem fontWeight="bold">Срок кредита</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>{property.loanTerm} лет</GridItem>
        ))}

        {/* Expenses */}
        <GridItem colSpan={properties.length + 1}>
          <Box borderBottomWidth="1px" my={2} />
          <Heading size="sm">Расходы</Heading>
        </GridItem>

        <GridItem fontWeight="bold">Налог на недвижимость</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.propertyTax.toLocaleString()} ₽/год
          </GridItem>
        ))}

        <GridItem fontWeight="bold">Страховка</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.insurance.toLocaleString()} ₽/год
          </GridItem>
        ))}

        <GridItem fontWeight="bold">Коммунальные услуги</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.utilities.toLocaleString()} ₽/мес
          </GridItem>
        ))}

        <GridItem fontWeight="bold">Обслуживание</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.maintenance.toLocaleString()} ₽/мес
          </GridItem>
        ))}

        <GridItem fontWeight="bold">Управление недвижимостью</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.managementFees.toLocaleString()} ₽/мес
          </GridItem>
        ))}

        {/* Income */}
        <GridItem colSpan={properties.length + 1}>
          <Box borderBottomWidth="1px" my={2} />
          <Heading size="sm">Доходы</Heading>
        </GridItem>

        <GridItem fontWeight="bold">Арендная плата</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {property.monthlyRent.toLocaleString()} ₽/мес
          </GridItem>
        ))}

        <GridItem fontWeight="bold">Заполняемость</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>{property.occupancyRate}%</GridItem>
        ))}

        {/* Calculated Metrics */}
        <GridItem colSpan={properties.length + 1}>
          <Box borderBottomWidth="1px" my={2} />
          <Heading size="sm">Расчетные показатели</Heading>
        </GridItem>

        <GridItem fontWeight="bold">Денежный поток</GridItem>
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
            {(property.cashFlow || 0).toLocaleString()} ₽/мес
          </GridItem>
        ))}

        <GridItem fontWeight="bold">ROI</GridItem>
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
            {(property.roi || 0).toFixed(2)}%
          </GridItem>
        ))}

        <GridItem fontWeight="bold">Окупаемость</GridItem>
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
            {(property.paybackPeriod || 0).toFixed(2)} лет
          </GridItem>
        ))}

        <GridItem fontWeight="bold">Доходность на вложенные</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {(property.cashOnCash || 0).toFixed(2)}%
          </GridItem>
        ))}

        <GridItem fontWeight="bold">Капитализация</GridItem>
        {properties.map((property) => (
          <GridItem key={property.id}>
            {(property.capRate || 0).toFixed(2)}%
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
