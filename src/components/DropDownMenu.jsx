import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtVerify } from 'jose'; // Importa la función jwtVerify desde jose.js
import Perfil from './Perfil.jsx';
import config from '../../configs.js';
import '../styles/DropDownMenu.css';

const { SECRET_JWT_KEY } = config;
const secretKeyArray = new TextEncoder().encode(SECRET_JWT_KEY);

const DropDownMenu = () => {
  const [showPopupProfile, setShowPopupProfile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const TOGGLEPOPUPPROFILE = () => {
    setShowPopupProfile(!showPopupProfile);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    // Obtiene el token del localStorage
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decodifica y verifica el token JWT
        const { payload } = await jwtVerify(token, secretKeyArray);

        console.log(payload);

        // Elimina el token del localStorage
        localStorage.removeItem('token');

        // Redirige al usuario a la página principal
        navigate('/');
      } catch (error) {
        console.error('Error al verificar el token JWT:', error);
      }
    } else {
      console.warn('No se encontró un token en el localStorage.');
    }
  };

  return (
    <div className="dropdown">
      <button onClick={toggleMenu} className="dropdown-toggle">
        Menu
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li><a onClick={TOGGLEPOPUPPROFILE}>Perfil</a></li>
          {showPopupProfile && <Perfil onclose={TOGGLEPOPUPPROFILE} />}
          <li><a onClick={handleLogout}>Cerrar Sesión</a></li>
        </ul>
      )}
    </div>
  );
};

export default DropDownMenu;