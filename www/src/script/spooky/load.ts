import {KB_Category, KB_Entry} from "../types/types.js";

async function loadInternalURL(url: string): Promise<string> {
    const response: Response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load internal URL: ${url}`);
    return await response.text();
}

async function loadIndex(category: KB_Category): Promise<KB_Entry[]> {
    const response: Response = await fetch(categoryToPath(category) + 'index.json');
    if (!response.ok) throw new Error(`Failed to load ${category} index`);
    return await response.json();
}

function categoryToPath(category: KB_Category): string {
    switch (category) {
        case KB_Category.JOURNAL:
            return './kb/Journal/';
        case KB_Category.LORE:
            return './kb/Legende/';
        case KB_Category.RULES:
            return './kb/Regeln/'
        default:
            return './tools/';
    }
}

export {loadInternalURL, loadIndex}