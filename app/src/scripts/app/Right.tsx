import React from 'react';
import {closeAll} from "./App";
import '../../styles/right.css';

const Right: React.FC = () => {
    return (
        <div id="right-overlay-top">
            <button type='button' onClick={closeAll}>Alle schließen</button>
            <span>Version 23-08-01</span>
        </div>
    );
};

export default Right;