import { createRoot } from "react-dom/client";
import "./index.css";
import { Providers } from "./app/Providers";
import "@/app/i18n";
import { router } from "./router";
import App from "./app/App";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>
);
