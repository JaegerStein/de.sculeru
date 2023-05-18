import React, {Dispatch, FunctionComponent, ReactNode, SetStateAction, useEffect, useState} from "react";
/* COMPONENTS */
import Link, {LinkProps} from "./Link";
/* ICONS */
import {ReactComponent as ByDateIcon} from "../../assets/images/calendar.svg";
import {ReactComponent as AlphabeticallyIcon} from "../../assets/images/a-z.svg";
/* UTILS */
import {firstLetter} from "../utils/utils";
import Session from "../utils/Session";
import {SELECTED} from "../utils/common";


const LEFT_LINKS_CONTAINER = 'left-links-container';
const LEFT_LINKS_SORTER = 'left-links-sorter';
const LEFT_LINKS = 'left-links';

const ALPHA_SORT = 'alpha-sort';
const DATE_SORT = 'date-sort';

function renderLinks(links: LinkProps[]): ReactNode[] {
    const render: ReactNode[] = [];
    let previous = "";

    links.forEach((link: LinkProps) => {
        const current: string = firstLetter(link.href);
        if (current !== previous)
            render.push(<li key={'li-alpha-sort-' + current} className="li-alpha-sort">{current}</li>);
        previous = current;
        render.push(<li key={'li-link-' + link.href}><Link {...link}/></li>);
    });

    return render;
}

interface LeftLinksProps {
    title: string
    links: LinkProps[],
}

type SetSelectedSorter = Dispatch<SetStateAction<string>>;

const LeftLinks: FunctionComponent<LeftLinksProps> = ({title, links}: LeftLinksProps) => {
    const [selectedSorter, setSelectedSorter]: [string, SetSelectedSorter] = useState<string>(Session.sorter);
    useEffect((): void => {Session.sorter = selectedSorter;}, [selectedSorter]);

    const renderButton = (text: string, id: string): ReactNode =>
        <button
            id={id}
            className={selectedSorter === id ? SELECTED : ''}
            onClick={() => setSelectedSorter(id)}
        >{text}
        </button>

    return (
        <div id={LEFT_LINKS_CONTAINER}>
            <div id={LEFT_LINKS_SORTER}>
                <h3>{title}</h3>
                <div className="wrapper">
                    {renderButton("A-Z", ALPHA_SORT)}
                    {renderButton("Zuletzt", DATE_SORT)}
                </div>
            </div>
            <ul id={LEFT_LINKS}>{renderLinks(links)}</ul>
        </div>
    );
}

export default LeftLinks;