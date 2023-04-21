import { KB_Category } from "./types.js";
const CATEGORY = 'category';
const store = localStorage;
export default class Session {
    static get category() { return this._category; }
    static get openEntriesMap() { return Session._openEntries; }
    static get openEntriesList() { return Array.from(Session._openEntries.values()); }
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
Session._openEntries = new Map();
//# sourceMappingURL=Session.js.map