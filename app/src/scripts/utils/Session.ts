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
    private static _openEntries: string[] = [];

    private static entriesJSON = () => JSON.stringify(Session._openEntries);

    public static openEntry(title: string): void {
        if (Session._openEntries.includes(title)) return;
        Session._openEntries.push(title);
        store.setItem(OPEN_ENTRIES, Session.entriesJSON());
    }

    public static closeEntry(title: string): void {
        const index: number = Session._openEntries.indexOf(title);
        // remove item from index
        if (index == -1) return;
        Session._openEntries.splice(index, 1);
        store.setItem(OPEN_ENTRIES, Session.entriesJSON());
    }

    public static closeAll(): void {
        Session._openEntries = [];
        store.setItem(OPEN_ENTRIES, '[]');
    }

    public static get openEntries(): string[] {
        return Session._openEntries;
    }

    public static isOpen(title: string): boolean {
        return Session._openEntries.includes(title);
    }

    private static loadOpenEntries(): void {
        let openEntries: string = store.getItem(OPEN_ENTRIES) || '[]';
        if (!store.getItem(OPEN_ENTRIES) || openEntries === '{}') store.setItem(OPEN_ENTRIES, '[]');
        openEntries = store.getItem(OPEN_ENTRIES)!;
        const e: string[] = JSON.parse(openEntries);
        e.forEach(title => Session.openEntry(title));
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