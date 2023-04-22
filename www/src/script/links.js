import { loadInternalURL } from "./spooky/load.js";
import Session from "./Session.js";
import { KB_EntryType } from "./types/types.js";
import { el, make } from "./utils.js";
import { Entry } from "./types/Entry.js";
function extractScript(entryContent) {
    const scriptReg = /<script>([\s\S]*?)<\/script>/;
    const match = entryContent.match(scriptReg);
    const script = match ? match[1].trim() : null;
    return [entryContent.replace(scriptReg, '').trim(), script];
}
function registerLink(a) {
    a.onclick = (event) => {
        event.preventDefault();
        const path = a.getAttribute('href');
        if (!path)
            return;
        loadInternalURL(path).then((text) => {
            var _a;
            const entry = Session.getEntry(a.getAttribute('data-entry') || '');
            if (!entry)
                return;
            const title = entry.title;
            const [content, script] = extractScript(text);
            const e = new Entry(title, path.replace('/', '-').replace(' ', '_'), KB_EntryType.MD, content);
            const element = e.toHTML();
            element.querySelectorAll('a').forEach(a => registerLink(a));
            (_a = el('river')) === null || _a === void 0 ? void 0 : _a.prepend(element);
            if (script) {
                const se = make('script');
                se.innerHTML = script;
                document.body.appendChild(se);
            }
        });
    };
}
export { registerLink };
//# sourceMappingURL=links.js.map