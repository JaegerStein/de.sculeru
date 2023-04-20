export enum Category {
    LORE = 'lore',
    RULES = 'rules',
    JOURNAL = 'journal',
    TOOLS = 'tools'
}

const CATEGORY = 'category';

export default abstract class Session {

    private static _category: Category | null = null; // saves the currently selected category
    private static _kbIndex: Map<Category, string> = new Map<Category, string>();

    /**
     * Returns the currently selected category
     *
     * @static
     * @returns {(string | null)}The selected category of the knowledgebase as a string, or null if none is selected
     */
    public static get category(): string | null { return this._category; }
    public static get categoryIndices(): Map<Category, string> { return Session._kbIndex }
    public static categoryIndex(category: Category): string | undefined { return Session._kbIndex.get(category); }

    private static selectCategory(category: Category | null): void {
        if (category) {
            localStorage.setItem(CATEGORY, category);
            Session._category = category;
        } else {
            localStorage.removeItem(CATEGORY);
            Session._category = null;
        }
    }
    public static selectLore(): void { Session.selectCategory(Category.LORE); }
    public static selectRules(): void { Session.selectCategory(Category.RULES); }
    public static selectJournal(): void { Session.selectCategory(Category.JOURNAL); }
    public static selectTools(): void { Session.selectCategory(Category.TOOLS); }
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