import React from 'react';
import Entry from "./components/Entry";
import Session from "./common/Session";

type SetEntries = React.Dispatch<React.SetStateAction<JSX.Element[]>>;
type Entries = JSX.Element[];

export const open = (shorthand: string): void => {
    if (Session.isOpen(shorthand)) return;
    const entry = <Entry title={shorthand} onRemove={
        () => {
            setOpenEntries(openEntries.filter(e => e.key !== entry.key));
            Session.closeEntry(shorthand);
        }
    } key={shorthand}/>;
    setOpenEntries([entry, ...openEntries]);
    Session.openEntry(shorthand);
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
