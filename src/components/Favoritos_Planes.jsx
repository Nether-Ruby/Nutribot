import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtVerify } from "jose";
import config from "../../configs.js";
import "../styles/Favoritos_Planes.css";
const { SECRET_JWT_KEY } = config;
const secretKeyArray = new TextEncoder().encode(SECRET_JWT_KEY);

const Favoritos_Planes = () => {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const { payload } = await jwtVerify(token, secretKeyArray);
          const userId = payload.userId;

          const response = await axios.get(
            `http://localhost:5000/Nutribot/MealPlan/userId/${userId}`
          );
          setMealPlans(response.data);
        } else {
          console.warn("No se encontró un token en el localStorage.");
        }
      } catch (error) {
        console.error("Error recibiendo los planes de comida:", error);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (mealPlanId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/Nutribot/MealPlan/${mealPlanId}`
      );
      if (response.status === 200) {
        const updatedMealPlans = mealPlans.filter(
          (mealPlan) => mealPlan._id !== mealPlanId
        );
        setMealPlans(updatedMealPlans);
      }
    } catch (error) {
      console.error("Error eliminando el plan de comida:", error);
    }
  };

  return (
    <div id="right-side-container">
      <h2 id="main-heading">Planes de Comida Favoritos</h2>
      <div>
        {mealPlans.map((mealPlan, index) => (
          <div key={index} id="meal-plan">
            <h3 className="meal-plan-heading">{mealPlan.meals[0].title}</h3>
            <p className="text">Calorías Objetivo: {mealPlan.caloriasObjetivo}</p>
            <p className="text">Dieta: {mealPlan.dieta}</p>
            <p className="text">Excluir: {mealPlan.excluir}</p>
            <h4 className="sub-heading">Meals:</h4>
            {mealPlan.meals.map((meal, mealIndex) => (
              <div key={mealIndex} id="meal">
                <h5 className="sub-heading">{meal.title}</h5>
                <p className="text">Ready in Minutes: {meal.readyInMinutes}</p>
                <p className="text">Servings: {meal.servings}</p>
                <p className="text">
                  Source URL:{" "}
                  <a href={meal.sourceUrl} className="link">{meal.sourceUrl}</a>
                </p>
                <h6 className="sub-heading">Instructions:</h6>
                <ol className="ordered-list">
                  {meal.instructions[0].steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="list-item">{step.step}</li>
                  ))}
                </ol>
              </div>
            ))}
            <button className="button" onClick={() => removeFavorite(mealPlan._id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoritos_Planes;