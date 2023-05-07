import {Category} from "../common/common";
import React from "react";
import {open} from "../App";
import Session from "../common/Session";

type LinkProperties = {
    href: string
    category: Category,
    children?: React.ReactNode
}

const openEntry = (event: React.MouseEvent, shorthand: string): void => {
    event.preventDefault();
    open(shorthand);
}

const Link: React.FC<LinkProperties> = (properties: LinkProperties) =>
    <a href={properties.href} className={properties.category + "-link left-link"}
       onClick={(event: React.MouseEvent) => openEntry(event, properties.href)}>
        {properties.children}
    </a>

export default Link;
export type {LinkProperties};