import React, { useState } from 'react';
import '../styles/DashBody.css';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Search from './Search';
import Consulta from './Consulta';


function DashBody() {
    const [rightContent, setRightContent] = useState(null);

    const handleShowConsulta = () => {
        setRightContent(<Consulta />);
    };

    const handleShowSearch = () => {
        setRightContent(<Search />);
    };

    return (
        <div className="dash-body">
            <LeftSide 
                onShowConsulta={handleShowConsulta}
                onShowSearch={handleShowSearch}
            />
            <RightSide content={rightContent} />
        </div>
    );
}

export default DashBody;
