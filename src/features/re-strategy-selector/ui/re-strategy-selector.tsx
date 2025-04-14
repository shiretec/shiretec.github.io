import { SegmentGroup } from "@chakra-ui/react";

const strategies = ["Аренда", "Аренда + Капитализация", "Капитализация"];

export const ReStrategySelector: React.FC = () => {
  return (
    <SegmentGroup.Root defaultValue={strategies[0]}>
      <SegmentGroup.Indicator></SegmentGroup.Indicator>
      {strategies.map((item) => (
        <SegmentGroup.Item
          key={item}
          value={item}
          style={{ cursor: "pointer" }}
        >
          <SegmentGroup.ItemText>{item}</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup.Root>
  );
};
