import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemeContextProvider from "./context/CustomThemeProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <>
        <App />
      </>
    </ThemeContextProvider>
  </React.StrictMode>
);
