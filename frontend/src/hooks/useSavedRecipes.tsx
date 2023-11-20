import { useContext } from "react";
import { savedRecipesContext } from "../contexts/SavedRecipesContext";

export const UseSavedRecipesContext = () => {
  const context = useContext(savedRecipesContext);

  if (!context) {
    throw Error(
      "usesavedRecipesContext must be used inside a savedRecipesContextProvider"
    );
  }
  return context;
};
