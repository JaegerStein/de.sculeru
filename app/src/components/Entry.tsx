import React from 'react';
import {CloseIcon} from ".././common/common";
import '../assets/styles/entry.css';

const ENTRY_CLASSNAME = 'entry relative';
const ENTRY_HEADER_CLASSNAME = 'entry-header flex-row jc-between ai-center';
const ENTRY_CONTENT_CLASSNAME = 'entry-content';

interface EntryProps {
    title: string,
    children?: React.ReactNode
}

const Entry: React.FC<EntryProps> = ({title, children}) =>
    <div className={ENTRY_CLASSNAME}>
        <div className={ENTRY_HEADER_CLASSNAME}>
            <h1>{title}</h1>
            <CloseIcon/>
        </div>
        <hr/>
        <div className={ENTRY_CONTENT_CLASSNAME}>
            {children}
        </div>
    </div>

export default Entry;