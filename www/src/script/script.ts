import {enableCategories, enableSelection, enableToggleSidebar} from "./nav.js";

function init(): void {
    enableCategories();
    enableSelection();
    enableToggleSidebar();
}

window.onload = init;