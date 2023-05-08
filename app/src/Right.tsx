import React from 'react';
import {closeAll} from "./App";

const Right: React.FC = () => {
    return (
        <>
            <button type='button' onClick={closeAll}>Alle schließen</button>
            <hr/>
            <ol>Hier kommt die Navigation für geöffnete Einträge hin.
                <li>Wenn ich nicht zu faul dafür bin.
                    <ol>
                        <li>Subtext</li>
                        <li>Stacked</li>
                    </ol>
                </li>
                <li>Mal schauen</li>
                <li>Work in Progress</li>
            </ol>
        </>
    );
};

export default Right;