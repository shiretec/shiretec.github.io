import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <Box>
      <Text mb={1} fontWeight="bold">
        {label}
      </Text>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          borderColor: "#E2E8F0",
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Box>
  );
};
