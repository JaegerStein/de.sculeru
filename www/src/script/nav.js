import { selAll } from "./utils.js";
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
//# sourceMappingURL=nav.js.map