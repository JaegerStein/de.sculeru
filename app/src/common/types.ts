import {Category} from "./common";

interface IndexEntry {
    id: string,
    title: string,
    category: Category,
    last: number,
    type: string,
}

export type {IndexEntry}

type HTMLElementList = NodeListOf<HTMLElement>;
export type {HTMLElementList}