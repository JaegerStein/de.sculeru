import {el, LI, sel, selAll} from "./common/utils.js";
import Session from "./Session.js";
import {KB_Category, KB_Entry} from "./types/types.js";
import {SELECTED} from "./common/common.js";
import InternalLink from "./types/InternalLink.js";
import {registerLink} from "./links.js";

const categories: HTMLElement[] = [];
const catPrefix = 'link-';
const links = (): HTMLElement | null => el('links')
const resetSelection = () => categories.forEach((node: HTMLElement): void => node.classList.remove('selected'));
const select = (el: HTMLElement) => el.classList.add(SELECTED);
const kbFromCat = (cat: HTMLElement): KB_Category => cat.id.replace(catPrefix, '') as KB_Category;

function switchCat(c: KB_Category,
                   l: () => void, j: () => void, r: () => void, t: () => void,
                   d?: () => void): void {
    switch (c) { //@formatter:off
        case KB_Category.LORE: l(); return;
        case KB_Category.JOURNAL: j(); return;
        case KB_Category.RULES: r(); return;
        case KB_Category.TOOLS: t(); return;
        default: d?.(); return;
    } //@formatter:on
}

function loadLinks(kb: KB_Category): void {
    const linkList: HTMLElement | null = links();
    if (!linkList) return;
    linkList.innerHTML = '';

    Session.getCategoryIndex(kb)
        // sorts the collected links alphabetically
        // expand for recency and directory
        .sort((a: string, b: string): number => a.localeCompare(b))
        .forEach((entryKey: string): void => {
            const kbEntry: KB_Entry | null = Session.getEntry(entryKey);
            if (!kbEntry) return;
            const internalLink: InternalLink = InternalLink.fromKBEntry(kbEntry);
            const li: HTMLElement = LI();
            const a: HTMLElement = internalLink.toHTML();
            registerLink(a);
            li.append(a);
            linkList.append(li);
        });
}

function loadCategory(category: KB_Category): void {
    const s = Session;
    switchCat(category, s.selectLore, s.selectJournal, s.selectRules, s.selectTools, s.unselectCategory);
    loadLinks(category);
}

function handleCategoryClick(cat: HTMLElement): void {
    cat.onclick = (event: MouseEvent): void => {
        event.preventDefault();
        if (cat.classList.contains(SELECTED)) return;
        resetSelection();
        select(cat);
        loadCategory(kbFromCat(cat));
    }
}

function enableCategories(): void {
    categories.length = 0;
    categories.push(...selAll('#categories a'));
    el(`link-${Session.category}`)?.classList.add(SELECTED);
    categories.forEach((category: HTMLElement): void => handleCategoryClick(category));
}

function enableToggleSidebar(): void {
    const toggle: HTMLElement | null = el('ham');
    const sidebar: HTMLElement | null = sel('main');
    if (!toggle || !sidebar) return;
    toggle.onclick = (): void => {
        sidebar.classList.toggle('show');
        toggle.classList.toggle('rotate');
    }
}

function runFirst(): void {
    const active: HTMLElement | null = sel('#categories .selected');
    if (active) loadLinks(kbFromCat(active));
}

function enableNavigation(): void {
    enableCategories();
    enableToggleSidebar();
    runFirst();
}

export {enableNavigation}