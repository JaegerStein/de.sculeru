import { KB_Category } from "./types/types.js";
const CATEGORY = 'category';
const store = localStorage;
export default class Session {
    static get lore() { return Session._loreIndex; }
    static updateLoreIndex(index) {
        Session._loreIndex = index;
        store.setItem('lore', JSON.stringify(index));
    }
    static getIndex(category) {
        switch (category) {
            case KB_Category.LORE:
                return Session._loreIndex;
            case KB_Category.JOURNAL:
                return Session._journalIndex;
            case KB_Category.RULES:
                return Session._rulesIndex;
            case KB_Category.TOOLS:
                return Session._toolsIndex;
            default:
                return null;
        }
    }
    static get category() { return this._category; }
    static get openEntriesMap() { return Session._openEntries; }
    static get openEntriesList() { return Array.from(Session._openEntries.values()); }
    static getEntry(title) { return Session._entries.get(title); }
    static getOpenEntry(title) { return Session._openEntries.get(title); }
    static isOpen(title) { return Session._openEntries.has(title); }
    static selectCategory(category) {
        if (category) {
            store.setItem(CATEGORY, category);
            Session._category = category;
        }
        else {
            store.removeItem(CATEGORY);
            Session._category = null;
        }
    }
    static selectLore() { Session.selectCategory(KB_Category.LORE); }
    static selectRules() { Session.selectCategory(KB_Category.RULES); }
    static selectJournal() { Session.selectCategory(KB_Category.JOURNAL); }
    static selectTools() { Session.selectCategory(KB_Category.TOOLS); }
    static unselectCategory() { Session.selectCategory(null); }
    static active() {
        Session.activeCategory();
    }
    static activeCategory() {
        const category = store.getItem(CATEGORY);
        switch (category) {
            case KB_Category.LORE:
                Session.selectLore();
                break;
            case KB_Category.RULES:
                Session.selectRules();
                break;
            case KB_Category.JOURNAL:
                Session.selectJournal();
                break;
            case KB_Category.TOOLS:
                Session.selectTools();
                break;
            default:
                Session.unselectCategory();
                break;
        }
    }
}
Session._category = null;
Session._entries = new Map();
Session._openEntries = new Map();
Session._loreIndex = null;
Session._journalIndex = null;
Session._rulesIndex = null;
Session._toolsIndex = null;
//# sourceMappingURL=Session.js.map