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
export { el, sel, selAll, make };
export { DIV, H, IMG, HR };
//# sourceMappingURL=utils.js.map