import React, {useEffect} from 'react';
import {CATEGORIES, CATEGORY, Category, CategoryTitleMap} from '../utils/common';
import Session from "../utils/Session";
import {el, selAll} from "../utils/utils";
import {ReactComponent as LoreIcon} from "../../assets/images/lore.svg";
import {ReactComponent as JournalIcon} from "../../assets/images/journal.svg";
import {ReactComponent as RulesIcon} from "../../assets/images/rules.svg";
import {ReactComponent as ToolsIcon} from "../../assets/images/tools.svg";
import {HTMLElementList} from "../utils/types";
import Link, {LinkProps} from "../components/Link";


const CATEGORIES_CLASSNAME = 'full-width grid';
const LEFT_LINKS_CONTAINER = 'left-links-container';
const LEFT_LINKS = 'left-links';

type SetTitle = React.Dispatch<React.SetStateAction<string>>;
type SetLinks = React.Dispatch<React.SetStateAction<LinkProps[]>>;

const select = (icon: HTMLElement, [setTitle, setLinks]: [SetTitle, SetLinks]): void => {
    const id: Category = icon.id as Category;
    setLinks(Session.entries(id).map(entry => ({
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

const registerHamMenu = (): void => {
    const ham: HTMLElement | null = el('ham');
    if (!ham) return;
    ham.onclick = () => {
        const leftOverlay: HTMLElement | null = el('left-overlay');
        if (!leftOverlay) return;
        leftOverlay.classList.toggle('open');
        ham.classList.toggle('open');
    }
}

const Left: React.FC = () => {
    const [title, setTitle]: [string, SetTitle] = React.useState<string>('');
    const [links, setLinks]: [LinkProps[], SetLinks] = React.useState<LinkProps[]>([]);

    useEffect(() => {
        const icons: HTMLElementList = selAll('.category');
        const category: Category | null = Session.category;
        if (category) select(el(category)!, [setTitle, setLinks]);
        registerCategories(icons, [setTitle, setLinks]);
        registerHamMenu();
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
                    {links.map((link: LinkProps) => (
                        <li key={'li-link-' + link.href}><Link {...link}/></li>
                    ))}
                </ul>
            </div>
        </>
    );
}
export default Left;