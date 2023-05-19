import React, {ReactElement} from 'react';
import Entry from "../components/Entry";
import Session from "../utils/Session";

type SetEntries = React.Dispatch<React.SetStateAction<JSX.Element[]>>;
type Entries = JSX.Element[];

/**
 * Opens an entry in the center panel. This function is called from different scripts.components.
 * @param shorthand - The shorthand title of the entry to open
 * @export
 */
export const open = (shorthand: string): void => {
    if (Session.isOpen(shorthand)) return;
    openLocally(shorthand);
    Session.openEntry(shorthand);
}

export const closeAll = (): void => {
    setOpenEntries([]);
    Session.closeAll();
}

const openLocally = (shorthand: string): void => {
    const entry = makeEntry(shorthand);
    setOpenEntries([...openEntries, entry]);
}

const makeEntry = (title: string): ReactElement => {

    const close = (entry: ReactElement): void => {
        setOpenEntries(openEntries.filter(e => e.key !== entry.key));
        Session.closeEntry(entry.key as string);
    }

    const entry = <Entry title={title} onRemove={() => close(entry)} key={title}/>
    return entry;
}

const initialEntries = (): Entries => {
    const entries: Entries = [];
    Session.openEntries.forEach(title => entries.push(makeEntry(title)));
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
