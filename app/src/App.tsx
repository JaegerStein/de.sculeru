import React from 'react';
import Entry from "./components/Entry";
import Session from "./common/Session";
import {loadText} from "./common/utils";

type SetEntries = React.Dispatch<React.SetStateAction<JSX.Element[]>>;
type Entries = JSX.Element[];

export const open = async (shorthand: string): Promise<void> => {
    const indexEntry = Session.entry(shorthand);
    if (!indexEntry) return;
    const text = await loadText(indexEntry.id);
    const entry = <Entry title={indexEntry.title}>{text}</Entry>;
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
