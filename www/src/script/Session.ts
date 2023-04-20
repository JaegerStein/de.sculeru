import {KB_Category} from "./types.js";
import InternalLink from "./InternalLink.js";

const CATEGORY = 'category';

export default abstract class Session {

    private static _category: KB_Category | null = null; // saves the currently selected category
    private static _linkStorage: Map<string, InternalLink> = new Map<string, HTMLElement>()
    /**
     * Returns the currently selected category
     *
     * @static
     * @returns {(string | null)}The selected category of the knowledgebase as a string, or null if none is selected
     */
    public static get category(): string | null { return this._category; }

    private static selectCategory(category: KB_Category | null): void {
        if (category) {
            localStorage.setItem(CATEGORY, category);
            Session._category = category;
        } else {
            localStorage.removeItem(CATEGORY);
            Session._category = null;
        }
    }
    public static selectLore(): void { Session.selectCategory(KB_Category.LORE); }
    public static selectRules(): void { Session.selectCategory(KB_Category.RULES); }
    public static selectJournal(): void { Session.selectCategory(KB_Category.JOURNAL); }
    public static selectTools(): void { Session.selectCategory(KB_Category.TOOLS); }
    public static unselectCategory(): void { Session.selectCategory(null); }

    /**
     * Load the Session from localStorage and set all properties
     */
    public static active(): void {
        Session.activeCategory();
    }

    private static activeCategory(): void {
        const category: string | null = localStorage.getItem(CATEGORY);
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