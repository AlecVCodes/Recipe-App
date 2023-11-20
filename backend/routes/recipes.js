const express = require("express");
const RecipeModel = require("../models/recipesModel");
const {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getSearchedRecipe,
  getRecipeCuisine,
} = require("../contollers/recipeControllers");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// CREATE A RECIPE (Does not require auth)
router.post("/", createRecipe);

// UPDATE A RECIPE (Does not require auth)
router.patch("/:id", updateRecipe);

// GET A SINGLE RECIPE (Requires auth)
router.get("/:id", getRecipe);

// GET RECIPES BASED ON CUISINE (Requires auth)
router.get("/cuisine/:cuisine", requireAuth, getRecipeCuisine);

// GET SEARCHED RECIPE (Requires auth)
router.get("/search", requireAuth, getSearchedRecipe);

// GET ALL RECIPES (Requires auth)
router.get("/", requireAuth, getRecipes);

// DELETE A RECIPE (Requires auth)
router.delete("/:id", requireAuth, deleteRecipe);

module.exports = router;
