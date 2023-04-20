import {DIV, H, HR, IMG, SECTION} from "./utils.js";
import {markdownToHTML} from "./obsidian.js";

export interface EntryData {
    id: string,
    title: string,
    last: number,
    last_readable: string
}

export enum EntryType {
    MD = 'markdown',
    HTML = 'html',
    OTHER = 'other'
}

export class Entry {

    public readonly content: string;
    public readonly timestamp: string | null;

    public constructor(public readonly title: string,
                       public readonly id: string,
                       private readonly entryType: EntryType,
                       content: string,
                       last?: number) {
        this.content = this.formatContent(content);
        this.timestamp = last ? this.formatTime(last) : null;
    }

    private formatContent(content: string): string {
        const formatObsidian = (md: string): string => markdownToHTML(md);
        const formatHTML = (html: string): string => {
            return html;
        }

        if (this.entryType === EntryType.MD) return formatObsidian(content);
        else if (this.entryType === EntryType.HTML) return formatHTML(content);
        else return content;
    }

    private formatTime(time: number): string {
        return time.toString();
    }

    public toHTML(): HTMLElement {
        const entry: HTMLElement = SECTION()
        entry.classList.add('entry')

        const entryHeader: HTMLElement = DIV();
        entryHeader.classList.add('entry-header', 'flex-row', 'jc-between', 'ai-center', 'full-width');
        const heading: HTMLElement = H(1);
        heading.textContent = this.title;
        const closeIcon: HTMLElement = IMG('./src/asset/icon/x.svg');
        closeIcon.classList.add('pointer');
        closeIcon.setAttribute('alt', "Eintrag schließen");
        closeIcon.onclick = (): void => entry.remove();
        entryHeader.append(heading, closeIcon);

        const hr: HTMLElement = HR();
        const entryContent: HTMLElement = DIV();
        entryContent.classList.add('entry-content')
        entryContent.innerHTML = this.content;

        entry.append(entryHeader, hr, entryContent);
        return entry;
    }
}