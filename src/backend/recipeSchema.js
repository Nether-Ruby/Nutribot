import mongoose from 'mongoose';

const { Schema } = mongoose;

// Sub-schema para los ingredientes
const IngredientSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: false,
  },
});

// Sub-schema para los pasos de las instrucciones
const StepSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  step: {
    type: String,
    required: true,
  },
});

// Sub-schema para las instrucciones analizadas
const InstructionSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  steps: [StepSchema],
});

// Schema principal para las recetas con instrucciones
const RecipeWithInstructionsSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  usedIngredients: [IngredientSchema],
  missedIngredients: [IngredientSchema],
  instructions: [InstructionSchema],
}, { timestamps: true });

// Crear el modelo
const RecipeModel = mongoose.model('Recipe', RecipeWithInstructionsSchema, 'Recipes');

export default RecipeModel;
