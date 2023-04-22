import Session from "./Session.js";
import InternalLink from "./types/InternalLink.js";
function markdownToHTML(md) {
    return formatObsidianLinks(marked.parse(md));
}
function formatObsidianLinks(text) {
    let formatted = text;
    const regex = /\[\[([\w\s]+)\|?([\w\s]*)]]/g;
    let match = regex.exec(text);
    while (match) {
        const link = match[1];
        const content = match[2] || link;
        const kbEntry = Session.getEntry(link);
        let replace;
        if (kbEntry) {
            const internalLink = InternalLink.fromKBEntry(kbEntry);
            internalLink.text = content;
            replace = internalLink.toHTML().outerHTML;
        }
        else
            replace = content;
        formatted = formatted.replace(match[0], replace);
        match = regex.exec(text);
    }
    return formatted;
}
export { markdownToHTML };
//# sourceMappingURL=obsidian.js.map