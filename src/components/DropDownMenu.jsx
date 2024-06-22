import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtVerify } from 'jose'; // Importa la función jwtVerify desde jose.js
import config from '../../configs.js';
import '../styles/DropDownMenu.css';
const { SECRET_JWT_KEY } = config;

const secretKeyArray = new TextEncoder().encode(SECRET_JWT_KEY);


const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
          <li><a href="#perfil">Perfil</a></li>
          <li><a href="#configuracion">Configuración</a></li>
          <li><a href="#contacto">Contacto</a></li>
          <li><a onClick={handleLogout}>Cerrar Sesión</a></li>
        </ul>
      )}
    </div>
  );
};

export default DropDownMenu;
