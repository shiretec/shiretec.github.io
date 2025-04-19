import React from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";

interface FormFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
  min?: number;
  max?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  suffix,
  min,
  max,
}) => {
  return (
    <Box>
      <Text mb={1} fontWeight="bold">
        {label}
      </Text>
      <Flex>
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
        />
        {suffix && (
          <Box
            display="flex"
            alignItems="center"
            px={2}
            bg="gray.100"
            borderWidth="1px"
            borderLeftWidth="0"
            borderRadius="0 4px 4px 0"
          >
            {suffix}
          </Box>
        )}
      </Flex>
    </Box>
  );
};
