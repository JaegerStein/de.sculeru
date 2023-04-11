const el = (id: string): HTMLElement | null => document.getElementById(id);
const sel = (selector: string): HTMLElement | null => document.querySelector(selector)
const selAll = (selector: string): NodeListOf<HTMLElement> => document.querySelectorAll(selector);
export {el, sel, selAll};