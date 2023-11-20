const recipeModel = require("../models/recipesModel");
const mongoose = require("mongoose");

// get all recipes
const getRecipes = async (req, res) => {

  const recipes = await recipeModel.find({}).sort({ createdAt: -1 });

  

  res.status(200).json(recipes);
};

//get recipe based on searchbar value 
const getSearchedRecipe = async (req, res) => {


  try {
    const { search } = req.query; // Access the 'search' parameter from the request query

    const recipes = await recipeModel.find();

    // Filter recipes that contain the search term
    const matchingRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase())
    );

   

    if (matchingRecipes.length === 0) {
      res.status(404).json({ error: "No recipe was found" });
    } else {
      res.status(200).json(matchingRecipes);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};



const getRecipe = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipe" });
  }

  const recipe = await recipeModel.findById(id);

  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

const createRecipe = async (req, res) => {
  const { title, ingredients, img, imgLarge, cuisine } = req.body;

  // add to the database
  try {
    const recipe = await recipeModel.create({ title, ingredients, img, imgLarge, cuisine });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such recipe" });
  }

  const recipe = await recipeModel.findOneAndDelete({ _id: id });

  if (!recipe) {
    return res.status(400).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;



  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }

  try {
    console.log("Updating recipe with ID:", id);

    const updatedRecipe = await recipeModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedRecipe) {
      console.log("Recipe not found with ID:", id);
      return res.status(404).json({ error: "Recipe not found" });
    }

    console.log("Recipe updated successfully:", updatedRecipe);

    return res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Error while updating recipe:", error);
    return res.status(500).json({ error: "Server error" });
  }
  
};




const getRecipeCuisine = async (req, res) => {

  try {
    const { cuisine } = req.params; // Access the 'cuisine' parameter from the request query



    // Filter recipes that match the selected cuisine
    const recipes = await recipeModel.find({ cuisine: cuisine }); // Replace 'cuisine' with the appropriate field in your schema

    if (recipes.length === 0) {
      return res.status(404).json({ error: "No recipes found for the selected cuisine" });
    } else {
      res.status(200).json(recipes);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,                                                                                         
  updateRecipe,
  getSearchedRecipe,
  getRecipeCuisine
};
