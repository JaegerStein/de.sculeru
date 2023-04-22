import {loadInternalURL} from "./spooky/load.js";
import Session from "./Session.js";
import {KB_Entry, KB_EntryType} from "./types/types.js";
import {el, make} from "./utils.js";
import {Entry} from "./types/Entry.js";


function extractScript(entryContent: string): [string, string | null] {
// if the file contains a script, it is extracted
    const scriptReg: RegExp = /<script>([\s\S]*?)<\/script>/;
    const match: RegExpMatchArray | null = entryContent.match(scriptReg);
    const script: string | null = match ? match[1].trim() : null;
    return [entryContent.replace(scriptReg, '').trim(), script];
}

function registerLink(a: HTMLElement): void {
    a.onclick = (event: MouseEvent): void => {
        event.preventDefault();
        const path: string | null = a.getAttribute('href');
        if (!path) return;
        loadInternalURL(path).then((text: string): void => {
            const entry: KB_Entry | null = Session.getEntry(a.getAttribute('data-entry') || '');
            if (!entry) return;

            const title: string = entry.title;
            const [content, script]: [string, string | null] = extractScript(text);

            const e = new Entry(
                title,
                path.replace('/', '-').replace(' ', '_'),
                KB_EntryType.MD,
                content
            )
            const element = e.toHTML();
            element.querySelectorAll('a').forEach(a => registerLink(a));
            el('river')?.prepend(element);
            if (script) {
                const se: HTMLElement = make('script');
                se.innerHTML = script;
                document.body.appendChild(se);
            }
        });
    }
}

export {registerLink}