import React from 'react';

const SearchBttn = ({ onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            Menús guardados
        </button>
    );
};

export default SearchBttn;
