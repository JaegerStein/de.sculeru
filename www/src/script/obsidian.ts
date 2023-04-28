import Session from "./Session.js";
import InternalLink from "./types/InternalLink.js";

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
    let formatted = text;

    const regex = /\[\[([\w\s]+)\|?([\w\s]*)]]/g;
    let match = regex.exec(text);
    while (match) {
        const link = match[1];
        const content = match[2] || link;
        const kbEntry = Session.getEntry(link);
        let replace: string;
        if (kbEntry) {
            const internalLink = InternalLink.fromKBEntry(kbEntry);
            internalLink.text = content;
            replace = internalLink.toHTML().outerHTML;
        } else replace = content;
        formatted = formatted.replace(match[0], replace);
        match = regex.exec(text);
    }
    return formatted;
}

export {markdownToHTML};