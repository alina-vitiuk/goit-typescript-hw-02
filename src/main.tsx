import { StrictMode } from "react";
// import { createRoot } from 'react-dom/client'
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
      <App /> 
  </StrictMode>
);
