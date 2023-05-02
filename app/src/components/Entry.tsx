import React from 'react';
import {CLOSE_ICON_SVG} from "../utils/common";

const ENTRY_CLASSNAME = 'entry';
const ENTRY_HEADER_CLASSNAME = 'entry-header';
const ENTRY_CONTENT_CLASSNAME = 'entry-content';

interface EntryProps {
    title: string,
    children: React.ReactNode
}

const Entry: React.FC<EntryProps> = ({title, children}) =>
    <div className={ENTRY_CLASSNAME}>
        <div className={ENTRY_HEADER_CLASSNAME}>
            <h1>{title}</h1>
            {CLOSE_ICON_SVG}
        </div>
        <hr/>
        <div className={ENTRY_CONTENT_CLASSNAME}>
            {children}
        </div>
    </div>

export default Entry;