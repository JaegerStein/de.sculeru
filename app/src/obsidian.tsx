import {marked} from "marked";
import Session from "./common/Session";
import {IndexEntry} from "./common/types";
import Link from "./components/Link";
import {renderToString} from "react-dom/server";

/**
 * Resolves embedded images in the given obsidian .md text
 * @param text - The text to resolve embedded images in
 * @returns The given text with embedded images resolved
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

/**
 * Formats obsidian links in the given text into HTML-Links
 * @param text - The text to format
 * @returns The given text with obsidian links formatted as HTML links
 */
function formatObsidianLinks(text: string): string {
    let formatted: string = text;

    const regex = /\[\[([\w\s]+)\|?([\w\s]*)]]/g;
    let match: RegExpExecArray | null = regex.exec(text);
    while (match) {
        const link: string = match[1];
        const content: string = match[2] || link;
        const kbEntry: IndexEntry | null = Session.entry(link);
        let replace: string;
        if (kbEntry) {
            const link =
                <Link href={kbEntry.title} category={kbEntry.category}>
                    {content}
                </Link>;
            replace = renderToString(link);
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
const markdownToHTML = (md: string): string => formatObsidianLinks(marked.parse(md));
export default markdownToHTML;