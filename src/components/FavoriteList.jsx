import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtVerify } from "jose";
import config from "../../configs.js";
import "../styles/FavoriteList.css";
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
    <div id="favorite-list-container">
      <h2 id="favorite-list-heading">Recetas Favoritas</h2>
      <div>
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h3 className="recipe-title">{recipe.title}</h3>
            <p className="text">Ingredientes Utilizados:</p>
            <ul className="ingredient-list">
              {recipe.usedIngredients.map(({ id, name, amount, unit }) => (
                <li key={id} className="ingredient-item">
                  {name} - {amount} {unit}
                </li>
              ))}
            </ul>
            <p className="text">Ingredientes Faltantes:</p>
            <ul className="ingredient-list">
              {recipe.missedIngredients.map(({ id, name, amount, unit }) => (
                <li key={id} className="ingredient-item">
                  {name} - {amount} {unit}
                </li>
              ))}
            </ul>
            {recipe.instructions && recipe.instructions.length > 0 && (
              <div>
                <h3 className="sub-heading">Instrucciones:</h3>
                <ul className="instruction-list">
                  {recipe.instructions.map((instruction, instructionIndex) => (
                    <li key={instructionIndex} className="instruction-step">
                      <h4 className="sub-heading">{instruction.name}</h4>
                      <ul className="instruction-list">
                        {instruction.steps.map(({ number, step }) => (
                          <li key={number} className="instruction-step">
                            Paso {number}: {step}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button className="button" type="button" onClick={() => removeFavorite(recipe._id)}>
              Eliminar de Favoritos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteList;