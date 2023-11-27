import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UseAuthContext } from '../hooks/useAuthContext';
import { Recipe } from '../components/HomeRecipes';
import { url } from 'inspector';

function IndividualRecipe() {
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
        const response = await fetch(`/api/recipes/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        }); // Adjust the API endpoint to match your backend
        if (response.ok) {
          const data: Recipe = await response.json();
          setRecipe(data);
          console.log(data)
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
    <div className='recipe-content'>

      <header className="recipe-header" >     <h1 className='recipe-title'>{recipe.title}</h1>
      </header>
      <img className='indiviual-recipe-img' width={500} height={300} src={recipe.img} alt={recipe.title}></img>
      <h3>Ingredients</h3>

      <ul className='ingredients-list'>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.quantity} {ingredient.unit}
          </li>
        ))}


      </ul>
      {recipe.method && (

        <div className="method-list">
          <h3>Method</h3>
          <ol>
            {recipe.method.map((step, index) => (
              <li key={index}>{step.step}</li>
            ))}
          </ol>
        </div>)}
    </div>
  );
}

export default IndividualRecipe;
