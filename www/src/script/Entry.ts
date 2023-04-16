export interface EntryData {
    id: string,
    title: string,
    last: number,
    last_readable: string
}

export type EntryType = 'markdown' | 'html';

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
        const formatObsidian = (md: string): string => {
            return md;
        }

        const formatHTML = (html: string): string => {
            return html;
        }

        return this.entryType === 'markdown' ? formatObsidian(content) : formatHTML(content);
    }

    private formatTime(time: number): string {
        return time.toString();
    }
}