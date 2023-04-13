import { el, sel, selAll } from "./utils.js";
export function enableCategories() {
    const links = selAll('#categories a');
    links.forEach((link) => {
        link.onclick = (event) => {
            event.preventDefault();
            links.forEach((other) => {
                other.classList.remove('selected');
            });
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