import { DIV, H, HR, IMG } from "./utils.js";
export var EntryType;
(function (EntryType) {
    EntryType["MD"] = "markdown";
    EntryType["HTML"] = "html";
    EntryType["OTHER"] = "other";
})(EntryType || (EntryType = {}));
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
            let mark = marked.parse(md);
            mark = mark.replace(/\[\[|]]/g, '');
            console.log(mark.includes('[['));
            return mark;
        };
        const formatHTML = (html) => {
            return html;
        };
        if (this.entryType === EntryType.MD)
            return formatObsidian(content);
        else if (this.entryType === EntryType.HTML)
            return formatHTML(content);
        else
            return content;
    }
    formatTime(time) {
        return time.toString();
    }
    toHTML() {
        const entry = DIV();
        entry.classList.add('entry');
        const entryHeader = DIV();
        entryHeader.classList.add('entry-header', 'flex-row', 'jc-between', 'ai-center', 'full-width');
        const heading = H(1);
        heading.textContent = this.title;
        const closeIcon = IMG('./src/asset/icon/x.svg');
        closeIcon.classList.add('pointer');
        closeIcon.setAttribute('alt', "Eintrag schließen");
        closeIcon.onclick = () => entry.remove();
        entryHeader.append(heading, closeIcon);
        const hr = HR();
        const entryContent = DIV();
        entryContent.classList.add('entry-content');
        entryContent.innerHTML = this.content;
        entry.append(entryHeader, hr, entryContent);
        return entry;
    }
}
//# sourceMappingURL=Entry.js.map