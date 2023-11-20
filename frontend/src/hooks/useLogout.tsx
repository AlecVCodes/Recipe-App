import React from "react";
import { UseAuthContext } from "./useAuthContext";
import {UseSavedRecipesContext} from '../hooks/useSavedRecipes'

export const useLogout = () => {
  const { dispatch } = UseAuthContext();
  const { dispatch: SavedRecipesDispatch } = UseSavedRecipesContext();
  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    SavedRecipesDispatch({type: "SET_SAVED_RECIPES", payload : null})
  };

  //remove user from storage

  //export logout fumction
  return { logout };
};
