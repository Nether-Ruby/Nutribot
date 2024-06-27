import React from 'react';
import "../styles/DashBody.css";
import SearchBttn from './SearchBttn';
import ConsultaBttn from './ConsultaBttn';
import FavoritosBttn from './FavoritosBttn';
import Planesbttn from './PlanesBttn';
import ChatBttn from './ChatBttn';

const LeftSide = ({ onShowConsulta, onShowSearch, onShowFavoritos, onShowPlanes,onShowChatbot }) => {
    return (
        <div className="left-bttn">
            <SearchBttn onClick={onShowSearch} />
            <ConsultaBttn onClick={onShowConsulta} />
            <FavoritosBttn onClick={onShowFavoritos}/>
            <Planesbttn onClick={onShowPlanes}/>
            <ChatBttn onClick={onShowChatbot}/>
        </div>
    );
};

export default LeftSide;
