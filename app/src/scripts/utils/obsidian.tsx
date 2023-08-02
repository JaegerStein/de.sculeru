import {marked} from "marked";
import Session from "./Session";
import {IndexEntry} from "./types";
import {A, hashId} from "./utils";

/**
 * A custom renderer for the marked.js library that adds IDs to headings
 */
class HeadingRenderer extends marked.Renderer {
    heading(text: string, level: number, raw: string): string {
        const id = hashId(raw);
        return `<h${level} id="${id}">${text}</h${level}>`;
    }
}

marked.use({breaks: true, headerIds: false, mangle: false});
marked.setOptions({renderer: new HeadingRenderer()});

function removeFrontmatter(text: string): string {
    const regex = /---\n(.*\n)*---\n/;
    return text.replace(regex, '');
}

/**
 * Resolves embedded images in the given text into HTML-Images using the !attachment folder
 * @param text The text to format
 * @returns The given text with embedded images formatted as HTML images
 */
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

// still broken TODO
function formatObsidianTags(text: string): string {
    let replace: string = text;
    const tags: RegExpMatchArray | null = replace.match(/(?<!\S)#\w+/g);
    if (!tags) return text;
    for (let tag of tags) {
        const tagData: string = tag.replace('#', '');
        const tagText = tagData.replace(/_/g, ' ');
        replace = replace.replace(tag, `<span class="tag" data-tag="${tagData}">${tagText}</span>`);
    }
    return replace;
}

/**
 * Formats obsidian links in the given text into HTML-Links
 * @param text The text to format
 * @returns The given text with obsidian links formatted as HTML links
 */
function formatObsidianLinks(text: string): string {
    let formatted: string = text;

    const regex = /\[\[([a-zA-ZäöüÄÖÜß0-9\s]+)\|?([a-zA-ZäöüÄÖÜß0-9\s]*)]]/g;

    let match: RegExpExecArray | null = regex.exec(text);
    while (match) {
        const link: string = match[1];
        const content: string = match[2] || link;
        const indexEntry: IndexEntry | null = Session.entry(link);
        let replace: string;
        if (indexEntry) {
            const internalLink = A({href: indexEntry.title, text: content});
            internalLink.text = content;
            internalLink.className = indexEntry.category + '-link entry-link';
            replace = internalLink.outerHTML;
        } else replace = content;
        formatted = formatted.replace(match[0], replace);
        match = regex.exec(text);
    }
    return resolveEmbeddedImage(formatted);
}

/**
 * Converts a string of Markdown text into HTML using the marked.js library
 * @param md The obsidian Markdown string
 * @returns The obsidian Markdown formatted into an HTML string
 */
const markdownToHTML = (md: string): string => {
    const out: string = formatObsidianTags(formatObsidianLinks(marked.parse(md)));
    return out ? out : "<p>Dieser Eintrag enthält bisher noch keinen Text.</p>";
}
export default markdownToHTML;