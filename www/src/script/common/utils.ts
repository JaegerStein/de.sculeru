const el = (id: string): HTMLElement | null => document.getElementById(id);
const sel = (selector: string): HTMLElement | null => document.querySelector(selector)
const selAll = (selector: string): NodeListOf<HTMLElement> => document.querySelectorAll(selector);
const make = (tag: string): HTMLElement => document.createElement(tag);

const A = (path: string, textContent?: string): HTMLAnchorElement => {
    const a: HTMLAnchorElement = make('a') as HTMLAnchorElement;
    a.href = path;
    a.textContent = textContent || "";
    return a;
}
const DIV = (): HTMLElement => make('div');
const H = (level: 1 | 2 | 3 | 4 | 5 | 6, textContent?: string): HTMLElement => {
    const h: HTMLElement = make(`h${level}`);
    h.textContent = textContent || "";
    return h;
}
const HR = (): HTMLElement => make('hr')
const IMG = (src: string): HTMLElement => {
    const img: HTMLElement = make('img');
    img.setAttribute('src', src);
    return img;
}
const LI = (): HTMLElement => make('li');
const P = (textContent?: string): HTMLElement => {
    const p = make('p');
    p.textContent = textContent || "";
    return p;
}
const SECTION = (): HTMLElement => make('section');

export {el, sel, selAll, make};
export {A, DIV, H, HR, IMG, LI, P, SECTION};