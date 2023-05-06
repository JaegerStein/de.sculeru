import {CATEGORY, Category} from "./common";
import {loadJSON} from "./utils";
import {IndexEntry} from "./types";

const store: Storage = localStorage;
const INDEX = 'index';

export default abstract class Session {

    /* CATEGORIES */
    private static _category: Category | null = null;
    public static get category(): Category | null { return this._category; }
    public static set category(category: Category | null) {
        Session._category = category;
        if (category) store.setItem(CATEGORY, category);
        else store.removeItem(CATEGORY);
    }

    private static activeCategory(): void { Session.category = store.getItem(CATEGORY) as Category | null; }

    /* INDEX */
    private static _index: Map<string, IndexEntry> = new Map();

    private static async loadIndex(): Promise<void> {
        Session._index.clear();
        const index: IndexEntry[] = await loadJSON('index.json');
        for (const entry of index) Session._index.set(entry.title, entry);
        store.setItem(INDEX, JSON.stringify(index));
        console.log(Session.lore);
    }

    public static filterEntries(category: Category): IndexEntry[] {
        const entries: IndexEntry[] = [];
        for (const entry of Session._index.values())
            if (entry.category === category) entries.push(entry);
        entries.sort((a, b) => a.title.localeCompare(b.title));
        return entries;
    }

    public static get lore(): IndexEntry[] {
        return Session.filterEntries(Category.LORE);
    }

    public static get journal(): IndexEntry[] {
        return Session.filterEntries(Category.JOURNAL);
    }

    public static get rules(): IndexEntry[] {
        return Session.filterEntries(Category.RULES);
    }

    public static get tools(): IndexEntry[] {
        return Session.filterEntries(Category.TOOLS);
    }

    /**
     * Initializes the session from the local storage at startup.
     */
    public static async active(): Promise<void> {
        await Session.loadIndex();
        Session.activeCategory();
    }
}