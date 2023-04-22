import {enableCategories, enableToggleSidebar} from "./navigation.js";
import Session from "./Session.js";
import {loadIndex} from "./spooky/load.js";
import {KB_Entry, KB_Index} from "./types/types.js";

function init(): void {
    Session.active();
    enableCategories();
    enableToggleSidebar();

    const current = Math.floor(Date.now() / 1000)
    loadIndex().then((index: KB_Index): void => {
        index.forEach((entry: KB_Entry): void => {
            Session.addEntry(entry);
        });
        console.log(Session.entriesList);
    });
}

window.onload = init;