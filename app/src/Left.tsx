import React, {useEffect} from 'react';
import {
    CATEGORIES, CATEGORY,
    Category, CategoryTitleMap,
    HTMLElementList,
} from './common/common';
import Session from "./common/Session";
import {el, selAll} from "./common/utils";
import {ReactComponent as LoreIcon} from "./assets/images/lore.svg";
import {ReactComponent as JournalIcon} from "./assets/images/journal.svg";
import {ReactComponent as RulesIcon} from "./assets/images/rules.svg";
import {ReactComponent as ToolsIcon} from "./assets/images/tools.svg";


const CATEGORIES_CLASSNAME = 'full-width grid';
const LEFT_LINKS_CONTAINER = 'left-links-container';
const LEFT_LINKS = 'left-links';

type SetState = React.Dispatch<React.SetStateAction<string>>;

const select = (icon: HTMLElement, setState: SetState): void => {
    const id: Category = icon.id as Category;
    Session.category = id;
    setState(CategoryTitleMap.get(id)!);
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

const registerCategories = (icons: HTMLElementList, setState: SetState): void => {
    icons.forEach(icon => {
        icon.onclick = () => {
            deselect(icons);
            select(icon, setState);
        }
    });
}

const Left: React.FC = () => {
    const [title, setTitle]: [string, SetState] = React.useState<string>('');

    useEffect(() => {
        const icons: HTMLElementList = selAll('.category');
        const category: Category | null = Session.category;
        if (category) select(el(category)!, setTitle);
        registerCategories(icons, setTitle);
    }, []);

    return (
        <>
            <div id={CATEGORIES} className={CATEGORIES_CLASSNAME}>
                <LoreIcon id={Category.LORE} className={CATEGORY}/>
                <JournalIcon id={Category.JOURNAL} className={CATEGORY}/>
                <RulesIcon id={Category.RULES} className={CATEGORY}/>
                <ToolsIcon id={Category.TOOLS} className={CATEGORY}/>
            </div>
            <div id={LEFT_LINKS_CONTAINER}>
                <h3>{title}</h3>
                <ul id={LEFT_LINKS}>

                </ul>
            </div>
        </>
    );
}

export default Left;