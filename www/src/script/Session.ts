import {KB_Category, KB_Entry} from "./types/types.js";
import {Entry} from "./types/Entry.js";

const CATEGORY = 'category';
const store: Storage = localStorage;

export default abstract class Session {

    // saves the currently selected category
    private static _category: KB_Category | null = null;
    public static get category(): string | null { return this._category; }

    // contains all registered entries in the knowledge base, aka the index
    private static _entries: Map<string, KB_Entry> = new Map<string, KB_Entry>();
    // contains entries currently opened in the river
    private static _openEntries: Map<string, Entry> = new Map<string, Entry>();
    // contains entry
    private static _categoryIndex: Map<KB_Category, string[]> = new Map([
        [KB_Category.LORE, []],
        [KB_Category.JOURNAL, []],
        [KB_Category.RULES, []],
        [KB_Category.TOOLS, []]
    ]);

    public static addEntry(entry: KB_Entry): void {
        const {id: id, category: category} = entry;
        Session._entries.set(id, entry);
        Session._categoryIndex.get(category as KB_Category)?.push(id);
    }

    public static get entriesList(): KB_Entry[] { return Array.from(Session._entries.values())}



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