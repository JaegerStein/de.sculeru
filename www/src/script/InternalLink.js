import { A } from "./utils.js";
export default class InternalLink {
    constructor(filepath) {
        this.filepath = filepath;
    }
    toHTML() {
        const link = A(this.filepath);
        return link;
    }
}
//# sourceMappingURL=InternalLink.js.map