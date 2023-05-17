import React, {Dispatch, SetStateAction, useState} from "react";
/* ICONS */
import {ReactComponent as LoreIcon} from "../../assets/images/lore.svg";
import {ReactComponent as JournalIcon} from "../../assets/images/journal.svg";
import {ReactComponent as RulesIcon} from "../../assets/images/rules.svg";
import {ReactComponent as ToolsIcon} from "../../assets/images/tools.svg";
/* UTILS*/
import {CATEGORIES, CATEGORY, Category} from "../utils/common";
import Session from "../utils/Session";

const CATEGORIES_CLASSNAME = 'full-width grid';

const LORE = Category.LORE;
const JOUR = Category.JOURNAL;
const RULE = Category.RULES;
const TOOL = Category.TOOLS;

type Selected = Category | null;
type SetSelected = Dispatch<SetStateAction<Selected>>;

export interface CategoryProps {onClick: (icon: Category) => void;}

const Categories: React.FC<CategoryProps> = ({onClick}: CategoryProps) => {
    const [selected, setSelected]: [Selected, SetSelected] = useState<Category | null>(Session.category);
    function handleClick(icon: Category): void {
        setSelected(icon);
        Session.category = icon;
        onClick(icon);
    }

    return (
        <div id={CATEGORIES} className={CATEGORIES_CLASSNAME}>
            <LoreIcon
                id={LORE}
                className={`${CATEGORY} ${selected === LORE ? 'selected' : ''}`}
                onClick={() => handleClick(LORE)}
            />
            <JournalIcon
                id={JOUR}
                className={`${CATEGORY} ${selected === JOUR ? 'selected' : ''}`}
                onClick={() => handleClick(JOUR)}
            />
            <RulesIcon
                id={RULE}
                className={`${CATEGORY} ${selected === RULE ? 'selected' : ''}`}
                onClick={() => handleClick(RULE)}
            />
            <ToolsIcon
                id={TOOL}
                className={`${CATEGORY} ${selected === TOOL ? 'selected' : ''}`}
                onClick={() => handleClick(TOOL)}
            />
        </div>
    );
}

export default Categories;