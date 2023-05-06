import {Category} from "../common/common";
import React, {useEffect} from "react";

type LinkProperties = {
    href: string
    category: Category,
    children?: React.ReactNode
}

const Link: React.FC<LinkProperties> = (properties: LinkProperties) =>
    <a href={properties.href} className={properties.category + "-link"}>
        {properties.children}
    </a>

export default Link;
export type {LinkProperties};