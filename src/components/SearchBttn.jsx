import React from 'react';

const SearchBttn = ({ onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            Búsqueda de Receta
        </button>
    );
};

export default SearchBttn;
