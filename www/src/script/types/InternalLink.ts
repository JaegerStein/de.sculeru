import {A} from "../utils.js";
import {KB_Category, KB_Entry} from "./types.js";

/** Represents an internal link to a knowledge base entry */
export default class InternalLink {

    /**
     * Creates a new InternalLink instance
     * @param text - The text content of the link element.
     * @param relpath - The relative path to the entry in its category.
     * @param category - The knowledge base category.
     */
    public constructor(private readonly text: string,
                       private readonly relpath: string,
                       private readonly category: KB_Category) {}

    public static fromKBEntry(entry: KB_Entry): InternalLink {
        return new InternalLink(entry.title, entry.id, entry.category as KB_Category);
    }

    /**
     * Returns a string representation of this InternalLink instance.
     * @returns A String that includes the text, relative path, and category of this instance.
     */
    public toString(): string {
        return `InternalLink(text: "${this.text}", relpath: "${this.relpath}", category: "${this.category}")`;
    }

    /**
     * Returns a JSON representation of this InternalLink instance.
     * @returns An object with the text, relpath, and category properties.
     */
    public toJSON(): { text: string, relpath: string, category: KB_Category } {
        return {text: this.text, relpath: this.relpath, category: this.category};
    }

    /**
     * Returns an HTML representation of this link. The full path is automatically resolved from the relative path
     * and the category.
     * @returns This link as an HTMLElement
     */
    public toHTML(): HTMLElement {
        const link: HTMLElement = A('./' + this.relpath);
        link.classList.add('internal-link');
        link.textContent = this.text;
        return link;
    }
}