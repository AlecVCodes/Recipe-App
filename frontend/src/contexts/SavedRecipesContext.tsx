import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import { Ingredient } from "../components/HomeRecipes";

interface SavedRecipes {
  title: ReactNode;
  img: string | undefined;
  _id: string; 
  ingredients: Ingredient[];
}

interface SavedRecipesState {
  savedRecipes: SavedRecipes[] | null;
}

type Action =
| { type: "SET_SAVED_RECIPES"; payload?: SavedRecipes[] | null }
  | { type: "CREATE_SAVED_RECIPE"; payload: SavedRecipes }
  | { type: "DELETE_SAVED_RECIPE"; payload: SavedRecipes };

interface SavedRecipesContextProps {
  children: ReactNode;
}

export const savedRecipesContext = createContext<{
  savedRecipes: SavedRecipes[] | null;
  dispatch: Dispatch<Action>;
} | undefined>(undefined);

export const savedRecipesReducer = (
  state: SavedRecipesState,
  action: Action
): SavedRecipesState => {
  switch (action.type) {
    case "SET_SAVED_RECIPES":
      return {
        savedRecipes: action.payload !== undefined ? action.payload : null,
      };
    case "CREATE_SAVED_RECIPE":
      return {
        savedRecipes: [action.payload, ...(state.savedRecipes || [])],
      };
    case "DELETE_SAVED_RECIPE":
      return {
        savedRecipes: (state.savedRecipes || []).filter(
          (r) => r._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const SavedRecipesContextProvider = ({
  children,
}: SavedRecipesContextProps) => {
  const [state, dispatch] = useReducer(savedRecipesReducer, {
    savedRecipes: null,
  });

  return (
    <savedRecipesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </savedRecipesContext.Provider>
  );
};
