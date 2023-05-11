import React, {Dispatch, ReactNode, SetStateAction, useEffect, useState} from 'react';
import {ReactComponent as CloseIcon} from "../../assets/images/x.svg";
import '../../styles/entry.css';
import {el, loadText} from "../utils/utils";
import Session from "../utils/Session";
import parse from "html-react-parser";
import markdownToHTML from "../utils/obsidian";
import {open} from "../app/App";
import {IndexEntry} from "../utils/types";

const ENTRY_CLASSNAME = 'entry relative';
const ENTRY_HEADER_CLASSNAME = 'entry-header flex-row jc-between ai-center';
const ENTRY_CONTENT_CLASSNAME = 'entry-content';

interface EntryProps {
    title: string,
    onRemove: () => void
}

const loadChildren = (title: string, setChildren: SetChildren): void => {
    const indexEntry: IndexEntry | null = Session.entry(title);
    if (!indexEntry) setChildren(<p>Dieser Eintrag konnte nicht geladen werden</p>)
    else loadText(indexEntry.id).then((text: string) => {
        const entryContent = parse(markdownToHTML(text));
        setChildren(entryContent);
    });
}

const enableEntryLinks = (entryId: string): void => {
    const entry: HTMLElement | null = el(entryId);
    if (!entry) return;
    entry.querySelectorAll('a').forEach((link: HTMLAnchorElement) => {

        const preventAndOpen = (event: MouseEvent) => {
            event.preventDefault();
            open(link.getAttribute('href') ?? '');
        }

        link.onclick = preventAndOpen;
        link.onauxclick = preventAndOpen; // TODO replace with routing
    });
}

const enableImageEnlargement = (entryId: string): void => {
    const entry: HTMLElement | null = el(entryId);
    if (!entry) return;
    entry.querySelectorAll('img').forEach((image: HTMLImageElement) => {
        image.onclick = () => {
            const imgURL: string | null = image.getAttribute('src');
            if (!imgURL) return;
            window.open(imgURL, '_blank')?.focus();
        }
    });
}

type Children = ReactNode;
type SetChildren = Dispatch<SetStateAction<Children>>;
const Entry: React.FC<EntryProps> = ({title, onRemove}: EntryProps) => {
    const [children, setChildren]: [Children, SetChildren] = useState<Children>(<p>Lade Eintrag...</p>);
    const entryId = 'entry-' + title.replace(' ', '');
    const removeEntry = () => onRemove();

    useEffect(() => loadChildren(title, setChildren), []); // on mount
    useEffect(() => {
        enableEntryLinks(entryId);
        enableImageEnlargement(entryId);
    }, [children]); // on children change

    return (
        <div className={ENTRY_CLASSNAME} id={entryId}>
            <div className={ENTRY_HEADER_CLASSNAME}>
                <h1>{title}</h1>
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