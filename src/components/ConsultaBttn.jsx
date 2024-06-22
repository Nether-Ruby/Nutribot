import React from 'react';

const ConsultaBttn = ({ onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            Consulta de Nutrientes
        </button>
    );
};

export default ConsultaBttn;
