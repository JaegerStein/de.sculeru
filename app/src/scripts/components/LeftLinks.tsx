import React, {FunctionComponent, ReactNode} from "react";
import Link, {LinkProps} from "./Link";
import {firstLetter} from "../utils/utils";

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

interface LeftLinksProps {links: LinkProps[]}

const LeftLinks: FunctionComponent<LeftLinksProps> = ({links}: LeftLinksProps) =>
    <ul id={LEFT_LINKS}>{renderLinks(links)}</ul>
export default LeftLinks;