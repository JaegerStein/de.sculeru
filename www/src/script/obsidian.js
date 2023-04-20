function markdownToHTML(md) {
    return formatObsidianLinks(marked.parse(md));
}
function formatObsidianLinks(text) {
    const linkRegex = /\[\[(.+?)]]/g;
    const linkWithTitleRegex = /\[\[(.+?)\|(.+?)]]/g;
    function linkToPath(link) {
        const trimmedLink = link.trim();
        const pipeIndex = trimmedLink.indexOf('|');
        const filename = pipeIndex > -1 ? trimmedLink.substring(0, pipeIndex) : trimmedLink;
        return `${filename}.md`;
    }
    const formattedText = text.replace(linkWithTitleRegex, (match, link, title) => {
        const path = linkToPath(link);
        return `<a href="./${path}">${title}</a>`;
    });
    return formattedText.replace(linkRegex, (match, link) => {
        const path = linkToPath(link);
        return `<a href="./${path}">${link}</a>`;
    });
}
export { markdownToHTML };
//# sourceMappingURL=obsidian.js.map