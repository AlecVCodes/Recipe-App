import React, { useEffect, useState, useRef } from "react";
import { UseSavedRecipesContext } from "../../hooks/useSavedRecipes";
import { UseAuthContext } from "../../hooks/useAuthContext";
import { Link } from 'react-router-dom';
import { Recipe } from "../../components/HomeRecipes";
import { Ingredient } from "../../components/HomeRecipes";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../components/loaderComponent";


interface SavedRecipe {
  _id: string;
  img: string | undefined;
  title: React.ReactNode;
  ingredients: Ingredient[];
}

function SavedRecipesComponent() {
  // States
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const timeoutRef = useRef<number | null>(null);

  const { user } = UseAuthContext();
  const { savedRecipes, dispatch } = UseSavedRecipesContext();

  // Navigation
  const Navigate = useNavigate();

  //data loading state
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/userRecipes", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!response.ok) {
          console.error(`Failed to fetch user saved recipes. Status: ${response.status}`);
          setError("Failed to fetch recipes");

          return;
    
        }
        const json = await response.json();
        if (response.ok) {
          console.log(json, "saved recipes");
          
                // stop load and show data
                setIsLoading(false); 
        }
        dispatch({ type: "SET_SAVED_RECIPES", payload: json });
      } catch (error) {
        console.error("Error during fetch:", error);
        setError("Error during fetch");

        //stop load and show error 
         setIsLoading(false); 
      }
    };
    if (user) {
      fetchRecipes();
    }
  }, [dispatch]);

  const deleteSavedRecipe = async (savedRecipeId: any) => {
    console.log("Deleting saved recipe with ID:", savedRecipeId);
    try {
      const response = await fetch("/api/userRecipes/" + savedRecipeId, {
        headers: { Authorization: `Bearer ${user.token}` },
        method: "DELETE",
      });
      if (!response.ok) {
        setError("Failed to delete recipe");
        console.error(`Failed to delete recipe with ID ${savedRecipeId}. Status: ${response.status}`);
        return;
      }
      const json = await response.json();
      dispatch({ type: "DELETE_SAVED_RECIPE", payload: json });
      setSuccess("Recipe deleted successfully");
      // Reset success message after 800 milliseconds (0.8 seconds)
      timeoutRef.current = window.setTimeout(() => {
        setSuccess("");
        setError("");
      }, 800);
    } catch (error) {
      setError("Error during delete");
      console.error("Error during delete:", error);
    }
  };

  const handleRecipeClick = (savedRecipe: SavedRecipe) => {
    // Get recipe id
    const id = savedRecipe._id;
    console.log(savedRecipe )
    // Navigate to that page based on the id of the recipe
  
    Navigate(`/individual-user-recipe/${id}`);
  };

  useEffect(() =>
  console.log(isLoading, 'isloading')
  , [isLoading])

  return (
    <>
     <div className="dashboard-container">
    {isLoading === false ? ( // Check if isLoading is false
      savedRecipes && savedRecipes.length > 0 ? (
       
        <div className="recipes">
          {savedRecipes.map((savedRecipe) => (
            <div className="recipe-card" key={savedRecipe._id}>
              <img onClick={() => handleRecipeClick(savedRecipe)} src={savedRecipe.img} alt="food-img" />
              <div className="display-f text">
                <p>{savedRecipe.title}</p>
                <button
                  onClick={() => deleteSavedRecipe(savedRecipe._id)}
                  className="recipe-card-btn-delete"
                >
                  <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 1.75V3H19.25C19.4489 3 19.6397 3.07902 19.7803 3.21967C19.921 3.36032 20 3.55109 20 3.75C20 3.94891 19.921 4.13968 19.7803 4.28033C19.6397 4.42098 19.4489 4.5 19.25 4.5H0.75C0.551088 4.5 0.360322 4.42098 0.21967 4.28033C0.0790175 4.13968 0 3.94891 0 3.75C0 3.55109 0.0790175 3.36032 0.21967 3.21967C0.360322 3.07902 0.551088 3 0.75 3H6V1.75C6 0.784 6.784 0 7.75 0H12.25C13.216 0 14 0.784 14 1.75ZM7.5 1.75V3H12.5V1.75C12.5 1.6837 12.4737 1.62011 12.4268 1.57322C12.3799 1.52634 12.3163 1.5 12.25 1.5H7.75C7.6837 1.5 7.62011 1.52634 7.57322 1.57322C7.52634 1.62011 7.5 1.6837 7.5 1.75ZM2.997 6.178C2.98845 6.07926 2.96041 5.9832 2.91452 5.89536C2.86862 5.80752 2.80576 5.72965 2.72959 5.66625C2.65341 5.60284 2.56542 5.55517 2.47071 5.52598C2.376 5.49678 2.27644 5.48665 2.17779 5.49617C2.07914 5.50568 1.98336 5.53465 1.89597 5.58141C1.80858 5.62817 1.73133 5.69178 1.66868 5.76857C1.60602 5.84536 1.55921 5.93381 1.53095 6.0288C1.50268 6.12379 1.49352 6.22345 1.504 6.322L2.916 20.92C2.95823 21.3527 3.16001 21.7542 3.48203 22.0462C3.80405 22.3383 4.22325 22.5001 4.658 22.5H15.342C15.7769 22.5 16.1962 22.3382 16.5183 22.0459C16.8403 21.7536 17.042 21.3519 17.084 20.919L18.497 6.322C18.5161 6.12388 18.4557 5.9263 18.3291 5.7727C18.2025 5.61911 18.0201 5.5221 17.822 5.503C17.6239 5.4839 17.4263 5.54429 17.2727 5.67088C17.1191 5.79747 17.0221 5.97988 17.003 6.178L15.591 20.774C15.585 20.8359 15.5562 20.8933 15.5102 20.9351C15.4641 20.9769 15.4042 21 15.342 21H4.658C4.59582 21 4.53587 20.9769 4.48983 20.9351C4.44379 20.8933 4.41497 20.8359 4.409 20.774L2.997 6.178Z" fill="#F13131"/>
</svg>

                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-saved-recipes">
          <p>No saved recipes.</p>
          <Link to="/userDashboard" className="return-home-btn">
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.0001 7.99979C19.0001 7.73457 18.8947 7.48022 18.7072 7.29268C18.5197 7.10514 18.2653 6.99979 18.0001 6.99979C17.7349 6.99979 17.4805 7.10514 17.293 7.29268C17.1054 7.48022 17.0001 7.73457 17.0001 7.99979H19.0001ZM5.00008 7.99979C5.00008 7.73457 4.89472 7.48022 4.70719 7.29268C4.51965 7.10514 4.2653 6.99979 4.00008 6.99979C3.73486 6.99979 3.48051 7.10514 3.29297 7.29268C3.10544 7.48022 3.00008 7.73457 3.00008 7.99979H5.00008ZM19.2931 10.7068C19.4817 10.8889 19.7343 10.9897 19.9965 10.9875C20.2587 10.9852 20.5095 10.88 20.6949 10.6946C20.8803 10.5092 20.9855 10.2584 20.9878 9.99619C20.99 9.73399 20.8892 9.48139 20.7071 9.29279L19.2931 10.7068ZM11.0001 0.999786L11.7071 0.292786C11.5196 0.105315 11.2652 0 11.0001 0C10.7349 0 10.4806 0.105315 10.2931 0.292786L11.0001 0.999786ZM1.29308 9.29279C1.19757 9.38503 1.12139 9.49538 1.06898 9.61738C1.01657 9.73939 0.988985 9.87061 0.987831 10.0034C0.986677 10.1362 1.01198 10.2678 1.06226 10.3907C1.11254 10.5136 1.18679 10.6253 1.28069 10.7192C1.37458 10.8131 1.48623 10.8873 1.60913 10.9376C1.73202 10.9879 1.8637 11.0132 1.99648 11.012C2.12926 11.0109 2.26048 10.9833 2.38249 10.9309C2.50449 10.8785 2.61483 10.8023 2.70708 10.7068L1.29308 9.29279ZM6.00008 19.9998H16.0001V17.9998H6.00008V19.9998ZM19.0001 16.9998V7.99979H17.0001V16.9998H19.0001ZM5.00008 16.9998V7.99979H3.00008V16.9998H5.00008ZM20.7071 9.29279L11.7071 0.292786L10.2931 1.70679L19.2931 10.7068L20.7071 9.29279ZM10.2931 0.292786L1.29308 9.29279L2.70708 10.7068L11.7071 1.70679L10.2931 0.292786ZM16.0001 19.9998C16.7957 19.9998 17.5588 19.6837 18.1214 19.1211C18.684 18.5585 19.0001 17.7954 19.0001 16.9998H17.0001C17.0001 17.265 16.8947 17.5194 16.7072 17.7069C16.5197 17.8944 16.2653 17.9998 16.0001 17.9998V19.9998ZM6.00008 17.9998C5.73486 17.9998 5.48051 17.8944 5.29297 17.7069C5.10544 17.5194 5.00008 17.265 5.00008 16.9998H3.00008C3.00008 17.7954 3.31615 18.5585 3.87876 19.1211C4.44137 19.6837 5.20443 19.9998 6.00008 19.9998V17.9998Z" fill="black"/>
</svg>

            Return Home
          </Link>
        </div>
      )
    ) : (
      <div className={`loader ${isLoading ? '' : 'fade-out'}`}>
      <LoaderComponent />
    </div>
    )}
    <span className={error !== "" ? "error-message" : ""}>{error}</span>
    <span className={success !== "" ? "success-message" : ""}>{success}</span>
    </div>
  </>
  );
}

export default SavedRecipesComponent;
