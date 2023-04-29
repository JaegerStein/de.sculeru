import Session from "./Session.js";
import Link from "./types/Link.js";
import {KB_Entry} from "./types/types.js";

/**
 * Converts a string of Markdown text into HTML using the marked.js library
 * @param md The obsidian Markdown string
 * @returns The obsidian Markdown formatted into an HTML string
 */
function markdownToHTML(md: string): string {
    // @ts-ignore marked is imported in index.html
    return formatObsidianLinks(marked.parse(md));
}

function resolveEmbeddedImage(text: string): string {
    const regex = /!\[\[(.*?)]]/g;
    const regexWithWidth = /!\[\[(.*?)\|(.*?)]]/g;
    const srcPrefix = './kb/!attachments/';

    let format: string = text;

    format = format.replace(regexWithWidth, (_match, src, width) =>
        `<img src="${srcPrefix}${src}" width="${width}" alt="${src}">`);

    format = format.replace(regex, (_match, src) =>
        `<img src="${srcPrefix}${src}" alt="${src}">`);

    return format;
}

/**
 * Formats obsidian links in the given text into HTML-Links
 * @param text The text to format
 * @returns The given text with obsidian links formatted as HTML links
 */
function formatObsidianLinks(text: string): string {
    let formatted: string = text;

    const regex = /\[\[([\w\s]+)\|?([\w\s]*)]]/g;
    let match: RegExpExecArray | null = regex.exec(text);
    while (match) {
        const link: string = match[1];
        const content: string = match[2] || link;
        const kbEntry: KB_Entry | null = Session.getEntry(link);
        let replace: string;
        if (kbEntry) {
            const internalLink: Link = Link.fromKBEntry(kbEntry);
            internalLink.text = content;
            replace = internalLink.toHTML().outerHTML;
        } else replace = content;
        formatted = formatted.replace(match[0], replace);
        match = regex.exec(text);
    }
    return resolveEmbeddedImage(formatted);
}

export {markdownToHTML};