const INDEX_PATH = './kb_index.json';
async function loadInternalURL(url) {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error(`Failed to load internal URL: ${url}`);
    return await response.text();
}
async function loadIndex() {
    const response = await fetch(INDEX_PATH);
    if (!response.ok)
        throw new Error(`Failed to load knowledge base index`);
    return await response.json();
}
async function lastIndexModified() {
    try {
        const response = await fetch(INDEX_PATH, { method: 'HEAD' });
        if (response.ok) {
            const lm = response.headers.get('Last-Modified');
            if (!lm)
                return null;
            return Math.floor(Date.parse(lm) / 1000);
        }
        else
            return null;
    }
    catch (error) {
        console.error(`An error occurred reading the last-modified timestamp of the knowledge base index: ${error}`);
        return null;
    }
}
export { loadInternalURL, loadIndex, lastIndexModified };
//# sourceMappingURL=load.js.map