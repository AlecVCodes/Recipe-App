const express = require("express");
const UserRecipeSchema = require("../models/userRecipesModel");
const {
  getUserRecipes,
  AddUserRecipe,
  deleteUserRecipe,
getRecipe
} = require("../contollers/userRecipesControllers");

const requireAuth = require("../middleware/requireAuth");

//express app
const router = express.Router();

router.use(requireAuth);

//GET ALL RECIPES
router.get("/", getUserRecipes);

//GET A SINGLE RECIPE
router.get("/:id", getRecipe);
//ADD USER RECIPE
router.post("/", requireAuth, AddUserRecipe, );

//DELETE A RECIPE
router.delete("/:id", deleteUserRecipe);

module.exports = router;
