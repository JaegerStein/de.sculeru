import {Category} from "../common/common";
import React, {ReactNode} from "react";
import {open} from "../App";
import Session from "../common/Session";

type LinkProps = {
    href: string
    category: Category,
    children?: ReactNode
}


const Link: React.FC<LinkProps> = ({href, category, children}: LinkProps) => {

    const openEntry = (event: React.MouseEvent): void => {
        event.preventDefault();
        if (category === Category.TOOLS) {
            const url = Session.entry(href)?.id ?? null;
            if (url) window.open(url, "_blank")?.focus();
        } else open(href);
    }

    return (
        <a
            href={href}
            className={category + "-link left-link"}
            onClick={openEntry}
            key={'link-' + href}
        >
            {children}
        </a>
    );
}

export default Link;
export type {LinkProps};