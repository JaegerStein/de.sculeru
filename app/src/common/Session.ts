import {CATEGORY, Category} from "./common";
import {loadJSON} from "./utils";
import {IndexEntry} from "./types";

const store: Storage = localStorage;
const INDEX = 'index';
const OPEN_ENTRIES = 'openEntries';

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
    }

    public static entries(category: Category): IndexEntry[] {
        const entries: IndexEntry[] = [];
        for (const entry of Session._index.values())
            if (entry.category === category) entries.push(entry);
        entries.sort((a, b) => a.title.localeCompare(b.title));
        return entries;
    }

    public static entry(title: string): IndexEntry | null {
        return Session._index.get(title) || null
    }

    /* OPEN ENTRIES */
    private static _openEntries: Set<string> = new Set();

    public static openEntry(title: string): void {
        Session._openEntries.add(title);
        store.setItem(OPEN_ENTRIES, JSON.stringify(Session._openEntries));
    }

    public static closeEntry(title: string): void {
        if (Session._openEntries.has(title)) Session._openEntries.delete(title);
        store.setItem(OPEN_ENTRIES, JSON.stringify(Session._openEntries));
    }

    public static get openEntries(): string[] {
        return Array.from<string>(Session._openEntries);
    }

    public static isOpen(title: string): boolean {
        return Session._openEntries.has(title);
    }

    private static loadOpenEntries(): void {
        // fix
    }

    /**
     * Initializes the session from the local storage at startup.
     */
    public static async active(): Promise<void> {
        await Session.loadIndex();
        Session.loadOpenEntries();
        Session.activeCategory();
    }
}