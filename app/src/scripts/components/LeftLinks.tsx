import React, {FunctionComponent, ReactNode} from "react";
/* COMPONENTS */
import Link, {LinkProps} from "./Link";
/* ICONS */
import {ReactComponent as ByDateIcon} from "../../assets/images/calendar.svg";
import {ReactComponent as AlphabeticallyIcon} from "../../assets/images/a-z.svg";
/* UTILS */
import {firstLetter} from "../utils/utils";


const LEFT_LINKS_CONTAINER = 'left-links-container';
const LEFT_LINKS_SORTER = 'left-links-sorter';
const LEFT_LINKS = 'left-links';

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

const LeftLinks: FunctionComponent<LeftLinksProps> = ({title, links}: LeftLinksProps) => {

    return (
        <div id={LEFT_LINKS_CONTAINER}>
            <div id={LEFT_LINKS_SORTER}>
                <h3>{title}</h3>
                <div className="wrapper">
                    <button>A-Z</button>
                    <button>Datum</button>
                </div>
            </div>
            <ul id={LEFT_LINKS}>{renderLinks(links)}</ul>
        </div>
    );
}

export default LeftLinks;