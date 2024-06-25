import React from 'react';
import "../styles/DashBody.css";
import SearchBttn from './SearchBttn';
import ConsultaBttn from './ConsultaBttn';
import FavoritosBttn from './FavoritosBttn';
import Planesbttn from './PlanesBttn';

const LeftSide = ({ onShowConsulta, onShowSearch, onShowFavoritos, onShowPlanes }) => {
    return (
        <div className="left-bttn">
            <SearchBttn onClick={onShowSearch} />
            <ConsultaBttn onClick={onShowConsulta} />
            <FavoritosBttn onClick={onShowFavoritos}/>
            <Planesbttn onClick={onShowPlanes}/>
        </div>
    );
};

export default LeftSide;
