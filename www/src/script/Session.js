export var Category;
(function (Category) {
    Category["LORE"] = "lore";
    Category["RULES"] = "rules";
    Category["JOURNAL"] = "journal";
    Category["TOOLS"] = "tools";
})(Category || (Category = {}));
const CATEGORY = 'category';
export default class Session {
    static get category() { return this._category; }
    static get categoryIndices() { return Session._kbIndex; }
    static categoryIndex(category) { return Session._kbIndex.get(category); }
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
    static selectLore() { Session.selectCategory(Category.LORE); }
    static selectRules() { Session.selectCategory(Category.RULES); }
    static selectJournal() { Session.selectCategory(Category.JOURNAL); }
    static selectTools() { Session.selectCategory(Category.TOOLS); }
    static unselectCategory() { Session.selectCategory(null); }
    static active() {
        Session.activeCategory();
    }
    static activeCategory() {
        const category = localStorage.getItem(CATEGORY);
        switch (category) {
            case Category.LORE:
                Session.selectLore();
                break;
            case Category.RULES:
                Session.selectRules();
                break;
            case Category.JOURNAL:
                Session.selectJournal();
                break;
            case Category.TOOLS:
                Session.selectTools();
                break;
            default:
                Session.unselectCategory();
                break;
        }
    }
}
Session._category = null;
Session._kbIndex = new Map();
//# sourceMappingURL=Session.js.map