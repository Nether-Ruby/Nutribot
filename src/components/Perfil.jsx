import React, { useState } from "react";
import "../styles/LoginForm.css";
import { jwtVerify } from "jose"; // Importa la función jwtVerify desde jose.js
import config from "../../configs.js";
import axios from "axios";
import bcrypt from 'bcryptjs' 


const { SECRET_JWT_KEY } = config;
const secretKeyArray = new TextEncoder().encode(SECRET_JWT_KEY);

function Perfil({ onclose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
  
    const handleSave = async (e) => {
      e.preventDefault();
      let formData = {};
      const token = localStorage.getItem("token");
      let userId = "";
  
      if (token) {
        const { payload } = await jwtVerify(token, secretKeyArray);
        userId = payload.userId;
      }
  
      const addObjectToFormData = (key, value) => {
        formData[key] = value;
      };
  
      const verifyOldPassword = async (oldPassword, userId) => {
        try {
          const response = await axios.get(`http://localhost:5000/Nutribot/Users/${userId}`);
          const storedPassword = response.data.password;
          const isMatch = await bcrypt.compare(oldPassword, storedPassword);
          return isMatch;
        } catch (error) {
          console.error("Error verifying old password:", error);
          return false;
        }
      };
  
      if (name !== "") {
        addObjectToFormData("name", name);
      }
      if (email !== "") {
        addObjectToFormData("email", email);
      }
      if (newPassword !== "" && newPassword !== oldPassword) {
        const isOldPasswordCorrect = await verifyOldPassword(oldPassword, userId);
        if (isOldPasswordCorrect) {
          const newHash = await bcrypt.hash(newPassword, 10);
          addObjectToFormData("password", newHash);
        } else {
          alert("Old password is incorrect.");
          return;
        }
      }
  
      try {
        const response = await axios.put(`http://localhost:5000/Nutribot/Users/Update/${userId}`, formData);
        alert("Profile updated successfully");
      } catch (error) {
        alert("Error updating profile: " + error.message);
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
        <form onSubmit={handleSave} className="formSignUp">
          <div className="center spacing">
            <div className="fieldContainer">
              <input
                type="text"
                placeholder="Nombre"
                className="userField"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <br></br>
          <div className="center">
            <div className="fieldContainer">
              <input
                type="email"
                placeholder="Email"
                className="userField"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <br></br>
          <div className="center">
            <div className="fieldContainer">
              <input
                type="password"
                placeholder="Contraseña actual"
                className="userField"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
          </div>
          <br></br>
          <div className="center">
            <div className="fieldContainer">
              <input
                type="password"
                placeholder="Contraseña nueva"
                className="userField"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <br></br>
          <div className="center spacing">
            <div className="bttnContainer">
              <button
                type="submit"
                id="loginbttn"
                name="loginbttn"
                className="bttn"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Perfil;
