import { KB_Category } from "./types/types.js";
const CATEGORY = 'category';
const store = localStorage;
export default class Session {
    static get category() { return this._category; }
    static getCategoryIndex(category) {
        return Session._categoryIndex.get(category) || [];
    }
    static addEntry(entry) {
        var _a;
        const { title: title, category: category } = entry;
        Session._entries.set(title, entry);
        (_a = Session._categoryIndex.get(category)) === null || _a === void 0 ? void 0 : _a.push(title);
    }
    static get entriesList() { return Array.from(Session._entries.values()); }
    static get openEntriesMap() { return Session._openEntries; }
    static get openEntriesList() { return Array.from(Session._openEntries.values()); }
    static getEntry(title) { return Session._entries.get(title) || null; }
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
Session._categoryIndex = new Map([
    [KB_Category.LORE, []],
    [KB_Category.JOURNAL, []],
    [KB_Category.RULES, []],
    [KB_Category.TOOLS, []]
]);
//# sourceMappingURL=Session.js.map