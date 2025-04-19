import React, { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useI18n } from "../../../i18n/model/use-i18n-redux";
import { currencies } from "../../../currency/model";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../app/providers/store/hooks";
import { RootState } from "../../../../app/providers/store/store";
import {
  selectFormData,
  selectActiveTab,
  setFormData,
  updateField,
  updateNumberField,
  setActiveTab,
  resetForm,
} from "../../model/property-form-slice";
import {
  addProperty,
  updateProperty,
  selectSelectedProperty,
  selectSelectedPropertyId,
} from "../../model/properties-slice";
import {
  FormTabs,
  BasicInfoTab,
  ExpensesTab,
  IncomeTab,
  CalculatedMetrics,
  FormActions,
} from "./components";

export const PropertyForm: React.FC = () => {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const currency = useAppSelector(
    (state: RootState) => state.currency.currency,
  );

  // Get form data and active tab from Redux
  const formData = useAppSelector((state: RootState) => selectFormData(state));
  const activeTab = useAppSelector((state: RootState) =>
    selectActiveTab(state),
  );

  // Get selected property from Redux store
  const selectedProperty = useAppSelector((state: RootState) =>
    selectSelectedProperty(state),
  );
  const selectedPropertyId = useAppSelector((state: RootState) =>
    selectSelectedPropertyId(state),
  );

  // Initialize form data with selected property if available
  useEffect(() => {
    if (selectedProperty) {
      dispatch(setFormData(selectedProperty));
    }
  }, [dispatch, selectedProperty]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      dispatch(updateNumberField({ name, value }));
    } else {
      dispatch(updateField({ name, value }));
    }
  };

  const handleNumberChange = (name: string, value: string) => {
    dispatch(updateNumberField({ name, value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    dispatch(updateField({ name, value: checked }));
  };

  const handleSave = () => {
    if (selectedPropertyId) {
      // Update existing property
      dispatch(updateProperty({ id: selectedPropertyId, property: formData }));
    } else {
      // Add as new property
      dispatch(addProperty(formData));
    }
    dispatch(resetForm());
  };

  const handleAddToComparison = () => {
    // Add to comparison list
    dispatch(addProperty(formData));
  };

  const handleTabChange = (tab: "basic" | "expenses" | "income") => {
    dispatch(setActiveTab(tab));
  };

  // Calculate metrics based on form data
  const calculateMetrics = () => {
    const loanAmount = formData.initialInvestment - formData.downPayment;
    const monthlyInterestRate = formData.interestRate / 100 / 12;
    const numberOfPayments = formData.loanTerm * 12;

    // Calculate monthly mortgage payment
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

    // Cash on cash return
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
  const currencySymbol =
    currencies[currency as keyof typeof currencies]?.symbol || "$";

  return (
    <Box borderWidth="1px" borderRadius="md" overflow="hidden">
      <Box bg="purple.100" p={4}>
        <Heading size="md">{t("propertyFormTitle")}</Heading>
      </Box>
      <Box p={4}>
        {/* Tab Navigation */}
        <FormTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          labels={{
            propertyInfoTab: t("propertyInfoTab"),
            expensesTab: t("expensesTab"),
            incomeTab: t("incomeTab"),
          }}
        />

        {/* Basic Information Tab */}
        {activeTab === "basic" && (
          <BasicInfoTab
            formData={formData}
            handleChange={handleChange}
            handleNumberChange={handleNumberChange}
            currencySymbol={currencySymbol}
            translations={{
              propertyName: t("propertyName"),
              propertyType: t("propertyType"),
              initialInvestment: t("initialInvestment"),
              downPayment: t("downPayment"),
              apartment: t("apartment"),
              house: t("house"),
              commercial: t("commercial"),
            }}
          />
        )}

        {/* Expenses Tab */}
        {activeTab === "expenses" && (
          <ExpensesTab
            formData={formData}
            handleNumberChange={handleNumberChange}
            currencySymbol={currencySymbol}
            translations={{
              interestRate: t("interestRate"),
              loanTerm: t("loanTerm"),
              propertyTax: t("propertyTax"),
              insurance: t("insurance"),
              utilities: t("utilities"),
              maintenance: t("maintenance"),
              managementFees: t("managementFees"),
              years: t("years"),
            }}
          />
        )}

        {/* Income Tab */}
        {activeTab === "income" && (
          <IncomeTab
            formData={formData}
            handleNumberChange={handleNumberChange}
            handleCheckboxChange={handleCheckboxChange}
            currencySymbol={currencySymbol}
            translations={{
              monthlyRent: t("monthlyRent"),
              occupancyRate: t("occupancyRate"),
              seasonalAdjustments: t("seasonalAdjustments"),
            }}
          />
        )}

        {/* Calculated Metrics */}
        <CalculatedMetrics
          metrics={metrics}
          currencySymbol={currencySymbol}
          translations={{
            calculatedMetrics: t("calculatedMetrics"),
            cashFlow: t("cashFlow"),
            roi: t("roi"),
            capRate: t("capRate"),
            cashOnCash: t("cashOnCash"),
            paybackPeriod: t("paybackPeriod"),
            years: t("years"),
            percent: t("percent"),
          }}
        />

        {/* Form Controls */}
        <FormActions
          onSave={handleSave}
          onAddToComparison={handleAddToComparison}
          translations={{
            save: t("save"),
            addToComparison: t("addToComparison"),
          }}
        />
      </Box>
    </Box>
  );
};
