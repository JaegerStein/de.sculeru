import React from 'react';
import Entry from "./components/Entry";
import Session from "./common/Session";

type SetEntries = React.Dispatch<React.SetStateAction<JSX.Element[]>>;
type Entries = JSX.Element[];

/**
 * Opens an entry in the center panel. This function is called from different components.
 * @param shorthand - The shorthand title of the entry to open
 * @export
 */
export const open = (shorthand: string): void => {
    if (Session.isOpen(shorthand)) return;
    openLocally(shorthand);
    Session.openEntry(shorthand);
}

const openLocally = (shorthand: string): void => {
    const entry = <Entry title={shorthand} onRemove={
        () => {
            setOpenEntries(openEntries.filter(e => e.key !== entry.key));
            Session.closeEntry(shorthand);
        }
    } key={shorthand}/>;
    setOpenEntries([entry, ...openEntries]);
}

const initialEntries = (): Entries => {
    const entries: Entries = [];
    Session.openEntries.forEach(entry => {
        entries.push(<Entry title={entry} onRemove={
            () => {
                setOpenEntries(openEntries.filter(e => e.key !== entry));
                Session.closeEntry(entry);
            }
        } key={entry}/>);
    });
    return entries.reverse();
}

let setOpenEntries: SetEntries;
let openEntries: Entries;

const App: React.FC = () => {
    const [entries, setEntries]: [Entries, SetEntries] = React.useState<Entries>(initialEntries());

    openEntries = entries;
    setOpenEntries = setEntries;

    return <>{entries}</>;
}
export default App;
