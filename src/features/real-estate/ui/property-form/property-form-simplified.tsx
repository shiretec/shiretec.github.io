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
  initialValues = {},
  onSave,
  onAddToComparison,
}) => {
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
        <Heading size="md">Выбор варианта</Heading>
      </Box>
      <Box p={4}>
        {/* Tab Navigation */}
        <Flex mb={4}>
          <Button
            variant={activeTab === "basic" ? "solid" : "outline"}
            onClick={() => setActiveTab("basic")}
            mr={2}
          >
            Основная информация
          </Button>
          <Button
            variant={activeTab === "expenses" ? "solid" : "outline"}
            onClick={() => setActiveTab("expenses")}
            mr={2}
          >
            Расходы
          </Button>
          <Button
            variant={activeTab === "income" ? "solid" : "outline"}
            onClick={() => setActiveTab("income")}
          >
            Доходы
          </Button>
        </Flex>

        {/* Basic Information Tab */}
        {activeTab === "basic" && (
          <Flex direction="column" gap={4}>
            <Box>
              <Text mb={1} fontWeight="bold">
                Название объекта
              </Text>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Введите название объекта"
              />
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                Тип недвижимости
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
                <option value="">Выберите тип недвижимости</option>
                <option value="apartment">Квартира</option>
                <option value="house">Дом</option>
                <option value="commercial">Коммерческая недвижимость</option>
              </select>
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                Адрес
              </Text>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Введите адрес"
              />
            </Box>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <Box>
                  <Text mb={1} fontWeight="bold">
                    Стоимость объекта
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
                      ₽
                    </Box>
                  </Flex>
                </Box>
              </GridItem>

              <GridItem>
                <Box>
                  <Text mb={1} fontWeight="bold">
                    Первоначальный взнос
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
                      ₽
                    </Box>
                  </Flex>
                </Box>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <Box>
                  <Text mb={1} fontWeight="bold">
                    Процентная ставка
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
                      %
                    </Box>
                  </Flex>
                </Box>
              </GridItem>

              <GridItem>
                <Box>
                  <Text mb={1} fontWeight="bold">
                    Срок кредита
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
                      лет
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
                Налог на недвижимость
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
                  ₽/год
                </Box>
              </Flex>
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                Страховка
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
                  ₽/год
                </Box>
              </Flex>
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                Коммунальные услуги
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
                  ₽/мес
                </Box>
              </Flex>
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                Обслуживание
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
                  ₽/мес
                </Box>
              </Flex>
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                Управление недвижимостью
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
                  ₽/мес
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
                Ежемесячная арендная плата
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
                  ₽/мес
                </Box>
              </Flex>
            </Box>

            <Box>
              <Text mb={1} fontWeight="bold">
                Заполняемость
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
                <Text>Сезонные корректировки</Text>
              </Flex>
            </Box>
          </Flex>
        )}

        {/* Calculated Metrics */}
        <Box mt={6} p={4} bg="gray.50" borderRadius="md">
          <Heading size="sm" mb={3}>
            Расчетные показатели
          </Heading>

          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold">Денежный поток:</Text>
              <Text>{metrics.cashFlow.toFixed(2)} ₽/мес</Text>
            </GridItem>

            <GridItem>
              <Text fontWeight="bold">ROI:</Text>
              <Text>{metrics.roi.toFixed(2)}%</Text>
            </GridItem>

            <GridItem>
              <Text fontWeight="bold">Окупаемость:</Text>
              <Text>{metrics.paybackPeriod.toFixed(2)} лет</Text>
            </GridItem>

            <GridItem>
              <Text fontWeight="bold">Доходность на вложенные:</Text>
              <Text>{metrics.cashOnCash.toFixed(2)}%</Text>
            </GridItem>

            <GridItem>
              <Text fontWeight="bold">Капитализация:</Text>
              <Text>{metrics.capRate.toFixed(2)}%</Text>
            </GridItem>
          </Grid>
        </Box>

        {/* Form Controls */}
        <Flex mt={6} justifyContent="space-between">
          <Button colorScheme="blue" onClick={handleSave}>
            Сохранить
          </Button>

          <Button colorScheme="green" onClick={handleAddToComparison}>
            Добавить к сравнению
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
