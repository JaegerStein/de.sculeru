import { enableNavigation } from "./navigation.js";
import Session from "./Session.js";
import { loadIndex } from "./spooky/load.js";
function init() {
    Session.active();
    const current = Math.floor(Date.now() / 1000);
    loadIndex().then((index) => {
        index.forEach((entry) => {
            Session.addEntry(entry);
        });
    });
    enableNavigation();
}
window.onload = init;
//# sourceMappingURL=script.js.map