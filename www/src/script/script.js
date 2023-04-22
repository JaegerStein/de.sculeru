import { enableCategories, enableToggleSidebar } from "./navigation.js";
import Session from "./Session.js";
import { loadIndex } from "./spooky/load.js";
function init() {
    Session.active();
    enableCategories();
    enableToggleSidebar();
    const current = Math.floor(Date.now() / 1000);
    loadIndex().then((index) => {
        index.forEach((entry) => {
            Session.addEntry(entry);
        });
        console.log(Session.entriesList);
    });
}
window.onload = init;
//# sourceMappingURL=script.js.map