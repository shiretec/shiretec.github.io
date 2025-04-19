import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { RealEstateFormState } from "../../model";
import { useI18n } from "../../../i18n/model/use-i18n-redux";
import { currencies } from "../../../currency/model";
import { useAppSelector } from "../../../../app/providers/store/hooks";
import { RootState } from "../../../../app/providers/store/store";

interface PropertyFormProps {
  initialValues?: Partial<RealEstateFormState>;
  onSave: (property: RealEstateFormState) => void;
  onAddToComparison: (property: RealEstateFormState) => void;
}

const defaultValues: RealEstateFormState = {
  name: "",
  propertyType: "",
  address: "",
  photoUrl: "",
  initialInvestment: 0,
  downPayment: 0,
  interestRate: 0,
  loanTerm: 0,
  propertyTax: 0,
  insurance: 0,
  utilities: 0,
  maintenance: 0,
  managementFees: 0,
  monthlyRent: 0,
  occupancyRate: 100,
  seasonalAdjustments: false,
};

export const PropertyForm: React.FC<PropertyFormProps> = ({
  initialValues,
  onSave,
  onAddToComparison,
}) => {
  const { t } = useI18n();
  const currency = useAppSelector(
    (state: RootState) => state.currency.currency,
  );
  const [formData, setFormData] = useState<RealEstateFormState>({
    ...defaultValues,
    ...initialValues,
  });
  const [activeTab, setActiveTab] = useState<"basic" | "expenses" | "income">(
    "basic",
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleNumberChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleAddToComparison = () => {
    onAddToComparison(formData);
  };

  // Calculate metrics based on form data
  const calculateMetrics = () => {
    const loanAmount = formData.initialInvestment - formData.downPayment;
    const monthlyInterestRate = formData.interestRate / 100 / 12;
    const numberOfPayments = formData.loanTerm * 12;

    // Calculate monthly mortgage payment using the formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
    let monthlyMortgagePayment = 0;
    if (monthlyInterestRate > 0 && numberOfPayments > 0) {
      monthlyMortgagePayment =
        (loanAmount *
          (monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }

    // Total monthly expenses
    const totalMonthlyExpenses =
      formData.propertyTax / 12 +
      formData.insurance / 12 +
      formData.utilities +
      formData.maintenance +
      formData.managementFees +
      monthlyMortgagePayment;

    // Monthly income with occupancy rate
    const effectiveMonthlyRent =
      formData.monthlyRent * (formData.occupancyRate / 100);

    // Cash flow
    const cashFlow = effectiveMonthlyRent - totalMonthlyExpenses;

    // Annual cash flow
    const annualCashFlow = cashFlow * 12;

    // ROI
    const roi =
      formData.initialInvestment > 0
        ? (annualCashFlow / formData.initialInvestment) * 100
        : 0;

    // Cash on cash (return on down payment)
    const cashOnCash =
      formData.downPayment > 0
        ? (annualCashFlow / formData.downPayment) * 100
        : 0;

    // Cap rate
    const capRate =
      formData.initialInvestment > 0
        ? (annualCashFlow / formData.initialInvestment) * 100
        : 0;

    // Payback period in years
    const paybackPeriod =
      annualCashFlow > 0 ? formData.initialInvestment / annualCashFlow : 0;

    return {
      cashFlow,
      roi,
      capRate,
      cashOnCash,
      paybackPeriod,
    };
  };

  const metrics = calculateMetrics();

  return (
    <Box borderWidth="1px" borderRadius="md" overflow="hidden">
      <Box bg="purple.100" p={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md">{t("propertyFormTitle")}</Heading>
        </Flex>
      </Box>
      <Box p={4}>
        {/* Tab Navigation */}
        <Flex mb={4}>
          <Button
            variant={activeTab === "basic" ? "solid" : "outline"}
            onClick={() => setActiveTab("basic")}
            mr={2}
          >
            {t("propertyInfoTab")}
          </Button>
          <Button
            variant={activeTab === "expenses" ? "solid" : "outline"}
            onClick={() => setActiveTab("expenses")}
            mr={2}
          >
            {t("expensesTab")}
          </Button>
          <Button
            variant={activeTab === "income" ? "solid" : "outline"}
            onClick={() => setActiveTab("income")}
          >
            {t("incomeTab")}
          </Button>
        </Flex>

        {/* Basic Information Tab */}
        {activeTab === "basic" && (
          <Flex direction="column" gap={4}>
            <Box>
              <Text mb={1} fontWeight="bold">
                {t("propertyName")}
              </Text>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("propertyName")}
              />
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                {t("propertyType")}
              </Text>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  borderColor: "#E2E8F0",
                }}
              >
                <option value="">{t("propertyType")}</option>
                <option value="apartment">{t("apartment")}</option>
                <option value="house">{t("house")}</option>
                <option value="commercial">{t("commercial")}</option>
              </select>
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                {t("propertyAddress")}
              </Text>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={t("propertyAddress")}
              />
            </Box>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <Box>
                  <Text mb={1} fontWeight="bold">
                    {t("initialInvestment")}
                  </Text>
                  <Flex>
                    <Input
                      type="number"
                      name="initialInvestment"
                      value={formData.initialInvestment}
                      onChange={(e) =>
                        handleNumberChange("initialInvestment", e.target.value)
                      }
                    />
                    <Box
                      display="flex"
                      alignItems="center"
                      px={2}
                      bg="gray.100"
                      borderWidth="1px"
                      borderLeftWidth="0"
                      borderRadius="0 4px 4px 0"
                    >
                      {currencies[currency].symbol}
                    </Box>
                  </Flex>
                </Box>
              </GridItem>

              <GridItem>
                <Box>
                  <Text mb={1} fontWeight="bold">
                    {t("downPayment")}
                  </Text>
                  <Flex>
                    <Input
                      type="number"
                      name="downPayment"
                      value={formData.downPayment}
                      onChange={(e) =>
                        handleNumberChange("downPayment", e.target.value)
                      }
                    />
                    <Box
                      display="flex"
                      alignItems="center"
                      px={2}
                      bg="gray.100"
                      borderWidth="1px"
                      borderLeftWidth="0"
                      borderRadius="0 4px 4px 0"
                    >
                      {currencies[currency].symbol}
                    </Box>
                  </Flex>
                </Box>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <Box>
                  <Text mb={1} fontWeight="bold">
                    {t("interestRate")}
                  </Text>
                  <Flex>
                    <Input
                      type="number"
                      name="interestRate"
                      value={formData.interestRate}
                      onChange={(e) =>
                        handleNumberChange("interestRate", e.target.value)
                      }
                    />
                    <Box
                      display="flex"
                      alignItems="center"
                      px={2}
                      bg="gray.100"
                      borderWidth="1px"
                      borderLeftWidth="0"
                      borderRadius="0 4px 4px 0"
                    >
                      {t("percent")}
                    </Box>
                  </Flex>
                </Box>
              </GridItem>

              <GridItem>
                <Box>
                  <Text mb={1} fontWeight="bold">
                    {t("loanTerm")}
                  </Text>
                  <Flex>
                    <Input
                      type="number"
                      name="loanTerm"
                      value={formData.loanTerm}
                      onChange={(e) =>
                        handleNumberChange("loanTerm", e.target.value)
                      }
                    />
                    <Box
                      display="flex"
                      alignItems="center"
                      px={2}
                      bg="gray.100"
                      borderWidth="1px"
                      borderLeftWidth="0"
                      borderRadius="0 4px 4px 0"
                    >
                      {t("years")}
                    </Box>
                  </Flex>
                </Box>
              </GridItem>
            </Grid>
          </Flex>
        )}

        {/* Expenses Tab */}
        {activeTab === "expenses" && (
          <Flex direction="column" gap={4}>
            <Box>
              <Text mb={1} fontWeight="bold">
                {t("propertyTax")}
              </Text>
              <Flex>
                <Input
                  type="number"
                  name="propertyTax"
                  value={formData.propertyTax}
                  onChange={(e) =>
                    handleNumberChange("propertyTax", e.target.value)
                  }
                />
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                  bg="gray.100"
                  borderWidth="1px"
                  borderLeftWidth="0"
                  borderRadius="0 4px 4px 0"
                >
                  {t("perYear")}
                </Box>
              </Flex>
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                {t("insurance")}
              </Text>
              <Flex>
                <Input
                  type="number"
                  name="insurance"
                  value={formData.insurance}
                  onChange={(e) =>
                    handleNumberChange("insurance", e.target.value)
                  }
                />
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                  bg="gray.100"
                  borderWidth="1px"
                  borderLeftWidth="0"
                  borderRadius="0 4px 4px 0"
                >
                  {t("perYear")}
                </Box>
              </Flex>
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                {t("utilities")}
              </Text>
              <Flex>
                <Input
                  type="number"
                  name="utilities"
                  value={formData.utilities}
                  onChange={(e) =>
                    handleNumberChange("utilities", e.target.value)
                  }
                />
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                  bg="gray.100"
                  borderWidth="1px"
                  borderLeftWidth="0"
                  borderRadius="0 4px 4px 0"
                >
                  {t("perMonth")}
                </Box>
              </Flex>
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                {t("maintenance")}
              </Text>
              <Flex>
                <Input
                  type="number"
                  name="maintenance"
                  value={formData.maintenance}
                  onChange={(e) =>
                    handleNumberChange("maintenance", e.target.value)
                  }
                />
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                  bg="gray.100"
                  borderWidth="1px"
                  borderLeftWidth="0"
                  borderRadius="0 4px 4px 0"
                >
                  {t("perMonth")}
                </Box>
              </Flex>
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                {t("managementFees")}
              </Text>
              <Flex>
                <Input
                  type="number"
                  name="managementFees"
                  value={formData.managementFees}
                  onChange={(e) =>
                    handleNumberChange("managementFees", e.target.value)
                  }
                />
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                  bg="gray.100"
                  borderWidth="1px"
                  borderLeftWidth="0"
                  borderRadius="0 4px 4px 0"
                >
                  {t("perMonth")}
                </Box>
              </Flex>
            </Box>
          </Flex>
        )}

        {/* Income Tab */}
        {activeTab === "income" && (
          <Flex direction="column" gap={4}>
            <Box>
              <Text mb={1} fontWeight="bold">
                {t("monthlyRent")}
              </Text>
              <Flex>
                <Input
                  type="number"
                  name="monthlyRent"
                  value={formData.monthlyRent}
                  onChange={(e) =>
                    handleNumberChange("monthlyRent", e.target.value)
                  }
                />
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                  bg="gray.100"
                  borderWidth="1px"
                  borderLeftWidth="0"
                  borderRadius="0 4px 4px 0"
                >
                  {t("perMonth")}
                </Box>
              </Flex>
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                {t("occupancyRate")}
              </Text>
              <Flex>
                <Input
                  type="number"
                  name="occupancyRate"
                  value={formData.occupancyRate}
                  onChange={(e) =>
                    handleNumberChange("occupancyRate", e.target.value)
                  }
                  max={100}
                  min={0}
                />
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                  bg="gray.100"
                  borderWidth="1px"
                  borderLeftWidth="0"
                  borderRadius="0 4px 4px 0"
                >
                  %
                </Box>
              </Flex>
            </Box>

            <Box>
              <Flex alignItems="center">
                <input
                  type="checkbox"
                  name="seasonalAdjustments"
                  checked={formData.seasonalAdjustments}
                  onChange={handleCheckboxChange}
                  style={{ marginRight: "8px" }}
                />
                <Text>{t("seasonalAdjustments")}</Text>
              </Flex>
            </Box>
          </Flex>
        )}

        {/* Calculated Metrics */}
        <Box mt={6} p={4} bg="gray.50" borderRadius="md">
          <Heading size="sm" mb={3}>
            {t("calculatedMetrics")}
          </Heading>

          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold">{t("cashFlow")}:</Text>
              <Text>
                {metrics.cashFlow.toFixed(2)} {t("perMonth")}
              </Text>
            </GridItem>

            <GridItem>
              <Text fontWeight="bold">{t("roi")}:</Text>
              <Text>
                {metrics.roi.toFixed(2)}
                {t("percent")}
              </Text>
            </GridItem>

            <GridItem>
              <Text fontWeight="bold">{t("paybackPeriod")}:</Text>
              <Text>
                {metrics.paybackPeriod.toFixed(2)} {t("years")}
              </Text>
            </GridItem>

            <GridItem>
              <Text fontWeight="bold">{t("cashOnCash")}:</Text>
              <Text>
                {metrics.cashOnCash.toFixed(2)}
                {t("percent")}
              </Text>
            </GridItem>

            <GridItem>
              <Text fontWeight="bold">{t("capRate")}:</Text>
              <Text>
                {metrics.capRate.toFixed(2)}
                {t("percent")}
              </Text>
            </GridItem>
          </Grid>
        </Box>

        {/* Form Controls */}
        <Flex mt={6} justifyContent="space-between">
          <Button colorScheme="blue" onClick={handleSave}>
            {t("save")}
          </Button>

          <Button colorScheme="green" onClick={handleAddToComparison}>
            {t("addToComparison")}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
