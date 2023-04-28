import Session from "./Session.js";
import InternalLink from "./types/InternalLink.js";
function markdownToHTML(md) {
    return formatObsidianLinks(marked.parse(md));
}
function resolveEmbeddedImage(text) {
    const regex = /!\[\[(.*?)]]/g;
    const regexWithWidth = /!\[\[(.*?)\|(.*?)]]/g;
    const srcPrefix = './kb/!attachments/';
    let format = text;
    format = format.replace(regexWithWidth, (_match, src, width) => `<img src="${srcPrefix}${src}" width="${width}" alt="${src}">`);
    format = format.replace(regex, (_match, src) => `<img src="${srcPrefix}${src}" alt="${src}">`);
    return format;
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
    return resolveEmbeddedImage(formatted);
}
export { markdownToHTML };
//# sourceMappingURL=obsidian.js.map