/**
 * Converts a string of Markdown text into HTML using the marked.js library
 * @param md The obsidian Markdown string
 * @returns The obsidian Markdown formatted into an HTML string
 */
function markdownToHTML(md: string): string {
    // @ts-ignore marked is imported in index.html
    return formatObsidianLinks(marked.parse(md));
}

/**
 * Formats obsidian links in the given text into HTML-Links
 * @param text The text to format
 * @returns The given text with obsidian links formatted as HTML links
 */
function formatObsidianLinks(text: string): string {
    const linkRegex = /\[\[(.+?)]]/g;
    const linkWithTitleRegex = /\[\[(.+?)\|(.+?)]]/g;

    function linkToPath(link: string): string {
        const trimmedLink: string = link.trim();
        const pipeIndex: number = trimmedLink.indexOf('|');

        const filename: string = pipeIndex > -1 ? trimmedLink.substring(0, pipeIndex) : trimmedLink;
        return `${filename}.md`;
    }

    const formattedText: string = text.replace(linkWithTitleRegex,
        (match: string, link: string, title: string): string => {
            const path = linkToPath(link);
            return `<a href="./${path}">${title}</a>`
        });

    return formattedText.replace(linkRegex, (match: string, link: string): string => {
        const path = linkToPath(link);
        return `<a href="./${path}">${link}</a>`;
    });

}

export {markdownToHTML};