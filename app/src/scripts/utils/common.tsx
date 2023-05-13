import React from "react";

/* HTML IDS */
const LEFT_ROOT = 'left-root';
const CENTER_ROOT = 'center-root';
const RIGHT_ROOT = 'right-root';
export {LEFT_ROOT, CENTER_ROOT, RIGHT_ROOT}

const SELECTED = 'selected';
const OPEN = 'open';
const CATEGORY = 'category';
const CATEGORIES = 'categories';

enum Category {
    LORE = 'lore',
    JOURNAL = 'journal',
    RULES = 'rules',
    TOOLS = 'tools'
}

const CategoryTitleMap: Map<Category, string> = new Map<Category, string>([
    [Category.LORE, 'Legende'],
    [Category.JOURNAL, 'Journal'],
    [Category.RULES, 'Regeln'],
    [Category.TOOLS, 'Werkzeuge']
]);

export {SELECTED, OPEN, CATEGORY, CATEGORIES, Category, CategoryTitleMap}