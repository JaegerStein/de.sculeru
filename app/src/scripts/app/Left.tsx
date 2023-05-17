import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {Category, CategoryTitleMap, OPEN} from '../utils/common';
import Session from "../utils/Session";
import {el} from "../utils/utils";
import {LinkProps} from "../components/Link";
import '../../styles/left.css';
import Categories from "../components/Categories";
import LeftLinks from "../components/LeftLinks";

const LEFT_LINKS_CONTAINER = 'left-links-container';

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

    useEffect(() => {
        Session.category && loadCategoryLinks(Session.category);
        registerHamMenu();
    }, []);

    function loadCategoryLinks(icon: Category) {
        setLinks(Session.entries(icon).map(entry => ({
            href: entry.title,
            category: icon,
            children: entry.title
        })));
        setTitle(CategoryTitleMap.get(icon)!);
    }

    return (
        <>
            <Categories onClick={loadCategoryLinks}/>
            <div id={LEFT_LINKS_CONTAINER}>
                <h3>{title}</h3>
                <LeftLinks links={links}/>
            </div>
        </>
    );
}
export default Left;