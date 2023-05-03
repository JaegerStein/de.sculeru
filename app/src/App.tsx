import React from 'react';
import Entry from "./components/Entry";

function application(): React.ReactElement {
    return (
        <Entry title="Test Entry">
            <p>This is a paragraph in an entry</p>
        </Entry>);
}

const App: React.FC = () => application();
export default App;
