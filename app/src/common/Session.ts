import {CATEGORY, Category} from "./common";

const store: Storage = localStorage;

export default abstract class Session {

    /* CATEGORIES */
    private static _category: Category | null = null;
    public static get category(): Category | null { return this._category; }
    public static set category(category: Category | null) {
        Session._category = category;
        if (category) store.setItem(CATEGORY, category);
        else store.removeItem('category');
    }

    public static lore(): void { Session.category = Category.LORE; }
    public static journal(): void { Session.category = Category.JOURNAL; }
    public static rules(): void { Session.category = Category.RULES; }
    public static tools(): void { Session.category = Category.TOOLS; }

    private static activeCategory(): void { Session.category = store.getItem(CATEGORY) as Category | null; }

    /**
     * Initializes the session from the local storage at startup.
     */
    public static active(): void {
        Session.activeCategory();
    }
}