import {el, sel, selAll} from "./utils.js";
import {EntryData} from "./Entry.js";

const removeSelected = (nodeList: NodeListOf<HTMLElement> | null) => {
    nodeList?.forEach((node: HTMLElement): void => {
        node.classList.remove('selected');
    });
}

const kbMap = {
    lore: "legende",
    journal: "journal",
    rules: "regeln",
    tools: "werkzeuge"
}

const loadLinks = (kb: string): void => {
    const linkContainer: HTMLElement | null = sel('#links');
    if (!linkContainer) return;
    const fetchKB: string = kbMap[kb as keyof typeof kbMap];
    fetch(`./${fetchKB}/index.json`)
        .then((response: Response) => response.json())
        .then((index: EntryData[]): void => {
            const sorted: EntryData[] = index.sort((a: EntryData, b: EntryData): number => {
                const titleA: string = a.title.toLowerCase();
                const titleB: string = b.title.toLowerCase();
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;
                return 0
            });
            linkContainer.innerHTML = sorted.map((entry: EntryData): string => {
                return `<li><a href="./${fetchKB}/${entry.id}" onclick="event.preventDefault()">${entry.title}</a></li>`;
            }).join('');
        }).catch(error => console.error(`Error loading indices for ${fetchKB}:`, error));
}

const runFirst = (): void => {
    const active: HTMLElement | null = sel('#categories .selected');
    const kb: string | undefined = active?.id.replace('link-', '')
    if (kb) loadLinks(kb);
}

export function enableCategories(): void {
    const categories: NodeListOf<HTMLElement> = selAll('#categories a');

    categories.forEach((category: HTMLElement): void => {
        category.onclick = (event: MouseEvent): void => {
            event.preventDefault();
            if (category.classList.contains('selected')) return;
            removeSelected(categories);
            category.classList.add('selected');

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