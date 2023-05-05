import {Category} from "../common/common";
import React from "react";

type LinkProperties = {
    text: string,
    entryID: string,
    category: Category,
    href: string
}

const Link: React.FC<LinkProperties> = (properties: LinkProperties) => {
    return <a></a>
}

export default Link;