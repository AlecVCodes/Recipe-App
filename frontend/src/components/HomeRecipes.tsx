import React, { useEffect, useState, useRef } from "react";
import { UseAuthContext } from "../hooks/useAuthContext";
import { useAsyncError, useNavigate } from "react-router-dom";
import LoaderComponent from "./loaderComponent";
import RecipeFilterComponent from "./RecipeFilterComponent";

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}


export interface Method {
  step: string
}


export interface Recipe {
  img: string;
  _id: string;
  title: string;
  ingredients: Ingredient[];
  imgLarge: string;
  method: Method[];
}

function HomeRecipes() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const timeoutRef = useRef<number | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[] | null>(null);
  const { user } = UseAuthContext();
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!response.ok) {
          console.error(`Failed to fetch recipes. Status: ${response.status}`);
          return;
        }
        const json = await response.json();
        setRecipes(json);
        setIsLoading(false);
      } catch (error) {
        console.error("Error during fetch:", error);
        setIsLoading(false);
      }
    };
    if (user) {
      fetchRecipes();
    }
  }, [user]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (error !== "") {
      timeoutRef.current = window.setTimeout(() => {
        setError("");
      }, 800);
    }
  }, [error]);

  const saveUserRecipes = async (recipeId: string) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (!response.ok) {
        console.error(
          `Failed to fetch recipe with ID ${recipeId}. Status: ${response.status}`
        );
        return;
      }
      const savedRecipe = await response.json();

      const postResponse = await fetch("/api/userRecipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(savedRecipe),
      });

      if (!postResponse.ok) {
        setError("Recipe already saved");
        console.error("Failed to post recipe to UserRecipes schema.");
      } else {
        setSuccess("Recipe saved successfully");
        timeoutRef.current = window.setTimeout(() => {
          setSuccess("");
          setError("");
        }, 800);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    const id = recipe._id;
    Navigate(`/individual-recipe/${id}`);
  };

  useEffect(() => {
    // Preload images when recipes or filteredRecipes change
    const preloadImages = () => {
      const imageUrls: string[] = [];

      const recipesToPreload =
        filteredRecipes !== null && filteredRecipes.length > 0
          ? filteredRecipes
          : recipes !== null
            ? recipes
            : [];

      recipesToPreload.forEach((recipe) => {
        if (recipe.img) {
          imageUrls.push(recipe.img);
        }
      });

      imageUrls.forEach((imageUrl) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = imageUrl;
        link.as = "image";
        document.head.appendChild(link);
      });
    };

    // Call the preloadImages function
    preloadImages();
  }, [filteredRecipes, recipes]);

  useEffect(() => {
    console.log(filteredRecipes, 'users filtered items');
  }, [filteredRecipes]);

  return (
    <>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="dashboard-container">
          <RecipeFilterComponent
            filteredRecipes={filteredRecipes}
            setFilteredRecipes={setFilteredRecipes}
          />
          <div className="recipes">
            {(filteredRecipes !== null && filteredRecipes.length > 0
              ? filteredRecipes
              : recipes !== null
                ? recipes
                : []
            ).map((recipe) => (
              <div className="recipe-card" key={recipe._id}>
                <img
                  onClick={() => handleRecipeClick(recipe)}
                  src={recipe.img}
                  alt="food-img"
                />
                <div className="text display-f">
                  <p>{recipe.title}</p>
                  <button
                    className="recipe-card-btn-save"
                    onClick={() => saveUserRecipes(recipe._id)}
                  >
                    <svg
                      width="20"
                      height="23"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 9.71429H9.71429V17H7.28571V9.71429H0V7.28572H7.28571V0H9.71429V7.28572H17V9.71429Z"
                        fill="#66C67B"
                      />
                    </svg>
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <span className={error !== "" ? "error-message" : ""}>{error}</span>
      <span className={success !== "" ? "success-message" : ""}>{success}</span>
    </>
  );
}

export default HomeRecipes;
