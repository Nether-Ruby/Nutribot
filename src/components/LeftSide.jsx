import React from 'react';
import "../styles/DashBody.css";
import SearchBttn from './SearchBttn';
import ConsultaBttn from './ConsultaBttn';

const LeftSide = ({ onShowConsulta, onShowSearch }) => {
    return (
        <div className="left-bttn">
            <SearchBttn onClick={onShowSearch} />
            <ConsultaBttn onClick={onShowConsulta} />
        </div>
    );
};

export default LeftSide;
