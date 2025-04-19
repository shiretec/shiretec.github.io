import React from "react";
import { Button, Flex } from "@chakra-ui/react";

type TabType = "basic" | "expenses" | "income";

interface FormTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  labels: {
    propertyInfoTab: string;
    expensesTab: string;
    incomeTab: string;
  };
}

export const FormTabs: React.FC<FormTabsProps> = ({
  activeTab,
  onTabChange,
  labels,
}) => {
  return (
    <Flex mb={4}>
      <Button
        variant={activeTab === "basic" ? "solid" : "outline"}
        onClick={() => onTabChange("basic")}
        mr={2}
      >
        {labels.propertyInfoTab}
      </Button>
      <Button
        variant={activeTab === "expenses" ? "solid" : "outline"}
        onClick={() => onTabChange("expenses")}
        mr={2}
      >
        {labels.expensesTab}
      </Button>
      <Button
        variant={activeTab === "income" ? "solid" : "outline"}
        onClick={() => onTabChange("income")}
      >
        {labels.incomeTab}
      </Button>
    </Flex>
  );
};
