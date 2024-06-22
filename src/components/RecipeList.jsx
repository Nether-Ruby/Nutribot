import React from 'react';
import axios from 'axios';
import { jwtVerify } from 'jose'; // Importa la función jwtVerify desde jose.js
import config from '../../configs.js';
const {SECRET_JWT_KEY} = config;
const secretKeyArray = new TextEncoder().encode(SECRET_JWT_KEY);

const RecipeList = ({ recipes }) => {
  
  const handleSave = async (recipe) => {
    try {
      // Obtiene el token del localStorage
      const token = localStorage.getItem('token');

      if (token) {
        // Decodifica y verifica el token JWT
        const { payload } = await jwtVerify(token, secretKeyArray);

        // Obtiene el userId del payload
        const userId = payload.userId;

        // Añade el userId al objeto recipe
        recipe.userId = userId;

        // Realiza la petición para guardar la receta
        const response = await axios.post('http://localhost:5000/Nutribot/Recipes', recipe);
        console.log('Recipe saved successfully:', response.data);
      } else {
        console.warn('No se encontró un token en el localStorage.');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <div>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <h2>{recipe.title}</h2>
          <h3>Used Ingredients:</h3>
          <ul>
            {recipe.usedIngredients.map(({ id, name, amount, unit }) => (
              <li key={id}>
                {name} - {amount} {unit}
              </li>
            ))}
          </ul>
          <h3>Missed Ingredients:</h3>
          <ul>
            {recipe.missedIngredients.map(({ id, name, amount, unit }) => (
              <li key={id}>
                {name} - {amount} {unit}
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => handleSave(recipe)}>
            Guardar
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
