import {enableCategories, enableToggleSidebar} from "./navigation.js";
import Session from "./Session.js";
import {loadIndex} from "./spooky/load.js";
import {KB_Category, KB_Entry} from "./types/types.js";


function init(): void {
    Session.active();
    enableCategories();
    enableToggleSidebar();

    // const lore: KB_Entry[] | Promise<KB_Entry[]> = Session.lore || loadIndex(KB_Category.LORE);
    // if (lore instanceof Promise) lore.then((index: KB_Entry[]): void => {
    //     Session.updateLoreIndex(index);
    // });
}

window.onload = init;