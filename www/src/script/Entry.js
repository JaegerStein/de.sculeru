export class Entry {
    constructor(title, id, entryType, content, last) {
        this.title = title;
        this.id = id;
        this.entryType = entryType;
        this.content = this.formatContent(content);
        this.timestamp = last ? this.formatTime(last) : null;
    }
    formatContent(content) {
        const formatObsidian = (md) => {
            return md;
        };
        const formatHTML = (html) => {
            return html;
        };
        return this.entryType === 'markdown' ? formatObsidian(content) : formatHTML(content);
    }
    formatTime(time) {
        return time.toString();
    }
}
//# sourceMappingURL=Entry.js.map