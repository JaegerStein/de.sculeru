import { A } from "../common/utils.js";
export default class InternalLink {
    constructor(text, relpath, category, identifier = text) {
        this.text = text;
        this.relpath = relpath;
        this.category = category;
        this.identifier = identifier;
    }
    static fromKBEntry(entry) {
        return new InternalLink(entry.title, entry.id, entry.category);
    }
    toString() {
        return `InternalLink(text: "${this.text}", relpath: "${this.relpath}", category: "${this.category}")`;
    }
    toJSON() {
        return { text: this.text, relpath: this.relpath, category: this.category };
    }
    toHTML() {
        const link = A('./' + this.relpath);
        link.classList.add('internal-link');
        link.textContent = this.text;
        link.setAttribute('data-entry', this.identifier);
        return link;
    }
}
//# sourceMappingURL=InternalLink.js.map