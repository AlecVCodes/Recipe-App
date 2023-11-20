const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

const UserRecipeSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  img: String,
  ingredients: [ingredientSchema],
});

const UserRecipes = mongoose.model("UserRecipes", UserRecipeSchema);

module.exports = UserRecipes;
