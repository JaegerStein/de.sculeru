import React from 'react';
import {ReactComponent as CloseIcon} from "../assets/images/x.svg";
import '../assets/styles/entry.css';
import {el, loadText} from "../common/utils";
import Session from "../common/Session";
import parse from "html-react-parser";
import markdownToHTML from "../obsidian";
import {open} from "../App";
import {wait} from "@testing-library/user-event/dist/utils";

const ENTRY_CLASSNAME = 'entry relative';
const ENTRY_HEADER_CLASSNAME = 'entry-header flex-row jc-between ai-center';
const ENTRY_CONTENT_CLASSNAME = 'entry-content';

interface EntryProperties {
    title: string,
    onRemove: () => void
}

const Entry: React.FC<EntryProperties> = (properties: EntryProperties) => {
    const [children, setChildren] = React.useState<React.ReactNode>(<p>Lade Eintrag...</p>);
    const entryId = 'entry-' + properties.title.replace(' ', '');
    const removeEntry = () => properties.onRemove();

    React.useEffect(() => {
        const indexEntry = Session.entry(properties.title);
        if (!indexEntry) setChildren(<p>Dieser Eintrag konnte nicht geladen werden</p>)
        else loadText(indexEntry.id).then((text: string) => {
            setChildren(parse(markdownToHTML(text)));
            el(entryId)?.querySelectorAll('a').forEach((link: HTMLAnchorElement) => {
                link.onclick = (event: MouseEvent) => {
                    event.preventDefault();
                    open(link.getAttribute('href') ?? '');
                }
            });

            // Absolutely hideous, but it works, somehow
            wait(50).then(() => {
                const entry: HTMLElement | null = el(entryId);
                let minHeight = 0;
                entry?.querySelectorAll(`.${ENTRY_CONTENT_CLASSNAME} img`).forEach(image => {
                    console.log(image.clientHeight);
                    if (image.clientHeight > minHeight) minHeight = image.clientHeight;
                });
                entry?.querySelector(`.${ENTRY_CONTENT_CLASSNAME}`)
                    ?.setAttribute('style', `min-height: ${minHeight}px`);
            });
        });
    }, []);

    return (
        <div className={ENTRY_CLASSNAME} id={entryId}>
            <div className={ENTRY_HEADER_CLASSNAME}>
                <h1>{properties.title}</h1>
                <CloseIcon onClick={removeEntry}/>
            </div>
            <hr/>
            <div className={ENTRY_CONTENT_CLASSNAME}>
                {children}
            </div>
        </div>
    );
}

export default Entry;