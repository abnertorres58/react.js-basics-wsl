import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TravelTodoList from "./components/TravelTodoList";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TravelTodoList />
  </StrictMode>
);
