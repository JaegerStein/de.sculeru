/* DOM utils */
const el = (id: string): HTMLElement | null => document.getElementById(id);
const sel = (query: string): HTMLElement | null => document.querySelector(query);
const selAll = (query: string): NodeListOf<HTMLElement> => document.querySelectorAll(query);
const make = (tag: string): HTMLElement => document.createElement(tag);
export {el, sel, selAll, make}

interface AnchorOptions {
    href?: string;
    text?: string;
}

const A = (options?: AnchorOptions): HTMLAnchorElement => {
    const a = make('a') as HTMLAnchorElement;
    if (options) {
        a.href = options.href || '#';
        a.text = options.text || 'Someone forgot to give this link some text...';
    }
    return a;
}

export {A}

async function load(url: string): Promise<Response> {
    const response: Response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    return response;
}
const loadJSON = async (url: string): Promise<any> => await (await load(url)).json();
const loadText = async (url: string): Promise<string> => await (await load(url)).text();

export {loadJSON, loadText}

const firstLetter = (str: string): string => str.charAt(0).toUpperCase();
export {firstLetter}