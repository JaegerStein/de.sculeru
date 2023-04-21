enum KB_Category {
    LORE = 'lore',
    RULES = 'rules',
    JOURNAL = 'journal',
    TOOLS = 'tools'
}

interface KB_Entry {
    id: string,
    title: string,
    last: number,
    last_readable: string
}

type KB_Index = KB_Entry[];

enum KB_EntryType {
    MD = 'markdown',
    HTML = 'html',
    OTHER = 'other'
}

export {KB_Category, KB_Entry, KB_Index, KB_EntryType}