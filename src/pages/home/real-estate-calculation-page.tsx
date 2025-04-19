import { useState } from "react";
import { Center, Container, Flex, Heading, Stack } from "@chakra-ui/react";
import { SocialLinks } from "../../widgets/social-links";
import { Copyright } from "../../widgets/copyright";
import { v4 as uuid } from "uuid";

// Import our new components
import { PropertyForm } from "../../features/real-estate/ui/property-form/property-form-simplified";
import { ComparisonTable } from "../../features/real-estate/ui/comparison-table/comparison-table";
import {
  RealEstateFormState,
  RealEstateProperty,
} from "../../features/real-estate/model";
import { LanguageSwitcher } from "../../features/i18n/ui/language-switcher";
import { I18nProvider, useI18n } from "../../features/i18n/model";

// The main page component wrapped with I18nProvider
export const RealEstateCalculationPage = () => {
  return (
    <I18nProvider>
      <RealEstateCalculator />
    </I18nProvider>
  );
};

// The actual calculator component with access to i18n
const RealEstateCalculator = () => {
  const { t, language, setLanguage } = useI18n();

  // State for managing properties
  const [properties, setProperties] = useState<RealEstateProperty[]>([]);

  // State for the current property being edited
  const [currentProperty, setCurrentProperty] =
    useState<RealEstateFormState | null>(null);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(
    null,
  );

  // Handle saving a property
  const handleSaveProperty = (propertyData: RealEstateFormState) => {
    if (editingPropertyId) {
      // Update existing property
      setProperties((prevProperties) =>
        prevProperties.map((prop) =>
          prop.id === editingPropertyId
            ? { ...propertyData, id: editingPropertyId }
            : prop,
        ),
      );
      setEditingPropertyId(null);
    } else {
      // Create new property with calculated metrics
      const newProperty: RealEstateProperty = {
        ...propertyData,
        id: uuid(),
        // Add calculated metrics
        cashFlow: calculateCashFlow(propertyData),
        roi: calculateROI(propertyData),
        capRate: calculateCapRate(propertyData),
        cashOnCash: calculateCashOnCash(propertyData),
        paybackPeriod: calculatePaybackPeriod(propertyData),
      };

      setProperties((prev) => [...prev, newProperty]);
    }

    // Reset form
    setCurrentProperty(null);
  };

  // Handle adding a property to comparison
  const handleAddToComparison = (propertyData: RealEstateFormState) => {
    const newProperty: RealEstateProperty = {
      ...propertyData,
      id: uuid(),
      // Add calculated metrics
      cashFlow: calculateCashFlow(propertyData),
      roi: calculateROI(propertyData),
      capRate: calculateCapRate(propertyData),
      cashOnCash: calculateCashOnCash(propertyData),
      paybackPeriod: calculatePaybackPeriod(propertyData),
    };

    setProperties((prev) => [...prev, newProperty]);
    setCurrentProperty(null);
  };

  // Handle editing a property
  const handleEditProperty = (propertyId: string) => {
    const propertyToEdit = properties.find((prop) => prop.id === propertyId);
    if (propertyToEdit) {
      setCurrentProperty(propertyToEdit);
      setEditingPropertyId(propertyId);
    }
  };

  // Handle deleting a property
  const handleDeleteProperty = (propertyId: string) => {
    setProperties((prev) => prev.filter((prop) => prop.id !== propertyId));
    if (editingPropertyId === propertyId) {
      setEditingPropertyId(null);
      setCurrentProperty(null);
    }
  };

  // Calculation functions
  const calculateCashFlow = (property: RealEstateFormState): number => {
    const loanAmount = property.initialInvestment - property.downPayment;
    const monthlyInterestRate = property.interestRate / 100 / 12;
    const numberOfPayments = property.loanTerm * 12;

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
      property.propertyTax / 12 +
      property.insurance / 12 +
      property.utilities +
      property.maintenance +
      property.managementFees +
      monthlyMortgagePayment;

    // Monthly income with occupancy rate
    const effectiveMonthlyRent =
      property.monthlyRent * (property.occupancyRate / 100);

    // Cash flow
    return effectiveMonthlyRent - totalMonthlyExpenses;
  };

  const calculateROI = (property: RealEstateFormState): number => {
    const annualCashFlow = calculateCashFlow(property) * 12;
    return property.initialInvestment > 0
      ? (annualCashFlow / property.initialInvestment) * 100
      : 0;
  };

  const calculateCapRate = (property: RealEstateFormState): number => {
    const annualCashFlow = calculateCashFlow(property) * 12;
    return property.initialInvestment > 0
      ? (annualCashFlow / property.initialInvestment) * 100
      : 0;
  };

  const calculateCashOnCash = (property: RealEstateFormState): number => {
    const annualCashFlow = calculateCashFlow(property) * 12;
    return property.downPayment > 0
      ? (annualCashFlow / property.downPayment) * 100
      : 0;
  };

  const calculatePaybackPeriod = (property: RealEstateFormState): number => {
    const annualCashFlow = calculateCashFlow(property) * 12;
    return annualCashFlow > 0 ? property.initialInvestment / annualCashFlow : 0;
  };

  return (
    <Flex direction="column" minH="100vh">
      <Flex
        as="header"
        bg="purple.200"
        p={2}
        minH={55}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="lg">{t("pageTitle")}</Heading>
        <LanguageSwitcher
          currentLanguage={language}
          onLanguageChange={(lang: string) => setLanguage(lang as "ru" | "en")}
        />
      </Flex>

      <Container maxW="container.xl" flex={1} py={4}>
        {/* Property Form */}
        <PropertyForm
          initialValues={currentProperty || undefined}
          onSave={handleSaveProperty}
          onAddToComparison={handleAddToComparison}
        />

        {/* Comparison Table */}
        <ComparisonTable
          properties={properties}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
        />
      </Container>

      <Center as="footer" bg="purple.200" pt={2} pb={1}>
        <Stack gap={1}>
          <SocialLinks />
          <Copyright />
        </Stack>
      </Center>
    </Flex>
  );
};

