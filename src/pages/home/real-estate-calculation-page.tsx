import { Center, Container, Flex, Heading, Stack } from "@chakra-ui/react";
import { SocialLinks } from "@/widgets/social-links";
import { Copyright } from "@/widgets/copyright";
import { ReStrategySelector } from "../../features/re-strategy-selector";

export const RealEstateCalculationPage = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Center bg="purple.200" p={2} minH={55}>
        <Heading>Estimate your Real Estate ideas with "ShiRETec"</Heading>
      </Center>

      <Container flex={1} py={2}>
        <ReStrategySelector />
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
