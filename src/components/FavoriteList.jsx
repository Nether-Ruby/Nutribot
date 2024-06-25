import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtVerify } from "jose";
import config from "../../configs.js";
const { SECRET_JWT_KEY } = config;
const secretKeyArray = new TextEncoder().encode(SECRET_JWT_KEY);

const FavoriteList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const { payload } = await jwtVerify(token, secretKeyArray);
          const userId = payload.userId;

          const response = await axios.get(
            `http://localhost:5000/Nutribot/Recipes/userId/${userId}`
          );
          setRecipes(response.data);
        } else {
          console.warn("No se encontró un token en el localStorage.");
        }
      } catch (error) {
        console.error("Error recibiendo las recetas:", error);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (recipeId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/Nutribot/Recipes/${recipeId}`
      );
      if (response.status === 200) {
        const updatedRecipes = recipes.filter((recipe) => recipe._id !== recipeId);
        setRecipes(updatedRecipes);
      }
    } catch (error) {
      console.error("Error eliminando la receta:", error);
    }
  };

  return (
    <div>
      <h2>Recetas Favoritas</h2>
      <div>
        {recipes.map((recipe, index) => (
          <div key={index}>
            <h3>{recipe.title}</h3>
            <p>Ingredientes Utilizados:</p>
            <ul>
              {recipe.usedIngredients.map(({ id, name, amount, unit }) => (
                <li key={id}>
                  {name} - {amount} {unit}
                </li>
              ))}
            </ul>
            <p>Ingredientes Faltantes:</p>
            <ul>
              {recipe.missedIngredients.map(({ id, name, amount, unit }) => (
                <li key={id}>
                  {name} - {amount} {unit}
                </li>
              ))}
            </ul>
            {recipe.instructions && recipe.instructions.length > 0 && (
              <div>
                <h3>Instrucciones:</h3>
                <ul>
                  {recipe.instructions.map((instruction, instructionIndex) => (
                    <li key={instructionIndex}>
                      <h4>{instruction.name}</h4>
                      <ul>
                        {instruction.steps.map(({ number, step }) => (
                          <li key={number}>Paso {number}: {step}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button type="button" onClick={() => removeFavorite(recipe._id)}>
              Eliminar de Favoritos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteList;
