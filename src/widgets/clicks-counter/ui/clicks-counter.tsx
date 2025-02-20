import { useState } from "react";
import { Button, HStack } from "@chakra-ui/react";

export const ClicksCounter = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div style={{ marginBottom: "8px" }}>Click to increase the counter</div>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <HStack>
        <Button onClick={() => setCount((count) => count + 1)}>
          Increase!
        </Button>
        <Button onClick={() => setCount((count) => count - 1)}>
          Decrease!
        </Button>
      </HStack>
    </>
  );
};
