import { el, LI, sel, selAll } from "./common/utils.js";
import Session from "./Session.js";
import { KB_Category } from "./types/types.js";
import { SELECTED } from "./common/common.js";
import InternalLink from "./types/InternalLink.js";
import { registerLink } from "./links.js";
const categories = [];
const catPrefix = 'link-';
const links = () => el('links');
const resetSelection = () => categories.forEach((node) => node.classList.remove('selected'));
const select = (el) => el.classList.add(SELECTED);
const kbFromCat = (cat) => cat.id.replace(catPrefix, '');
function switchCat(c, l, j, r, t, d) {
    switch (c) {
        case KB_Category.LORE:
            l();
            return;
        case KB_Category.JOURNAL:
            j();
            return;
        case KB_Category.RULES:
            r();
            return;
        case KB_Category.TOOLS:
            t();
            return;
        default:
            d === null || d === void 0 ? void 0 : d();
            return;
    }
}
function loadLinks(kb) {
    const l = links();
    if (!l)
        return;
    l.innerHTML = '';
    Session.getCategoryIndex(kb)
        .sort((a, b) => a.localeCompare(b))
        .forEach((entryKey) => {
        const kbEntry = Session.getEntry(entryKey);
        if (!kbEntry)
            return;
        const internalLink = InternalLink.fromKBEntry(kbEntry);
        const li = LI();
        const a = internalLink.toHTML();
        registerLink(a);
        li.append(a);
        l.append(li);
    });
}
function loadCategory(category) {
    const s = Session;
    switchCat(category, s.selectLore, s.selectJournal, s.selectRules, s.selectTools, s.unselectCategory);
    loadLinks(category);
}
function handleCategoryClick(cat) {
    cat.onclick = (event) => {
        event.preventDefault();
        if (cat.classList.contains(SELECTED))
            return;
        resetSelection();
        select(cat);
        loadCategory(kbFromCat(cat));
    };
}
function enableCategories() {
    var _a;
    categories.length = 0;
    categories.push(...selAll('#categories a'));
    (_a = el(`link-${Session.category}`)) === null || _a === void 0 ? void 0 : _a.classList.add(SELECTED);
    categories.forEach((category) => handleCategoryClick(category));
}
function enableToggleSidebar() {
    const toggle = el('ham');
    const sidebar = sel('main');
    if (!toggle || !sidebar)
        return;
    toggle.onclick = () => {
        sidebar.classList.toggle('show');
        toggle.classList.toggle('rotate');
    };
}
function runFirst() {
    const active = sel('#categories .selected');
    if (active)
        loadLinks(kbFromCat(active));
}
function enableNavigation() {
    enableCategories();
    enableToggleSidebar();
    runFirst();
}
export { enableNavigation };
//# sourceMappingURL=navigation.js.map