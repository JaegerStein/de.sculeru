import {el, make, sel, selAll} from "./utils.js";
import {Entry} from "./Entry.js";
import Session from "./Session.js";
import {KB_Entry, KB_EntryType} from "./types.js";

const removeSelected = (nodeList: NodeListOf<HTMLElement> | null) => {
    nodeList?.forEach((node: HTMLElement): void => {
        node.classList.remove('selected');
    });
}

const kbMap = {
    lore: "kb/Legende",
    journal: "kb/Journal",
    rules: "kb/Regeln",
    tools: "tools"
}

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

const loadLinks = (kb: string): void => {
    const linkContainer: HTMLElement | null = sel('#links');
    if (!linkContainer) return;
    const fetchKB: string = kbMap[kb as keyof typeof kbMap];
    fetch(`./${fetchKB}/index.json`)
        .then((response: Response) => response.json())
        .then((index: KB_Entry[]): void => {
            const sorted: KB_Entry[] = index.sort((a: KB_Entry, b: KB_Entry): number => {
                const titleA: string = a.title.toLowerCase();
                const titleB: string = b.title.toLowerCase();
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;
                return 0
            });
            linkContainer.innerHTML = sorted.map((entry: KB_Entry): string => {
                return `<li><a href="./${fetchKB}/${entry.id}">${entry.title}</a></li>`;
            }).join('');
            enableLinks(linkContainer);
        }).catch(error => console.error(`Error loading indices for ${fetchKB}:`, error));
}

const runFirst = (): void => {
    const active: HTMLElement | null = sel('#categories .selected');
    const kb: string | undefined = active?.id.replace('link-', '')
    if (kb) loadLinks(kb);
}

export function enableCategories(): void {
    const categories: NodeListOf<HTMLElement> = selAll('#categories a');
    const initialSelection: string | null = Session.category;
    switch (initialSelection) {
        case 'lore':
            el('link-lore')?.classList.add('selected');
            break;
        case 'rules':
            el('link-rules')?.classList.add('selected');
            break;
        case 'journal':
            el('link-journal')?.classList.add('selected');
            break;
        case 'tools':
            el('link-tools')?.classList.add('selected');
            break;
        default:
            break;
    }
    categories.forEach((category: HTMLElement): void => {
        category.onclick = (event: MouseEvent): void => {
            event.preventDefault();
            if (category.classList.contains('selected')) return;
            removeSelected(categories);
            el('links')!.textContent = '';
            category.classList.add('selected');

            const cat: string = category.id.replace('link-', '');
            switch (cat) {
                case 'lore':
                    Session.selectLore();
                    break;
                case 'rules':
                    Session.selectRules();
                    break;
                case 'journal':
                    Session.selectJournal();
                    break;
                case 'tools':
                    Session.selectTools();
                    break;
                default:
                    Session.unselectCategory();
                    break;
            }

            const kb: string = category.id.replace('link-', '');
            loadLinks(kb);
        }
    });
    runFirst();
}

export function enableToggleSidebar(): void {
    const toggle: HTMLElement | null = el('ham');
    const sidebar: HTMLElement | null = sel('main');
    if (!toggle || !sidebar) return;
    toggle.onclick = (): void => {
        sidebar.classList.toggle('show');
        toggle.classList.toggle('rotate');
    }
}