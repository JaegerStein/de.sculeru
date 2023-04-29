import {loadInternalURL} from "./spooky/load.js";
import Session from "./Session.js";
import {KB_Entry, KB_EntryType} from "./types/types.js";
import {A, el, make} from "./common/utils.js";
import {Entry} from "./types/Entry.js";


function extractScript(entryContent: string): [string, string | null] {
    const scriptReg: RegExp = /<script>([\s\S]*?)<\/script>/;
    const match: RegExpMatchArray | null = entryContent.match(scriptReg);
    const script: string | null = match ? match[1].trim() : null;
    return [entryContent.replace(scriptReg, '').trim(), script];
}

/**
 * Automatically resolves and retrieves an internal link to an entry from only its associated title. Uses this title
 * as the text content of the link, or alternatively the provided textContent.
 *
 * @param title - The short look-up title of a knowledge base entry
 * @param textContent - The alternative text content of the link if title shouldn't be used
 * @returns A new HTML anchor element (`<a>`) that links to the knowledge base entry
 * @throws Error if no entry could be found in the {@link Session} store associated with that title
 */
function linkFromTitle(title: string, textContent?: string): HTMLElement {
    const kbEntry: KB_Entry | null = Session.getEntry(title);
    if (!kbEntry) throw new Error(`Could not resolve identifier "${title}"; no associated entry was found.`);
    const a: HTMLElement = A(kbEntry.id, textContent || title);
    a.classList.add('internal-link');
    return a;
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

export {registerLink, linkFromTitle}