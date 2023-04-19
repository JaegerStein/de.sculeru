import { el, make, sel, selAll } from "./utils.js";
import { Entry, EntryType } from "./Entry.js";
const removeSelected = (nodeList) => {
    nodeList === null || nodeList === void 0 ? void 0 : nodeList.forEach((node) => {
        node.classList.remove('selected');
    });
};
const kbMap = {
    lore: "kb/Legende",
    journal: "kb/Journal",
    rules: "kb/Regeln",
    tools: "tools"
};
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
                const entry = new Entry(entryTitle, entryTitle.replace('/', '-').replace(' ', '_'), EntryType.MD, entryContent);
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
const loadLinks = (kb) => {
    const linkContainer = sel('#links');
    if (!linkContainer)
        return;
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
        linkContainer.innerHTML = sorted.map((entry) => {
            return `<li><a href="./${fetchKB}/${entry.id}">${entry.title}</a></li>`;
        }).join('');
        enableLinks(linkContainer);
    }).catch(error => console.error(`Error loading indices for ${fetchKB}:`, error));
};
const runFirst = () => {
    const active = sel('#categories .selected');
    const kb = active === null || active === void 0 ? void 0 : active.id.replace('link-', '');
    if (kb)
        loadLinks(kb);
};
export function enableCategories() {
    const categories = selAll('#categories a');
    categories.forEach((category) => {
        category.onclick = (event) => {
            event.preventDefault();
            if (category.classList.contains('selected'))
                return;
            removeSelected(categories);
            el('links').textContent = '';
            category.classList.add('selected');
            const kb = category.id.replace('link-', '');
            loadLinks(kb);
        };
    });
    runFirst();
}
export function enableToggleSidebar() {
    const toggle = el('ham');
    const sidebar = sel('main');
    if (!toggle || !sidebar)
        return;
    toggle.onclick = () => {
        sidebar.classList.toggle('show');
        toggle.classList.toggle('rotate');
    };
}
//# sourceMappingURL=nav.js.map