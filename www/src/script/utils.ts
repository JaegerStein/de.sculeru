const el = (id: string): HTMLElement | null => document.getElementById(id);
const sel = (selector: string): HTMLElement | null => document.querySelector(selector)
const selAll = (selector: string): NodeListOf<HTMLElement> => document.querySelectorAll(selector);
const make = (tag: string): HTMLElement => document.createElement(tag);

const DIV = (): HTMLElement => make('div');
const H = (level: 1 | 2 | 3 | 4 | 5 | 6): HTMLElement => make(`h${level}`);
const HR = (): HTMLElement => make('hr')
const IMG = (src: string): HTMLElement => {
    const img: HTMLElement = make('img');
    img.setAttribute('src', src);
    return img;
}

export {el, sel, selAll, make};
export {DIV, H, IMG, HR};