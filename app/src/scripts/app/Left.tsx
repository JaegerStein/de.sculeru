import React, {Dispatch, FC, Fragment, SetStateAction, useEffect} from 'react';
import {CATEGORY, Category, CategoryTitleMap, OPEN, SELECTED} from '../utils/common';
import Session from "../utils/Session";
import {el, firstLetter, selAll} from "../utils/utils";
import {HTMLElementList} from "../utils/types";
import Link, {LinkProps} from "../components/Link";
import '../../styles/left.css';
import Categories from "../components/Categories";

const LEFT_LINKS_CONTAINER = 'left-links-container';
const LEFT_LINKS = 'left-links';

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

type SetTitle = Dispatch<SetStateAction<string>>;
type SetLinks = Dispatch<SetStateAction<LinkProps[]>>;

const Left: React.FC = () => {
    const [title, setTitle]: [string, SetTitle] = React.useState<string>('');
    const [links, setLinks]: [LinkProps[], SetLinks] = React.useState<LinkProps[]>([]);

    function loadCategoryLinks(icon: Category) {
        setLinks(Session.entries(icon).map(entry => ({
            href: entry.title,
            category: icon,
            children: entry.title
        })));
        setTitle(CategoryTitleMap.get(icon)!);
    }

    useEffect(() => {
        Session.category && loadCategoryLinks(Session.category);
        registerHamMenu();
    }, []);

    return (
        <>
            <Categories onClick={loadCategoryLinks}/>
            <div id={LEFT_LINKS_CONTAINER}>
                <h3>{title}</h3>
                <ul id={LEFT_LINKS}>
                    {links.map((link: LinkProps, index: number) => {
                        const current: string = firstLetter(link.href);
                        const previous: string = index > 0 ? firstLetter(links[index - 1].href) : '';

                        return (
                            <Fragment key={'link-group-' + current + '-' + index}>
                                {current !== previous &&
                                    <li key={'li-alpha-sort-' + current} className="li-alpha-sort">{current}</li>}
                                <li key={'li-link-' + link.href}><Link {...link}/></li>
                            </Fragment>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
export default Left;