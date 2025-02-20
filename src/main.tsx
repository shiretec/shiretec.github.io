import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/shared/ui/provider.tsx";
import App from "@/app/app.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
);
