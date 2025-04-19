import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

interface CheckboxFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  name,
  checked,
  onChange,
}) => {
  return (
    <Box>
      <Flex alignItems="center">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          style={{ marginRight: "8px" }}
        />
        <Text>{label}</Text>
      </Flex>
    </Box>
  );
};
