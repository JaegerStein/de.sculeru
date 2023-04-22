import { el, make, sel, selAll } from "./utils.js";
import { Entry } from "./types/Entry.js";
import Session from "./Session.js";
import { KB_Category, KB_EntryType } from "./types/types.js";
import { SELECTED } from "./common.js";
import InternalLink from "./types/InternalLink.js";
const kbMap = {
    lore: "kb/Legende",
    journal: "kb/Journal",
    rules: "kb/Regeln",
    tools: "tools"
};
const categories = [];
const catPrefix = 'link-';
const links = () => el('links');
const enableLinks = (linkContainer) => {
    linkContainer.querySelectorAll('a').forEach((a) => {
        a.onclick = (event) => {
            event.preventDefault();
            const path = a.getAttribute('href');
            if (!path)
                return;
            fetch(path)
                .then((response) => response.text())
                .then((text) => {
                var _a, _b;
                const entryTitle = (_a = a.textContent) !== null && _a !== void 0 ? _a : ">Missing Title<";
                let entryContent = text !== null && text !== void 0 ? text : ">Missing Text<";
                const scriptReg = /<script>([\s\S]*?)<\/script>/;
                const match = entryContent.match(scriptReg);
                const script = match ? match[1].trim() : null;
                if (script)
                    entryContent = entryContent.replace(scriptReg, '').trim();
                const entry = new Entry(entryTitle, entryTitle.replace('/', '-').replace(' ', '_'), KB_EntryType.MD, entryContent);
                (_b = el('river')) === null || _b === void 0 ? void 0 : _b.prepend(entry.toHTML());
                if (script) {
                    const scriptElement = make('script');
                    scriptElement.innerHTML = script;
                    document.body.appendChild(scriptElement);
                }
            }).catch(error => console.log(`Error loading file ${a.getAttribute('href')}`, error));
        };
    });
};
function loadLinks(kb) {
    const l = links();
    if (!l)
        return;
    Session.getCategoryIndex(kb).forEach((entryKey) => {
        const kbEntry = Session.getEntry(entryKey);
        console.log(kbEntry);
        if (!kbEntry)
            return;
        const internalLink = InternalLink.fromKBEntry(kbEntry);
        console.log(internalLink);
    });
    const fetchKB = kbMap[kb];
    fetch(`./${fetchKB}/index.json`)
        .then((response) => response.json())
        .then((index) => {
        const sorted = index.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (titleA < titleB)
                return -1;
            if (titleA > titleB)
                return 1;
            return 0;
        });
        l.innerHTML = sorted.map((entry) => {
            return `<li><a href="./${fetchKB}/${entry.id}">${entry.title}</a></li>`;
        }).join('');
        enableLinks(l);
    }).catch(error => console.error(`Error loading indices for ${fetchKB}:`, error));
}
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