import React from 'react';
import {ReactComponent as CloseIcon} from "../assets/images/x.svg";
import '../assets/styles/entry.css';
import {loadText} from "../common/utils";
import Session from "../common/Session";
import {marked} from "marked";
import parse from "html-react-parser";

const ENTRY_CLASSNAME = 'entry relative';
const ENTRY_HEADER_CLASSNAME = 'entry-header flex-row jc-between ai-center';
const ENTRY_CONTENT_CLASSNAME = 'entry-content';

interface EntryProperties {
    title: string,
    onRemove: () => void
}

const Entry: React.FC<EntryProperties> = (properties: EntryProperties) => {
    const [children, setChildren] = React.useState<React.ReactNode>(<p>Lade Eintrag...</p>);

    const removeEntry = () => properties.onRemove();

    React.useEffect(() => {
        const indexEntry = Session.entry(properties.title);
        if (!indexEntry) setChildren(<p>Dieser Eintrag konnte nicht geladen werden</p>)
        else loadText(indexEntry.id).then((text: string) => {
            setChildren(parse(marked.parse(text)));
        });
    }, [properties.title]);

    return <div className={ENTRY_CLASSNAME}>
        <div className={ENTRY_HEADER_CLASSNAME}>
            <h1>{properties.title}</h1>
            <CloseIcon onClick={removeEntry}/>
        </div>
        <hr/>
        <div className={ENTRY_CONTENT_CLASSNAME}>
            {children}
        </div>
    </div>
}

export default Entry;