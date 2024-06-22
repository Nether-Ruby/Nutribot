import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  usedIngredients: [{
    id: String,
    name: String,
    amount: Number,
    unit: String
  }],
  missedIngredients: [{
    id: String,
    name: String,
    amount: Number,
    unit: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const RecipeModel = mongoose.model('Recipe', recipeSchema, 'Recipes');

export default RecipeModel;
