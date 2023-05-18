import React, {FunctionComponent, ReactNode} from "react";
import Link, {LinkProps} from "./Link";
import {firstLetter} from "../utils/utils";
import {Category} from "../utils/common";

const LEFT_LINKS_CONTAINER = 'left-links-container';
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

const LeftLinks: FunctionComponent<LeftLinksProps> = ({title, links}: LeftLinksProps) =>
    <div id={LEFT_LINKS_CONTAINER}>
        <h3>{title}</h3>
        <ul id={LEFT_LINKS}>{renderLinks(links)}</ul>
    </div>
export default LeftLinks;