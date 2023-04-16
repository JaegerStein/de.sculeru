const el = (id: string): HTMLElement | null => document.getElementById(id);
const sel = (selector: string): HTMLElement | null => document.querySelector(selector)
const selAll = (selector: string): NodeListOf<HTMLElement> => document.querySelectorAll(selector);
const make = (tag: string): HTMLElement => document.createElement(tag);
export {el, sel, selAll, make};