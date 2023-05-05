import React from "react";
import {ReactComponent as X} from "../assets/images/x.svg";
import {ReactComponent as Lore} from "../assets/images/lore.svg";
import {ReactComponent as Journal} from "../assets/images/journal.svg";
import {ReactComponent as Rules} from "../assets/images/rules.svg";
import {ReactComponent as Tools} from "../assets/images/tools.svg";

const SELECTED = 'selected';
const CATEGORY = 'category';
const CATEGORIES = 'categories';

enum Category {
    LORE = 'lore',
    JOURNAL = 'journal',
    RULES = 'rules',
    TOOLS = 'tools'
}

export {SELECTED, CATEGORY, CATEGORIES, Category}

const CloseIcon: React.FC = () => <X/>
const LoreIcon: React.FC = () => <Lore/>
const JournalIcon: React.FC = () => <Journal/>
const RulesIcon: React.FC = () => <Rules/>
const ToolsIcon: React.FC = () => <Tools/>

export {CloseIcon, LoreIcon, JournalIcon, RulesIcon, ToolsIcon}