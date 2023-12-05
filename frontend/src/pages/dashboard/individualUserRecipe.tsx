import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UseAuthContext } from '../../hooks/useAuthContext'
import { SavedRecipes } from '../../contexts/SavedRecipesContext';


function IndividualUserRecipe() {
    const { user } = UseAuthContext();
    const { id } = useParams<{ id?: string }>(); // Make the 'id' parameter optional
    const [recipe, setRecipe] = useState<SavedRecipes | null>(null);

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
                console.log(id)
                const response = await fetch(`/api/userRecipes/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                }); // Adjust the API endpoint to match your backend

                console.log(response.body, 'response body')
                console.log(id, 'id paramaters')
                if (response.ok) {

                    const data: SavedRecipes = await response.json();
                    setRecipe(data);
                    console.log(data)
                    // Store the fetched recipe data in local storage
                    localStorage.setItem(`recipe_${id}`, JSON.stringify(data));
                } else {
                    // Handle error when the recipe is not found
                    console.log("function did not  work")
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

export default IndividualUserRecipe;
