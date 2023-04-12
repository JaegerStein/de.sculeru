import {selAll} from "./utils.js";

export function enableCategories(): void {
    const links: NodeListOf<HTMLElement> = selAll('#categories a');
    links.forEach((link: HTMLElement): void => {
        link.onclick = (event: MouseEvent): void => {
            event.preventDefault();
            links.forEach((other: HTMLElement): void => {
                other.classList.remove('selected');
            });
            link.classList.add('selected');
        }
    });
}