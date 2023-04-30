import {el} from "../www/src/script/common/utils";

const sel = (query: string): HTMLElement | null => document.querySelector(query);
const selAll = (query: string): NodeListOf<HTMLElement> => document.querySelectorAll(query);

const label = (): HTMLElement => sel('#nav-categories-label')!
const categoryMap: { [key: string]: string } = {
    lore: "Legende",
    journal: "Journal",
    rules: "Regeln",
    tools: "Werkzeuge"
};

const icons = (): NodeListOf<HTMLElement> => selAll('.category-icon');
const replaceLable = (element: HTMLElement): void => {
    label().innerText = categoryMap[element.id.replace('-icon', '')];
}
icons().forEach((element: HTMLElement) => {
    element.onclick = (): void => {
        icons().forEach(e => e.classList.remove('selected'));
        element.classList.add('selected');
        replaceLable(element);
    }
    element.onmouseover = (): void => replaceLable(element);
    element.onmouseout = (): void => replaceLable(sel('.category-icon.selected')!);
});

replaceLable(sel('.category-icon.selected')!);