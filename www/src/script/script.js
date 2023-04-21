import Session from "./Session.js";
import { loadIndex } from "./spooky/load.js";
import { KB_Category } from "./types/types.js";
function init() {
    Session.active();
    const lore = Session.lore || loadIndex(KB_Category.LORE);
    if (lore instanceof Promise)
        lore.then((index) => {
            Session.updateLoreIndex(index);
        });
}
window.onload = init;
//# sourceMappingURL=script.js.map