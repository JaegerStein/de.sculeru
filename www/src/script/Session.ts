import {KB_Category, KB_Entry, KB_Index} from "./types/types.js";
import {Entry} from "./types/Entry.js";

const CATEGORY = 'category';
const store: Storage = localStorage;

export default abstract class Session {

    private static _category: KB_Category | null = null; // saves the currently selected category
    private static _entries: Map<string, KB_Entry> = new Map<string, KB_Entry>();
    private static _openEntries: Map<string, Entry> = new Map<string, Entry>();

    private static _loreIndex: KB_Index | null = null;
    public static get lore(): KB_Index | null { return Session._loreIndex; }
    public static updateLoreIndex(index: KB_Index): void {
        Session._loreIndex = index;
        store.setItem('lore', JSON.stringify(index));
    }
    private static _journalIndex: KB_Index | null = null;
    private static _rulesIndex: KB_Index | null = null;
    private static _toolsIndex: KB_Index | null = null;

    public static getIndex(category: KB_Category): KB_Index | null {
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


    public static get category(): string | null { return this._category; }
    public static get openEntriesMap(): Map<string, Entry> { return Session._openEntries; }
    public static get openEntriesList(): Array<Entry> { return Array.from(Session._openEntries.values()); }
    public static getEntry(title: string): KB_Entry | undefined { return Session._entries.get(title); }
    public static getOpenEntry(title: string): Entry | undefined { return Session._openEntries.get(title); }
    public static isOpen(title: string): boolean { return Session._openEntries.has(title); }

    private static selectCategory(category: KB_Category | null): void {
        if (category) {
            store.setItem(CATEGORY, category);
            Session._category = category;
        } else {
            store.removeItem(CATEGORY);
            Session._category = null;
        }
    }
    public static selectLore(): void { Session.selectCategory(KB_Category.LORE); }
    public static selectRules(): void { Session.selectCategory(KB_Category.RULES); }
    public static selectJournal(): void { Session.selectCategory(KB_Category.JOURNAL); }
    public static selectTools(): void { Session.selectCategory(KB_Category.TOOLS); }
    public static unselectCategory(): void { Session.selectCategory(null); }

    public static active(): void {
        Session.activeCategory();
    }

    private static activeCategory(): void {
        const category: string | null = store.getItem(CATEGORY);
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