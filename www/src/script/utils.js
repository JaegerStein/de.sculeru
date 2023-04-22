const el = (id) => document.getElementById(id);
const sel = (selector) => document.querySelector(selector);
const selAll = (selector) => document.querySelectorAll(selector);
const make = (tag) => document.createElement(tag);
const A = (path) => {
    const a = make('a');
    a.setAttribute('href', path);
    return a;
};
const DIV = () => make('div');
const H = (level) => make(`h${level}`);
const HR = () => make('hr');
const IMG = (src) => {
    const img = make('img');
    img.setAttribute('src', src);
    return img;
};
const LI = () => make('li');
const SECTION = () => make('section');
export { el, sel, selAll, make };
export { A, DIV, H, HR, IMG, LI, SECTION };
//# sourceMappingURL=utils.js.map