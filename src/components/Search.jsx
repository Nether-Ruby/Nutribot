import React, { useState } from "react";
import axios from "axios";
import RecipeList from "./RecipeList"; // Asegúrate de importar el componente correctamente
import config from "../../configs";
import "../styles/search.css"; // Importa tus estilos CSS aquí
import "../styles/DashBody.css";

const { SPOONACULAR_ENDPOINT, SPOONACULAR_ENDPOINT_INSTRUCTIONS, SPOONACULAR_KEY } = config;

const Search = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleSearch = async () => {
    try {
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

      if (filteredRecipes.length > 0) {
        const instructionsPromises = filteredRecipes.map(async (recipe) => {
          const instructionsResponse = await axios.get(`${SPOONACULAR_ENDPOINT_INSTRUCTIONS}/${recipe.id}/analyzedInstructions?apiKey=${SPOONACULAR_KEY}`);
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

        const recipesWithInstructions = await Promise.all(instructionsPromises);
        setRecipes(recipesWithInstructions);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error fetching recipes', error);
    }
  };

  return (
    <div className="right-side-container">
      <div className="search-form">
        <label className="search-label">
          Inserte ingredientes separados por coma, por ejemplo: tomato, chicken, onions
        </label>
        <br />
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Ingredientes"
            value={ingredients}
            onChange={handleInputChange}
            className="search-input"
            required
          />
        </div>
        <button type="button" onClick={handleSearch} className="search-button">
          Buscar recetas
        </button>
      </div>
      <div className="results">
        <h2 className="no-margins">Resultados de la búsqueda:</h2>
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
};

export default Search;