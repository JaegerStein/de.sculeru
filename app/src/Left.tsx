import React, {useEffect} from 'react';
import {CATEGORIES, JournalIcon, LoreIcon, RulesIcon, ToolsIcon} from './common/common';

const CATEGORIES_ID = CATEGORIES;
const CATEGORIES_CLASSNAME = 'full-width grid';
const Left: React.FC = () => {
    useEffect(() => {
        const icons: NodeListOf<HTMLElement> = document.querySelectorAll('#categories svg');
        icons.forEach(icon => {
            icon.onclick = () => {
                icons.forEach(icon => icon.classList.remove('selected'));
                icon.classList.add('selected');
            }
        })
    }, []);

    return (
        <div id={CATEGORIES_ID} className={CATEGORIES_CLASSNAME}>
            <LoreIcon/>
            <JournalIcon/>
            <RulesIcon/>
            <ToolsIcon/>
        </div>
    );
}

export default Left;