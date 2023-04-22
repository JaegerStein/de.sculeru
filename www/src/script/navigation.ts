import {el, LI, make, sel, selAll} from "./utils.js";
import {Entry} from "./types/Entry.js";
import Session from "./Session.js";
import {KB_Category, KB_Entry, KB_EntryType} from "./types/types.js";
import {SELECTED} from "./common.js";
import InternalLink from "./types/InternalLink.js";
import {registerLink} from "./links.js";

const kbMap = {
    lore: "kb/Legende",
    journal: "kb/Journal",
    rules: "kb/Regeln",
    tools: "tools"
}

const categories: HTMLElement[] = [];
const catPrefix = 'link-';
const links = (): HTMLElement | null => el('links')

const enableLinks = (linkContainer: HTMLElement): void => {
    linkContainer.querySelectorAll('a').forEach((a: HTMLAnchorElement) => {
        a.onclick = (event: MouseEvent) => {
            event.preventDefault();
            const path: string | null = a.getAttribute('href');
            if (!path) return;
            fetch(path)
                .then((response: Response) => response.text())
                .then((text: string) => {
                    const entryTitle: string = a.textContent ?? ">Missing Title<";
                    let entryContent: string = text ?? ">Missing Text<";

                    // if the file contains a script, it is extracted
                    const scriptReg: RegExp = /<script>([\s\S]*?)<\/script>/;
                    const match: RegExpMatchArray | null = entryContent.match(scriptReg);
                    const script: string | null = match ? match[1].trim() : null;
                    if (script) entryContent = entryContent.replace(scriptReg, '').trim();

                    const entry: Entry = new Entry(
                        entryTitle,
                        entryTitle.replace('/', '-').replace(' ', '_'),
                        KB_EntryType.MD, // pretend all entries are markdown for now
                        entryContent);
                    el('river')?.prepend(entry.toHTML());
                    if (script) { // adds an executable script to the body if it exists
                        const scriptElement: HTMLElement = make('script');
                        scriptElement.innerHTML = script;
                        document.body.appendChild(scriptElement);
                    }
                }).catch(error => console.log(`Error loading file ${a.getAttribute('href')}`, error));
        }
    });
}

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
    const l: HTMLElement | null = links();
    if (!l) return;
    l.innerHTML = '';

    Session.getCategoryIndex(kb)
        .sort((a: string, b: string): number => a.localeCompare(b))
        .forEach((entryKey: string): void => {
            const kbEntry: KB_Entry | null = Session.getEntry(entryKey);
            if (!kbEntry) return;
            const internalLink: InternalLink = InternalLink.fromKBEntry(kbEntry);
            const li: HTMLElement = LI();
            const a: HTMLElement = internalLink.toHTML();
            registerLink(a);
            li.append(a);
            l.append(li);
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