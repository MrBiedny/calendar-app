import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Calendar from "./components/scheduler/Calendar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Calendar />
  </StrictMode>
);
