import { useState } from "react";
import { Button, HStack } from "@chakra-ui/react";

export const ClicksCounter = () => {
  const [count, setCount] = useState(0);

  const onClickHandler = () => {
    setCount((count) => count + 1);
  };

  return (
    <>
      <div style={{ marginBottom: "8px" }}>Click to increase the counter</div>
      <div>count is {count}</div>
      <HStack>
        <Button onClick={onClickHandler}>Increase!</Button>
        <Button onClick={() => setCount((count) => count - 1)}>
          Decrease!
        </Button>
      </HStack>
    </>
  );
};
