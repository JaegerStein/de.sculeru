import React, {useEffect} from 'react';
import {CATEGORIES, Category, HTMLElementList, JournalIcon, LoreIcon, RulesIcon, ToolsIcon} from './common/common';
import Session from "./common/Session";
import {el, selAll} from "./common/utils";

const CATEGORIES_ID = CATEGORIES;
const CATEGORIES_CLASSNAME = 'full-width grid';

const select = (icon: HTMLElement): void => {
    Session.category = icon.id as Category;
    icon.classList.add('selected');
}

/**
 * Iterates through all category icons and removes the selected class, even if only one has it. This is still faster
 * than retrieving the actually selected icon from the DOM and removing the class from it.
 * @param icons - The list of category icons.
 */
const deselect = (icons: HTMLElementList): void => {
    icons.forEach(icon => icon.classList.remove('selected'));
}

const registerCategories = (icons: HTMLElementList): void => {
    icons.forEach(icon => {
        icon.onclick = () => {
            deselect(icons);
            select(icon);
        }
    });
}

const Left: React.FC = () => {
    useEffect(() => {
        const icons: HTMLElementList = selAll('.category');
        const category: Category | null = Session.category;
        if (category) select(el(category)!);
        registerCategories(icons);
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