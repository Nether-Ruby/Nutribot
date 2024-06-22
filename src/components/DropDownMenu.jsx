// DropdownMenu.js
import React, { useState } from 'react';
import '../styles/DropDownMenu.css';

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleMenu} className="dropdown-toggle">
        Menu
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li><a href="#home">Perfíl</a></li>
          <li><a href="#about">Configuración</a></li>
          <li><a href="#contact">Contactanos</a></li>
          <li><a href="#services">Cerrar Sesión</a></li>
        </ul>
      )}
    </div>
  );
};

export default DropDownMenu;
