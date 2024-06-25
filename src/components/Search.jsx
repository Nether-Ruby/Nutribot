import React, { useState } from "react";
import axios from "axios";
import RecipeList from "./RecipeList"; // Asegúrate de importar el componente correctamente
import config from "../../configs";
const { SPOONACULAR_ENDPOINT, SPOONACULAR_ENDPOINT_INSTRUCTIONS, SPOONACULAR_KEY } = config;
const Search = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };


  const handleSearch = async () => {
    try {
      // Primera petición API para obtener las recetas
      const response = await axios.get(`${SPOONACULAR_ENDPOINT}${SPOONACULAR_KEY}&ingredients=${ingredients}&number=2`);
      const filteredRecipes = response.data.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        usedIngredients: recipe.usedIngredients.map(({ id, name, amount, unit }) => ({
          id,
          name,
          amount,
          unit,
        })),
        missedIngredients: recipe.missedIngredients.map(({ id, name, amount, unit }) => ({
          id,
          name,
          amount,
          unit,
        })),
      }));
  
      // Verifica si hay recetas
      if (filteredRecipes.length > 0) {
        // Hacer peticiones paralelas para obtener las instrucciones de cada receta
        const instructionsPromises = filteredRecipes.map(async (recipe) => {
          const instructionsResponse = await axios.get(`${SPOONACULAR_ENDPOINT_INSTRUCTIONS}/${recipe.id}/analyzedInstructions?apiKey=${SPOONACULAR_KEY}`);
          
          // Extraer solo los campos "number" y "step" de las instrucciones
          const instructions = instructionsResponse.data.map(instruction => ({
            steps: instruction.steps.map(step => ({
              number: step.number,
              step: step.step,
            })),
          }));
  
          return {
            ...recipe,
            instructions,
          };
        });
  
        // Esperar a que todas las peticiones se completen
        const recipesWithInstructions = await Promise.all(instructionsPromises);
  
        // Actualizar el estado con las recetas e instrucciones
        setRecipes(recipesWithInstructions);
      } else {
        // Si no hay recetas, actualizar el estado con una lista vacía
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error fetching recipes', error);
    }
  };
  
  

  return (
    <div>
      <div>
        <label>
          Inserte ingredientes separados por coma, por ejemplo: tomato, chicken, onions
        </label>
        <br />
        <input
          type="text"
          placeholder="Ingredientes"
          value={ingredients}
          onChange={handleInputChange}
          required
        />
        <button type="button" onClick={handleSearch}>
          Buscar recetas
        </button>
      </div>
      <div>
        <h2>Resultados de la búsqueda</h2>
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
};

export default Search;


/*

  ID = 315027
"ingredients": [
  {
    "id": 93819,
    "name": "sourdough starter",
    "localizedName": "sourdough starter",
    "image": "https://spoonacular.com/cdn/ingredients_100x100/sourdough-starter.png"
  },
  {
    "id": 1090,
    "name": "powdered milk",
    "localizedName": "powdered milk",
    "image": "https://spoonacular.com/cdn/ingredients_100x100/milk-powdered.jpg"
  },*/