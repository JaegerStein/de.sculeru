import { A } from "../common/utils.js";
import { KB_EntryType } from "./types.js";
import { EXTERNAL_LINK, INTERNAL_LINK } from "../common/common.js";
export default class Link {
    constructor(text, relpath, category, identifier = text, external = false) {
        this.text = text;
        this.relpath = relpath;
        this.category = category;
        this.identifier = identifier;
        this.external = external;
    }
    static fromKBEntry(entry) {
        return new Link(entry.title, entry.id, entry.category, entry.title, entry.type === KB_EntryType.HTML);
    }
    toString() {
        return `InternalLink(
        text: "${this.text}",
        relpath: "${this.relpath}",
        category: "${this.category}",
        identifier: "${this.identifier}",
        external: "${this.external}"
        )`;
    }
    toHTML() {
        const link = A('./' + this.relpath);
        link.classList.add(this.external ? EXTERNAL_LINK : INTERNAL_LINK);
        link.textContent = this.text;
        link.setAttribute('data-entry', this.identifier);
        if (this.external)
            link.setAttribute('target', '_blank');
        return link;
    }
}
//# sourceMappingURL=Link.js.map