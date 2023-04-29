enum KB_Category {
    LORE = 'lore',
    JOURNAL = 'journal',
    RULES = 'rules',
    TOOLS = 'tools'
}

interface KB_Entry {
    id: string,
    title: string,
    last: number,
    category: string,
    type: KB_EntryType
}

type KB_Index = KB_Entry[];

enum KB_EntryType {
    MD = 'markdown',
    HTML = 'html',
    CANVAS = 'canvas',
    OTHER = 'other'
}

export {KB_Category, KB_Entry, KB_Index, KB_EntryType}