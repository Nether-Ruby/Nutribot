import React, { useState } from "react";
import "../styles/HeaderLanding.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";


function HeaderLanding() {
  const [showPopupLogIn, setShowPopupLogIn] = useState(false);
  const [showPopupSignUp, setShowPopupSignUp] = useState(false);
  const navigateTo = useNavigate();

  const TOGGLEPOPUPLOGIN = () => {
    setShowPopupLogIn(!showPopupLogIn);
    if (!showPopupLogIn) {
      setShowPopupSignUp(false); // Close signup form if login form is opened
    }
  };

  const TOGGLEPOPUPSIGNUP = () => {
    setShowPopupSignUp(!showPopupSignUp);
    if (!showPopupSignUp) {
      setShowPopupLogIn(false); // Close login form if signup form is opened
    }
  };

  const handleLogin = (token) => {
    // Almacena el token en el almacenamiento local
    localStorage.setItem("token", token);
    // Redirige a la página deseada después del inicio de sesión exitoso
    navigateTo('/dashboard');
  };

  return (
    <div className="header">
      <div className="leftContainer">
        <img src={logo} alt="logo de Nutribot" className="img" />
        <p className="textHeader">Nutribot</p>
      </div>
      <div className="rightContainer">
        <button className="bttnHeader" onClick={TOGGLEPOPUPLOGIN}>
          Iniciar Sesión
        </button>
        {showPopupLogIn && <LoginForm onLogin={handleLogin} onclose={TOGGLEPOPUPLOGIN} />}
        <button className="bttnHeader" onClick={TOGGLEPOPUPSIGNUP}>
          Registrarse
        </button>
        {showPopupSignUp && <SignupForm onclose={TOGGLEPOPUPSIGNUP} />}
      </div>
    </div>
  );
}

export default HeaderLanding;
