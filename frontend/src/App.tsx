import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate
} from "react-router-dom";
import NavbarComponent from "./components/navbar";
import HomePage from "./pages/homePage";
import SignUpComponent from "./pages/SignUp";
import UserDashboardHome from "./pages/dashboard/userDashboard";
import SavedRecipesComponent from "./pages/dashboard/SavedRecipesComponent";
import HomeRecipes from "./components/HomeRecipes";
import UserFriendsComponent from "./components/UserFriendsComponent";
import LogInComponent from "./pages/login";
import { UseAuthContext } from "./hooks/useAuthContext";
import { useTranslation } from "react-i18next";

//home recipe lookup
import IndividualRecipe from "./pages/IndividualRecipe";

//user recipe lookup

import UserRecipe from "./pages/UserRecipe";
import AdminComponent from "./pages/dashboard/AdminComponent";
import IndividualUserRecipe from "./pages/dashboard/individualUserRecipe";

//Admin Component 



function App() {



  const { t, i18n } = useTranslation();
  // A helper function to determine if the navbar should be shown
  const shouldShowNavbar = (pathname: string) => {
    return pathname !== "/signup" && pathname !== "/login";
  };

  const { dispatch, user } = UseAuthContext();


  //Check to see if token is still valid
  useEffect(() => {

  }, [user])

  console.log("AuthContext State:", user);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={user ? <Navigate to={"/userDashboard"} /> : <HomePage />} />
        <Route path="/signup" element={user ? <Navigate to={"/userDashboard"} /> : <SignUpComponent />} />
        <Route path="/login" element={user ? <Navigate to={"/userDashboard"} /> : <LogInComponent />} />

        {/* Main dashboard route */}
        <Route path="/userDashboard/*" element={user ? <UserDashboardHome /> : <Navigate to={"/"} />}>
          {/* Nested routes for different sections of the dashboard */}
          <Route
            index // This will match when there is no additional path after "/userDashboard/"
            element={
              user ?
                <HomeRecipes />
                : <Navigate to={"/login"} />
            }
          />
          <Route
            path="savedRecipes"
            element={user ?

              <SavedRecipesComponent />
              : <Navigate to={"/login"} />


            }
          />
          <Route
            path="friends"
            element={
              <>
                <UserFriendsComponent />
                {/* Additional components specific to SavedRecipesComponent can be added here */}
              </>
            }
          />
          <Route
            path="Admin"
            element={
              <>
                <AdminComponent />
                {/* Additional components specific to SavedRecipesComponent can be added here */}
              </>
            }
          />
        </Route>

        <>
          <Route path="/individual-recipe/:id" element={<IndividualRecipe />} />
        </>
        <>        <Route path="/individual-user-recipe/:id" element={<IndividualUserRecipe />} />
        </>

      </Route>

    )
  );

  return <RouterProvider router={router} />;
}

export default App;
