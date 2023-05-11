import React from "react";

const SELECTED = 'selected';
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

export {SELECTED, CATEGORY, CATEGORIES, Category, CategoryTitleMap}