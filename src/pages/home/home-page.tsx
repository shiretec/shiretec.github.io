import { useState } from "react";
import { RealEstateCard, RealEstateDetails } from "@/widgets/real-estate-card";
import { Button, GridItem, Grid, Box, Center, Heading } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

const defaultReslEstateDetails: RealEstateDetails = {
  id: "",
  cash: "300000",
  mortgagePercentage: "10",
  strategy: false,
};

export const HomePage = () => {
  const [realEstates, setRealEstates] = useState<RealEstateDetails[]>([
    { ...defaultReslEstateDetails, id: uuid() },
  ]);

  const onAddRealEstate = () => {
    setRealEstates((realEstates) => [
      ...realEstates,
      { ...defaultReslEstateDetails, id: uuid() },
    ]);
  };

  const onUpdateRealEstate = (updatedDetails: RealEstateDetails) => {
    const newEstates = realEstates.map((details) => {
      return details.id === updatedDetails.id ? updatedDetails : details;
    });
    setRealEstates(newEstates);
  };

  return (
    <>
      <Center bg="purple.200" p={2}>
        <Heading>ShiRETec - Estimate your Real Estate ideas</Heading>
      </Center>
      <Box p={2}>
        <Button bg="purple.500" onClick={onAddRealEstate}>
          Add more properties!
        </Button>
        <Grid
          mt={2}
          gap={1}
          gridTemplateColumns="repeat(auto-fill, minmax(24rem, 24rem))"
        >
          {realEstates.map((realEstate) => (
            <GridItem key={realEstate.id}>
              <RealEstateCard
                key={realEstate.id}
                details={realEstate}
                onDetailsChange={(updatedDetails: RealEstateDetails) => {
                  onUpdateRealEstate(updatedDetails);
                }}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};
