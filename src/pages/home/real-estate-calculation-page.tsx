import { Box, Container, Heading, Flex } from "@chakra-ui/react";

// Import our components
import { PropertyForm } from "../../features/real-estate/ui/property-form/property-form";
import { ComparisonTable } from "../../features/real-estate/ui/comparison-table/comparison-table";
import { useI18n } from "../../features/i18n/model/use-i18n-redux";
import { CurrencySelector } from "../../features/currency/ui/currency-selector-redux";
import { LanguageSwitcher } from "../../features/i18n/ui/language-switcher-redux";
import { GoogleSheetsIntegration } from "../../features/google-sheets/ui/google-sheets-integration";

// The main page component using Redux
export const RealEstateCalculationPage = () => {
  const { t } = useI18n();

  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction="column" gap={8}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="xl">
            {t("pageTitle")}
          </Heading>
          <Box display="flex" gap={4} alignItems="center">
            <GoogleSheetsIntegration />
            <CurrencySelector />
            <LanguageSwitcher />
          </Box>
        </Box>

        {/* Property Form - now using Redux */}
        <PropertyForm />

        {/* Comparison Table - now using Redux */}
        <ComparisonTable />
      </Flex>
    </Container>
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
