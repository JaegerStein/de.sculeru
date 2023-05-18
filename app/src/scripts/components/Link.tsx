import {Category} from "../utils/common";
import React, {ReactNode} from "react";
import {open} from "../app/App";
import Session from "../utils/Session";

interface LinkProps {
    href: string
    category: Category,
    timestamp?: number
    children?: ReactNode
}

const Link: React.FC<LinkProps> = ({href, category, children}: LinkProps) => {

    const openEntry = (event: React.MouseEvent): void => {
        event.preventDefault();
        if (category === Category.TOOLS) {
            const url: string | null = Session.entry(href)?.id ?? null;
            if (url) window.open(url, "_blank")?.focus();
        } else open(href);
    }

    return (
        <a
            href={href}
            className={category + "-link left-link"}
            onClick={openEntry}
            onAuxClick={openEntry} // TODO rework with routing to allow for multiple tabs
            key={'link-' + href}
        >
            {children}
        </a>
    );
}

export default Link;
export type {LinkProps};