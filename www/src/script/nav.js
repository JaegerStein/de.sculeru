import { el, sel, selAll } from "./utils.js";
const removeSelected = (nodeList) => {
    nodeList === null || nodeList === void 0 ? void 0 : nodeList.forEach((node) => {
        node.classList.remove('selected');
    });
};
export function enableCategories() {
    const links = selAll('#categories a');
    links.forEach((link) => {
        link.onclick = (event) => {
            event.preventDefault();
            removeSelected(links);
            link.classList.add('selected');
        };
    });
}
export function enableSelection() {
    const links = selAll('#selection a');
    links.forEach((link) => {
        link.onclick = (event) => {
            event.preventDefault();
            removeSelected(links);
            link.classList.add('selected');
        };
    });
}
export function enableToggleSidebar() {
    const toggle = el('ham');
    const sidebar = sel('main');
    if (!toggle || !sidebar)
        return;
    toggle.onclick = () => {
        sidebar.classList.toggle('show');
        toggle.classList.toggle('rotate');
    };
}
//# sourceMappingURL=nav.js.map