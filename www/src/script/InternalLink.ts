import {A} from "./utils.js";

export default class InternalLink {

    public constructor(private readonly filepath: string) {}

    public toHTML(): HTMLElement {
        const link: HTMLElement = A(this.filepath);

        return link;
    }
}