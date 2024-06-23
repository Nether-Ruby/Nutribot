import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtVerify } from "jose"; // Importa la función jwtVerify desde jose.js
import config from "../../configs.js";
const { SECRET_JWT_KEY } = config;
const secretKeyArray = new TextEncoder().encode(SECRET_JWT_KEY);

const FavoriteList = () => {
  const [recipes, setRecipes] = useState([]);
  let recipeArray = [];

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Obtiene el token del localStorage
        const token = localStorage.getItem("token");

        if (token) {
          // Decodifica y verifica el token JWT
          const { payload } = await jwtVerify(token, secretKeyArray);

          // Obtiene el userId del payload
          const userId = payload.userId;

          // Realiza la petición para obtener las recetas favoritas del usuario
          const response = await axios.get(
            `http://localhost:5000/Nutribot/Recipes/userId/${userId}`
          );
          console.log("Response:", response.data);
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
      // Realiza la petición para eliminar la receta de favoritos
      const response = await axios.delete(
        `http://localhost:5000/Nutribot/Recipes/${recipeId}`
      );
      if (response.status === 200) {
        // Actualiza el estado de las recetas para reflejar la eliminación
        const updatedRecipes = recipes.filter((recipe) => recipe._id !== recipeId);
      // Actualiza el estado con las recetas restantes
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
