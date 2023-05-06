import React from 'react';
import Entry from "./components/Entry";

type SetEntries = React.Dispatch<React.SetStateAction<JSX.Element[]>>;
type Entries = JSX.Element[];

export const open = (shorthand: string): void => {
    const entry = <Entry title={shorthand} onRemove={() => {
        setOpenEntries(openEntries.filter(e => e.key !== entry.key));
    }} key={shorthand}/>;
    setOpenEntries([entry, ...openEntries]);
}

let setOpenEntries: SetEntries;
let openEntries: Entries;

const App: React.FC = () => {
    const [entries, setEntries]: [Entries, SetEntries] = React.useState<Entries>([]);

    openEntries = entries;
    setOpenEntries = setEntries;

    return <>{entries}</>;
}
export default App;
