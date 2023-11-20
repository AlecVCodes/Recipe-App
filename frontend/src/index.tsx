import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n"

import { SavedRecipesContextProvider } from "./contexts/SavedRecipesContext";
import { AuthContextProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SavedRecipesContextProvider>
        <App />
      </SavedRecipesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
