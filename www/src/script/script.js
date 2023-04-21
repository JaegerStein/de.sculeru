import { enableCategories, enableToggleSidebar } from "./navigation.js";
import Session from "./Session.js";
function init() {
    Session.active();
    enableCategories();
    enableToggleSidebar();
}
window.onload = init;
//# sourceMappingURL=script.js.map