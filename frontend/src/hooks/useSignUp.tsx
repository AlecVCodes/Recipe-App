import { UseAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignUp = () => {
  const [error, setError] = useState<any>(null);
  const [isloading, setisLoading] = useState<any>(null);

  //context
  const { dispatch } = UseAuthContext();

  const SignUp = async (email: any, password: any) => {
    setisLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setisLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      //save user to local storage using jwt

      localStorage.setItem("user", JSON.stringify(json));

      //update auth context
      dispatch({ type: "LOGIN", payload: json });

      setisLoading(false);
    }
  };

  return { SignUp, isloading, error };
};
