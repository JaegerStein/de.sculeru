import {A} from "../common/utils.js";
import {KB_Category, KB_Entry, KB_EntryType} from "./types.js";
import {EXTERNAL_LINK, INTERNAL_LINK} from "../common/common.js";

/** Represents an internal link to a knowledge base entry */
export default class Link {

    /**
     * Creates a new InternalLink instance
     * @param text - The text content of the link element.
     * @param identifier - The key string of the corresponding entry, usually same as text
     * @param relpath - The relative path to the entry in its category.
     * @param category - The knowledge base category.
     * @param external - Whether this link behaves as an external link (target="_blank")
     */
    public constructor(public text: string,
                       private readonly relpath: string,
                       private readonly category: KB_Category,
                       private readonly identifier: string = text,
                       private readonly external: boolean = false) {}

    public static fromKBEntry(entry: KB_Entry): Link {
        return new Link(entry.title,
            entry.id,
            entry.category as KB_Category,
            entry.title,
            entry.type === KB_EntryType.HTML);
    }

    /**
     * Returns a string representation of this InternalLink instance.
     * @returns A String that includes the text, relative path, and category of this instance.
     */
    public toString(): string {
        return `InternalLink(
        text: "${this.text}",
        relpath: "${this.relpath}",
        category: "${this.category}",
        identifier: "${this.identifier}",
        external: "${this.external}"
        )`;
    }

    /**
     * Returns an HTML representation of this link. The full path is automatically resolved from the relative path
     * and the category.
     * @returns This link as an HTMLElement
     */
    public toHTML(): HTMLElement {
        const link: HTMLElement = A('./' + this.relpath);
        link.classList.add(this.external ? EXTERNAL_LINK : INTERNAL_LINK);
        link.textContent = this.text;
        link.setAttribute('data-entry', this.identifier)
        if (this.external) link.setAttribute('target', '_blank');
        return link;
    }
}