import React from "react";
import "../styles/LoginForm.css";
import UserField from "./UserField";
import PassField from "./PassField";
import LoginBttn from "./LoginBttn";
import { useState } from "react";

function LoginForm({ onLogin, onclose }) { // Agrega onLogin y onclose como propiedades
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para almacenar el mensaje de error


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Realiza la autenticación
    const response = await fetch("http://localhost:5000/Nutribot/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Si la autenticación es exitosa, llama a la función onLogin
      onLogin(data.token);
    } else {
      // Si hay un error, muestra el mensaje de error del servidor
      const errorMessage = await response.text();
      setError(errorMessage);
    }
  };

  return (
    <div className="popUp">
      <div className="popUp-content">
        <form>
          <div>
            <button className="closeButton" onClick={onclose}>
              &times; {/* This is a common symbol for 'close' */}
            </button>
            <br></br>
            <br></br>
          </div>
        </form>
        <form onSubmit={handleSubmit} className="form" method="POST">
          {error && <div className="error">{error}</div>} {/* Mostrar el mensaje de error si hay uno */}
          <div className="center spacing">
            <UserField value={email} onChange={setEmail} />
          </div>
          <br></br>
          <div className="center">
            <PassField value={password} onChange={setPassword} />
          </div>
          <br></br>
          <div className="center spacing">
            <LoginBttn />
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
