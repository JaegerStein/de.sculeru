import {KB_Category} from "./types.js";
import InternalLink from "./InternalLink.js";
import {Entry} from "./Entry";

const CATEGORY = 'category';
const store: Storage = localStorage;

export default abstract class Session {

    private static _category: KB_Category | null = null; // saves the currently selected category
    private static _openEntries: Map<InternalLink, Entry> = new Map<InternalLink, Entry>();

    public static get category(): string | null { return this._category; }
    public static get openEntriesMap(): Map<InternalLink, Entry> { return Session._openEntries; }
    public static get openEntriesList(): Array<Entry> { return Array.from(Session._openEntries.values()); }

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