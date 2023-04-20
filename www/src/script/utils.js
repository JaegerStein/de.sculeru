const el = (id) => document.getElementById(id);
const sel = (selector) => document.querySelector(selector);
const selAll = (selector) => document.querySelectorAll(selector);
const make = (tag) => document.createElement(tag);
const DIV = () => make('div');
const H = (level) => make(`h${level}`);
const HR = () => make('hr');
const IMG = (src) => {
    const img = make('img');
    img.setAttribute('src', src);
    return img;
};
const SECTION = () => make('section');
export { el, sel, selAll, make };
export { DIV, H, HR, IMG, SECTION };
//# sourceMappingURL=utils.js.map