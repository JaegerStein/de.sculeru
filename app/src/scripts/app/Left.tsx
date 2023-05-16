import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {CATEGORY, Category, CategoryTitleMap, OPEN, SELECTED} from '../utils/common';
import Session from "../utils/Session";
import {el, firstLetter, selAll} from "../utils/utils";
import {HTMLElementList} from "../utils/types";
import Link, {LinkProps} from "../components/Link";
import '../../styles/left.css';
import Categories from "../components/Categories";

const LEFT_LINKS_CONTAINER = 'left-links-container';
const LEFT_LINKS = 'left-links';

type SetTitle = Dispatch<SetStateAction<string>>;
type SetLinks = Dispatch<SetStateAction<LinkProps[]>>;

const select = (icon: HTMLElement, [setTitle, setLinks]: [SetTitle, SetLinks]): void => {
    const id: Category = icon.id as Category;
    setLinks(Session.entries(id).map(entry => ({
        href: entry.title,
        category: id,
        children: entry.title
    })));
    Session.category = id;
    setTitle(CategoryTitleMap.get(id)!);
    icon.classList.add(SELECTED);
}

/**
 * Iterates through all category icons and removes the selected class, even if only one has it. This is still faster
 * than retrieving the actually selected icon from the DOM and removing the class from it.
 * @param icons - The list of category icons.
 */
const deselect = (icons: HTMLElementList): void => {
    icons.forEach((icon: HTMLElement) => icon.classList.remove(SELECTED));
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
    const underHam: HTMLElement | null = el('under-ham');
    const leftOverlay: HTMLElement | null = el('left-overlay');
    if (!ham || !underHam || !leftOverlay) return;

    ham.onclick = () => {
        leftOverlay.classList.toggle(OPEN);
        underHam.classList.toggle(OPEN);
        ham.classList.toggle(OPEN);
    }

    underHam.onclick = () => {
        if (!ham.classList.contains(OPEN)) return;
        leftOverlay.classList.remove(OPEN);
        underHam.classList.remove(OPEN);
        ham.classList.remove(OPEN);
    }
}

const Left: React.FC = () => {
    const [title, setTitle]: [string, SetTitle] = React.useState<string>('');
    const [links, setLinks]: [LinkProps[], SetLinks] = React.useState<LinkProps[]>([]);

    useEffect(() => {
        const icons: HTMLElementList = selAll('.' + CATEGORY);
        const category: Category | null = Session.category;
        if (category) select(el(category)!, [setTitle, setLinks]);
        registerCategories(icons, [setTitle, setLinks]);
        registerHamMenu();
    }, []);

    return (
        <>
            <Categories/>
            <div id={LEFT_LINKS_CONTAINER}>
                <h3>{title}</h3>
                <ul id={LEFT_LINKS}>
                    {links.map((link: LinkProps, index: number) => {
                        const current = firstLetter(link.href);
                        const previous = index > 0 ? firstLetter(links[index - 1].href) : '';

                        return (
                            <>
                                {current !== previous && <li className="li-alpha-sort">{current}</li>}
                                <li key={'li-link-' + link.href}><Link {...link}/></li>
                            </>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
export default Left;