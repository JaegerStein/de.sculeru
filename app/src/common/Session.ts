import {CATEGORY, Category} from "./common";
import {loadJSON} from "./utils";

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

    private static activeCategory(): void { Session.category = store.getItem(CATEGORY) as Category | null; }

    /* INDEX */
    private static _index: Map<string, string[]> = new Map();

    private static async loadIndex(): Promise<void> {
        const index = await loadJSON('index.json');
        console.log(index);
    }

    /**
     * Initializes the session from the local storage at startup.
     */
    public static async active(): Promise<void> {
        await Session.loadIndex();
        Session.activeCategory();
    }
}