import React from "react";
import { Button, Flex } from "@chakra-ui/react";

interface FormActionsProps {
  onSave: () => void;
  onAddToComparison: () => void;
  translations: {
    save: string;
    addToComparison: string;
  };
}

export const FormActions: React.FC<FormActionsProps> = ({
  onSave,
  onAddToComparison,
  translations,
}) => {
  return (
    <Flex mt={6} justifyContent="space-between">
      <Button colorScheme="blue" onClick={onSave}>
        {translations.save}
      </Button>

      <Button colorScheme="green" onClick={onAddToComparison}>
        {translations.addToComparison}
      </Button>
    </Flex>
  );
};