/**
 * const defaultReslEstateDetails: RealEstateDetails = {
 *   id: "",
 *   cash: "300000",
 *   mortgagePercentage: "10",
 *   strategy: false,
 * };
 *   const [realEstates, setRealEstates] = useState<RealEstateDetails[]>([
 *     { ...defaultReslEstateDetails, id: uuid() },
 *   ]);
 *   const onAddRealEstate = () => {
 *     setRealEstates((realEstates) => [
 *       ...realEstates,
 *       { ...defaultReslEstateDetails, id: uuid() },
 *     ]);
 *   };
 *
 *   const onUpdateRealEstate = (updatedDetails: RealEstateDetails) => {
 *     const newEstates = realEstates.map((details) => {
 *       return details.id === updatedDetails.id ? updatedDetails : details;
 *     });
 *     setRealEstates(newEstates);
 *   };
 *
 *       <Box p={2}>
 *         <Button bg="purple.500" onClick={onAddRealEstate}>
 *           Add more properties!
 *         </Button>
 *         <Grid
 *           mt={2}
 *           gap={1}
 *           gridTemplateColumns="repeat(auto-fill, minmax(24rem, 24rem))"
 *         >
 *           {realEstates.map((realEstate) => (
 *             <GridItem key={realEstate.id}>
 *               <RealEstateCard
 *                 key={realEstate.id}
 *                 details={realEstate}
 *                 onDetailsChange={(updatedDetails: RealEstateDetails) => {
 *                   onUpdateRealEstate(updatedDetails);
 *                 }}
 *               />
 *             </GridItem>
 *           ))}
 *         </Grid>
 *       </Box>
 */
