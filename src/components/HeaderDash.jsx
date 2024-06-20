import React, { useState } from "react";
import "../styles/HeaderLanding.css";
import logo from "../images/logo.png";
import DropDownMenu from './DropDownMenu'; // Importa el DropdownMenu

function HeaderDash () {


return(
<div className="header">
      <div className="leftContainer">
        <img src={logo} alt="logo de Nutribot" className="img" />
        <p className="textHeader">Nutribot</p>
      </div>
      <div className="rightContainer">
       <DropDownMenu/>
      </div>
    </div>
)
}

export default HeaderDash;
