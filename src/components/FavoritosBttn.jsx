import React from "react";
import "../styles/DashBody.css";

const FavoritosBttn = ({ onClick }) => {
  return <button className="button" onClick={onClick}>Recetas Favoritas</button>;
};
export default FavoritosBttn;
