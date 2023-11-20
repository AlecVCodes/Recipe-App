import { UseAuthContext } from "./useAuthContext";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(null);

  // Context
  const { dispatch } = UseAuthContext();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const userToken = localStorage.getItem("user");
      
      if (userToken) {
        
        try {
          const decodedToken: any = jwtDecode(userToken);

          if (decodedToken.exp && typeof decodedToken.exp === "number") {
            if (decodedToken.exp * 1000 < Date.now()) {
              // Token has expired, remove user and dispatch logout
              localStorage.removeItem("user");
              dispatch({ type: "LOGOUT" });
            }
          } else {
            console.error("Invalid token structure: 'exp' property is missing or not a number");
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          // Handle token decoding error if needed
        }
      }
    };

    checkTokenExpiration();
  }, []);

  const login = async (email: any, password: any) => {
    setIsLoading(true);
    setError(null);

    const data = { email, password };

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const json = await response.json();
        setIsLoading(false);
        setError(json.error);
        localStorage.removeItem("user");
        console.log("We don't have a user");
        return;
      }

      const json = await response.json();

      // Store user data from the server response in local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update auth context
      dispatch({ type: "LOGIN", payload: json });

      // Fetch the user's role from another endpoint
      const roleResponse = await fetch("/api/user/role", {
        method: "GET",
        headers: { Authorization: `Bearer ${json.token}` },
      });

      if (roleResponse.ok) {
        const roleData = await roleResponse.json();
        console.log(roleData, "role data");
        // Update user data with the role and store it in local storage
        const userWithRole = { ...json, role: roleData.role };
        localStorage.setItem("user", JSON.stringify(userWithRole));
        dispatch({ type: "LOGIN", payload: userWithRole });
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      // Handle other login errors if needed
      setIsLoading(false);
      setError("An error occurred during login.");
    }
  };

  return { login, isLoading, error };
};
