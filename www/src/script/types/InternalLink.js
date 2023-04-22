import { A } from "./utils.js";
import { KB_Category } from "./types.js";
export default class InternalLink {
    constructor(text, relpath, category) {
        this.text = text;
        this.relpath = relpath;
        this.category = category;
        this.fullLink = () => {
            let link = './';
            switch (this.category) {
                case KB_Category.JOURNAL:
                    link += 'kb/Journal/';
                    break;
                case KB_Category.LORE:
                    link += 'kb/Legende/';
                    break;
                case KB_Category.RULES:
                    link += 'kb/Regeln/';
                    break;
                case KB_Category.TOOLS:
                    link += 'tools/';
                    break;
            }
            return link + this.relpath;
        };
    }
    toString() {
        return `InternalLink(text: "${this.text}", relpath: "${this.relpath}", category: "${this.category}")`;
    }
    toJSON() {
        return { text: this.text, relpath: this.relpath, category: this.category };
    }
    toHTML() {
        const link = A(this.fullLink());
        link.classList.add('internal-link');
        link.textContent = this.text;
        return link;
    }
}
//# sourceMappingURL=InternalLink.js.map