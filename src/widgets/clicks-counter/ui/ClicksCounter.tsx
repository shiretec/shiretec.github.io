import { useState } from "react";

export const ClicksCounter = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div style={{ marginBottom: "8px" }}>Click to increase the counter</div>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  );
};
