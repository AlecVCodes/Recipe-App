const UserRecipeSchema = require("../models/userRecipesModel");
const mongoose = require("mongoose");

// get all user recipes
const getUserRecipes = async (req, res) => {
  const user_id = req.user[0]._id;
  const recipes = await UserRecipeSchema.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(recipes);
};

// Add a new user recipe to their saved collection
const AddUserRecipe = async (req, res) => {

  const { title, ingredients, img } = req.body;
  const user_id = req.user[0]._id;



  try {
    // Check if a recipe with the same image and user_id already exists
    const existingRecipe = await UserRecipeSchema.findOne({ img, user_id });

    if (existingRecipe) {
      console.log("Recipe is already saved for this user.");
      return res.status(400).json({ error: "Recipe with this image already exists." });
    }

    // If the image is unique for the current user, add it to the database
    const recipe = await UserRecipeSchema.create({ title, ingredients, img, user_id });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
    console.log('this function ran')
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipe" });
  }

  const recipe = await UserRecipeSchema.findById(id);

  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

// delete a recipe
const deleteUserRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such recipe" });
  }

  const recipe = await UserRecipeSchema.findOneAndDelete({ _id: id });

  if (!recipe) {
    return res.status(400).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

module.exports = {
  getUserRecipes,
  AddUserRecipe,
  deleteUserRecipe,
  getRecipe
};
