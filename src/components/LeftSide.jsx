import React from 'react';
import "../styles/DashBody.css";
import SearchBttn from './SearchBttn';
import ConsultaBttn from './ConsultaBttn';
import FavoritosBttn from './FavoritosBttn';

const LeftSide = ({ onShowConsulta, onShowSearch, onShowFavoritos }) => {
    return (
        <div className="left-bttn">
            <SearchBttn onClick={onShowSearch} />
            <ConsultaBttn onClick={onShowConsulta} />
            <FavoritosBttn onClick={onShowFavoritos}/>
        </div>
    );
};

export default LeftSide;
