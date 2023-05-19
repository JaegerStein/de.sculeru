import React from 'react';
import {closeAll} from "./App";
import '../../styles/right.css';

const Right: React.FC = () => {
    return (
        <>
            <button type='button' onClick={closeAll}>Alle schließen</button>
        </>
    );
};

export default Right;