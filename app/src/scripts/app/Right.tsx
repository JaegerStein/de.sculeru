import React from 'react';
import {closeAll} from "./App";
import '../../styles/right.css';

const Right: React.FC = () => {
    return (
        <>
            <button type='button' onClick={closeAll}>Alle schließen</button>
            <hr/>
            <p>Hier kommt die Navigation für geöffnete Einträge hin, wenn ich nicht zu faul dafür bin.</p>
        </>
    );
};

export default Right;