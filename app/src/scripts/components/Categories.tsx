import React, {ComponentType, Dispatch, FunctionComponent, ReactNode, SetStateAction, useState} from "react";
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

const Categories: FunctionComponent<CategoryProps> = ({onClick}: CategoryProps) => {
    const [selected, setSelected]: [Selected, SetSelected] = useState<Category | null>(Session.category);

    function handleClick(icon: Category): void {
        // sets the new state of the selected category
        setSelected(icon);
        // notifies the Session of the change
        Session.category = icon;
        // calls the parent's onClick function
        onClick(icon);
    }

    const className = (icon: Category): string => `${CATEGORY} ${selected === icon ? 'selected' : ''}`;
    const icon = (Icon: ComponentType<any>, c: Category): ReactNode =>
        <Icon id={c} className={className(c)} onClick={() => handleClick(c)}/>;

    return (
        <div id={CATEGORIES} className={CATEGORIES_CLASSNAME}>
            {icon(LoreIcon, LORE)}
            {icon(JournalIcon, JOUR)}
            {icon(RulesIcon, RULE)}
            {icon(ToolsIcon, TOOL)}
        </div>
    );
}

export default Categories;