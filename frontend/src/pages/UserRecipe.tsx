import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UseAuthContext } from '../hooks/useAuthContext';
import { Recipe } from '../components/HomeRecipes';

function UserRecipe() {
  const { user } = UseAuthContext();
  const { id } = useParams<{ id?: string }>(); // Make the 'id' parameter optional
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  // Check local storage for the recipe data on component mount
  useEffect(() => {
    const storedRecipe = localStorage.getItem(`recipe_${id}`);
    if (storedRecipe) {
      // Parse the stored recipe data
      const parsedRecipe = JSON.parse(storedRecipe);
      setRecipe(parsedRecipe);
    } else {
      // If not found in local storage, fetch the recipe data
      fetchRecipeData();
    }
  }, [id]);

  const fetchRecipeData = async () => {
    if (id) {
      try {
        const response = await fetch(`/api/userRecipes/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        }); // Adjust the API endpoint to match your backend
        if (response.ok) {
          const data: Recipe = await response.json();
          setRecipe(data);

          // Store the fetched recipe data in local storage
          localStorage.setItem(`recipe_${id}`, JSON.stringify(data));
        } else {
          // Handle error when the recipe is not found
        }
      } catch (error) {
        // Handle any fetch errors
      }
    }
  };

  if (!recipe) {
    // Render a loading indicator or an error message here
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.quantity} {ingredient.unit}
          </li>
        ))}
        <img src={recipe.img} alt={recipe.img} />
      </ul>
    </div>
  );
}

export default UserRecipe;
