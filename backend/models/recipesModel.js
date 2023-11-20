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
    required: false,
  },
});

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cuisine : {
    type: String,
    require: true
  },
  img: String,
  imgLarge: String,
  ingredients: [ingredientSchema],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
