import { KB_Category } from "./types.js";
async function loadInternalURL(url) {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error(`Failed to load internal URL: ${url}`);
    return await response.text();
}
async function loadIndex(category) {
    const response = await fetch(categoryToPath(category) + 'index.json');
    if (!response.ok)
        throw new Error(`Failed to load ${category} index`);
    return await response.json();
}
function categoryToPath(category) {
    switch (category) {
        case KB_Category.JOURNAL:
            return './kb/Journal/';
        case KB_Category.LORE:
            return './kb/Legende/';
        case KB_Category.RULES:
            return './kb/Regeln/';
        default:
            return './tools/';
    }
}
export { loadInternalURL, loadIndex };
//# sourceMappingURL=loader.js.map