import {el, sel, selAll} from "./utils.js";

const removeSelected = (nodeList: NodeListOf<HTMLElement> | null) => {
    nodeList?.forEach((node: HTMLElement): void => {
        node.classList.remove('selected');
    });
}

export function enableCategories(): void {
    const links: NodeListOf<HTMLElement> = selAll('#categories a');
    links.forEach((link: HTMLElement): void => {
        link.onclick = (event: MouseEvent): void => {
            event.preventDefault();
            removeSelected(links);
            link.classList.add('selected');
        }
    });
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