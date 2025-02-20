import { ClicksCounter } from "@/widgets/clicks-counter/ui";

export const HomePage = () => {
  return (
    <>
      <h1>Count your counts</h1>
      <div>
        <ClicksCounter />
      </div>
    </>
  );
};
