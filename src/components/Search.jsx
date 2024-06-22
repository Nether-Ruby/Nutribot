import React, { useState } from "react";
import axios from "axios";
import RecipeList from "./RecipeList"; // Asegúrate de importar el componente correctamente
import config from "../../configs";
const { SPOONACULAR_ENDPOINT, SPOONACULAR_KEY } = config;
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
      setRecipes(filteredRecipes);
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
