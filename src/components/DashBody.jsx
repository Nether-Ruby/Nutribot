import React, { useState } from 'react';
import '../styles/DashBody.css';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Search from './Search';
import Consulta from './Consulta';
import FavoriteList from './FavoriteList';
import Favoritos_Planes from './Favoritos_Planes';


function DashBody() {
    const [rightContent, setRightContent] = useState(null);

    const handleShowConsulta = () => {
        setRightContent(<Consulta />);
    };

    const handleShowSearch = () => {
        setRightContent(<Search />);
    };
    const handleShowFavoritos = () => {
        setRightContent(<FavoriteList />);
    };
    const handleShowPlanes = () => {
        setRightContent(<Favoritos_Planes />)
    }

    return (
        <div className="dash-body">
            <LeftSide 
                onShowConsulta={handleShowConsulta}
                onShowSearch={handleShowSearch}
                onShowFavoritos={handleShowFavoritos}
                onShowPlanes={handleShowPlanes}
            />
            <RightSide content={rightContent} />
        </div>
    );
}

export default DashBody;
