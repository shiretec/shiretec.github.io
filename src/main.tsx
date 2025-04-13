import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraUIProvider } from "@/app/providers/theme/chakra-provider.tsx";
import App from "@/app/app.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraUIProvider>
      <App />
    </ChakraUIProvider>
  </StrictMode>,
);
