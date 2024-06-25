import React, { useState } from "react";
import axios from "axios";
import { jwtVerify } from "jose";
import config from "../../configs";
import "../styles/Consulta.css";
const { SECRET_JWT_KEY } = config;
const secretKeyArray = new TextEncoder().encode(SECRET_JWT_KEY);
const { SPOONACULAR_ENDPOINT_MEALPLANNER, SPOONACULAR_ENDPOINT_INSTRUCTIONS, SPOONACULAR_KEY } = config;

const Consulta = () => {
  const [calorias, setCalorias] = useState("");
  const [dieta, setDieta] = useState("");
  const [exclusion, setExclusion] = useState("");
  const [meals, setMeals] = useState([]);

  const handleMeals = async () => {
    let endpoint = `${SPOONACULAR_ENDPOINT_MEALPLANNER}${SPOONACULAR_KEY}&timeFrame=day;`
    if (calorias !== "") {
      endpoint += `&targetCalories=${calorias};`
    }
    if (dieta !== "") {
      endpoint += `&diet=${dieta};`
    }
    if (exclusion !== "") {
      endpoint += `&exclude=${exclusion};`
    }

    try {
      const response = await axios.get(endpoint);
      const meals = response.data.meals;

      const instructionsPromises = meals.map(async (meal) => {
        const instructionsResponse = await axios.get(`${SPOONACULAR_ENDPOINT_INSTRUCTIONS}/${meal.id}/analyzedInstructions?apiKey=${SPOONACULAR_KEY}`);

        const instructions = instructionsResponse.data.map(instruction => ({
          steps: instruction.steps.map(step => ({
            number: step.number,
            step: step.step,
          })),
        }));

        return {
          ...meal,
          instructions,
        };
      });

      const mealsWithInstructions = await Promise.all(instructionsPromises);
      setMeals(mealsWithInstructions);
    } catch (error) {
      console.error('Error fetching meals and instructions', error);
    }
  };

  const handleSaveMealPlan = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token en el Local Storage.');
        return;
      }
      const { payload } = await jwtVerify(token, secretKeyArray);
      const userId = payload.userId;

      const response = await axios.post('http://localhost:5000/Nutribot/Mealplan', {
        userId,
        fecha: new Date(),
        caloriasObjetivo: calorias,
        dieta: dieta,
        excluir: exclusion,
        meals: meals
      });

      console.log('Meal plan saved:', response.data);
      alert("Plan guardado");
    } catch (error) {
      console.error('Error saving meal plan', error);
    }
  };

  return (
    <div id="consulta-container">
      <div id="consulta-form-container">
        <form>
          <div className="consulta-input-container">
            <label className="consulta-label">Objetivo de calorias del dia</label>
            <input
              className="consulta-input"
              type="number"
              placeholder="Calories"
              value={calorias}
              onChange={(e) => setCalorias(e.target.value)}
            />
          </div>
          <label htmlFor="dieta" className="consulta-label">Seleccione un tipo de dieta</label>
          <div className="consulta-input-container">
            <select
              name="dieta"
              value={dieta}
              className="consulta-input"
              onChange={(e) => setDieta(e.target.value)}
            >
              <option value="">Selecciona una opción</option>
              <option value="Gluten Free">Sin gluten</option>
              <option value="Ketogenic">Cetogénica</option>
              <option value="Vegetarian">Vegetariana</option>
              <option value="Lacto-Vegetarian">Lacto-Vegetariana</option>
              <option value="Ovo-Vegetarian">Ovo-Vegetariana</option>
              <option value="Vegan">Vegana</option>
              <option value="Pescetarian">Pescetariana</option>
              <option value="Paleo">Paleo</option>
              <option value="Primal">Primal</option>
              <option value="Low FODMAP">Baja en FODMAP</option>
              <option value="Whole30">Whole30</option>
            </select>
          </div>
          <label className="consulta-label">Ingrese ingredientes a excluir, separados por ','</label>
          <div className="consulta-input-container">
            <input
              type="text"
              className="consulta-input"
              placeholder="Excluir"
              value={exclusion}
              onChange={(e) => setExclusion(e.target.value)}
            />
          </div>
          <div className="consulta-boton-container">
            <button className="consulta-boton" type="button" onClick={handleMeals}>
              Generar
            </button>
          </div>
        </form>
      </div>
      <div id="consulta-results-container">
        <h2>Resultados:</h2>
        <ul>
          {meals.map((meal, index) => (
            <li key={index} className="consulta-meal-item">
              <h3 className="meal-title">{meal.title}</h3>
              <p className="meal-info">Ready in {meal.readyInMinutes} minutes</p>
              <p className="meal-info">Servings: {meal.servings}</p>
              <a className="meal-link" href={meal.sourceUrl}>Recipe Link</a>
              <h4>Instrucciones:</h4>
              {meal.instructions && meal.instructions.map((instruction, i) => (
                <div key={i}>
                  {instruction.steps.map((step, j) => (
                    <p key={j} className="meal-instructions">{step.number}. {step.step}</p>
                  ))}
                </div>
              ))}
            </li>
          ))}
        </ul>
        {meals.length > 0 && (
          <button className="save-button" type="button" onClick={handleSaveMealPlan}>
            Guardar Meal Plan
          </button>
        )}
      </div>
    </div>
  );
};

export default Consulta;