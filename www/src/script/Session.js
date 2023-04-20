import { KB_Category } from "./types.js";
const CATEGORY = 'category';
export default class Session {
    static get category() { return this._category; }
    static selectCategory(category) {
        if (category) {
            localStorage.setItem(CATEGORY, category);
            Session._category = category;
        }
        else {
            localStorage.removeItem(CATEGORY);
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
        const category = localStorage.getItem(CATEGORY);
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
Session._linkStorage = new Map();
//# sourceMappingURL=Session.js.map