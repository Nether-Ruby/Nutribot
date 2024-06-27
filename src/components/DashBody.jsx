import React, { useState } from 'react';
import '../styles/DashBody.css';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Search from './Search';
import Consulta from './Consulta';
import FavoriteList from './FavoriteList';
import Favoritos_Planes from './Favoritos_Planes';
import Chatbot from './Chatbot';


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
        setRightContent(<Favoritos_Planes />);
    }
    const handleShowChatbot = () => {
        setRightContent(<Chatbot/>);
    }
    return (
        <div className="dash-body">
            <LeftSide 
                onShowConsulta={handleShowConsulta}
                onShowSearch={handleShowSearch}
                onShowFavoritos={handleShowFavoritos}
                onShowPlanes={handleShowPlanes}
                onShowChatbot={handleShowChatbot}
            />
            <RightSide content={rightContent} />
        </div>
    );
}

export default DashBody;
