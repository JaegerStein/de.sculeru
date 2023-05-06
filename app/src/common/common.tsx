import React from "react";
import {ReactComponent as X} from "../assets/images/x.svg";

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

const CloseIcon: React.FC = () => <X/>
export {CloseIcon}