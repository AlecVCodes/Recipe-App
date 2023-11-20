import React, { createContext, useReducer, ReactNode, useEffect } from "react";

// Define types for state and action
interface AuthState {
  [x: string]: any;
  user: any; // You should replace 'any' with the actual type of your user object
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: AuthState["user"];
}

// Define the context type
interface AuthContextType {
  user: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

// Create the context with an initial empty object as a default value
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Define the reducer function with proper types
export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// Define the type for AuthContextProvider props
interface AuthContextProviderProps {
  children: ReactNode;
}

// AuthContextProvider component
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
  
    user: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    try {
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []); // Empty dependency array to run the effect only once on mount

 

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
