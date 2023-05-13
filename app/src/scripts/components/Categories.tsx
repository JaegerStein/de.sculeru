import React from "react";
/* ICONS */
import {ReactComponent as LoreIcon} from "../../assets/images/lore.svg";
import {ReactComponent as JournalIcon} from "../../assets/images/journal.svg";
import {ReactComponent as RulesIcon} from "../../assets/images/rules.svg";
import {ReactComponent as ToolsIcon} from "../../assets/images/tools.svg";
/* UTILS*/
import {CATEGORIES, CATEGORY, Category} from "../utils/common";

const CATEGORIES_CLASSNAME = 'full-width grid';

const Categories: React.FC = () => {
    return (
        <div id={CATEGORIES} className={CATEGORIES_CLASSNAME}>
            <LoreIcon id={Category.LORE} className={CATEGORY}/>
            <JournalIcon id={Category.JOURNAL} className={CATEGORY}/>
            <RulesIcon id={Category.RULES} className={CATEGORY}/>
            <ToolsIcon id={Category.TOOLS} className={CATEGORY}/>
        </div>
    );
}

export default Categories;