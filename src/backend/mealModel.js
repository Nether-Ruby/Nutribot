import mongoose from "mongoose";

const { Schema } = mongoose;

const StepSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    step: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const InstructionSchema = new Schema(
  {
    steps: [StepSchema],
  },
  { _id: false }
);

const MealSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  readyInMinutes: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  sourceUrl: {
    type: String,
    required: true,
  },
  instructions: [InstructionSchema],
});

const MealPlanSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  caloriasObjetivo: {
    type: Number,
    default: 0,
  },
  dieta: {
    type: String,
    default: "",
  },
  excluir: {
    type: String,
    default: "",
  },
  meals: [MealSchema],
});

const MealModel = mongoose.model("MealPlan", MealPlanSchema, "MealPlans");

export default MealModel;
