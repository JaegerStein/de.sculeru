import React, {useEffect} from 'react';
import {CATEGORIES, CATEGORY, Category, CategoryTitleMap} from './common/common';
import Session from "./common/Session";
import {el, selAll} from "./common/utils";
import {ReactComponent as LoreIcon} from "./assets/images/lore.svg";
import {ReactComponent as JournalIcon} from "./assets/images/journal.svg";
import {ReactComponent as RulesIcon} from "./assets/images/rules.svg";
import {ReactComponent as ToolsIcon} from "./assets/images/tools.svg";
import {HTMLElementList} from "./common/types";
import Link, {LinkProperties} from "./components/Link";


const CATEGORIES_CLASSNAME = 'full-width grid';
const LEFT_LINKS_CONTAINER = 'left-links-container';
const LEFT_LINKS = 'left-links';

type SetTitle = React.Dispatch<React.SetStateAction<string>>;
type SetLinks = React.Dispatch<React.SetStateAction<LinkProperties[]>>;

const select = (icon: HTMLElement, [setTitle, setLinks]: [SetTitle, SetLinks]): void => {
    const id: Category = icon.id as Category;
    setLinks(Session.filterEntries(id).map(entry => ({
        href: entry.title,
        category: id,
        children: entry.title
    })));
    Session.category = id;
    setTitle(CategoryTitleMap.get(id)!);
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

const registerCategories = (icons: HTMLElementList, [setTitle, setLinks]: [SetTitle, SetLinks]): void => {
    icons.forEach(icon => {
        icon.onclick = () => {
            deselect(icons);
            select(icon, [setTitle, setLinks]);
        }
    });
}

const Left: React.FC = () => {
    const [title, setTitle]: [string, SetTitle] = React.useState<string>('');
    const [links, setLinks]: [LinkProperties[], SetLinks] = React.useState<LinkProperties[]>([]);

    useEffect(() => {
        const icons: HTMLElementList = selAll('.category');
        const category: Category | null = Session.category;
        if (category) select(el(category)!, [setTitle, setLinks]);
        registerCategories(icons, [setTitle, setLinks]);
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
                    {links.map((link: LinkProperties) => (
                        <li key={link.href}>
                            <Link {...link} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Left;