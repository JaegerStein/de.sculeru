const sel = (query) => document.querySelector(query);
const selAll = (query) => document.querySelectorAll(query);
const label = () => sel('#nav-categories-label');
const categoryMap = {
    lore: "Legende",
    journal: "Journal",
    rules: "Regeln",
    tools: "Werkzeuge"
};
const icons = () => selAll('.category-icon');
const replaceLable = (element) => {
    label().innerText = categoryMap[element.id.replace('-icon', '')];
};
icons().forEach((element) => {
    element.onclick = () => {
        icons().forEach(e => e.classList.remove('selected'));
        element.classList.add('selected');
        replaceLable(element);
    };
    element.onmouseover = () => replaceLable(element);
    element.onmouseout = () => replaceLable(sel('.category-icon.selected'));
});
replaceLable(sel('.category-icon.selected'));
export {};
//# sourceMappingURL=categories.js.map