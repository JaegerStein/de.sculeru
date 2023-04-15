import {enableCategories, enableToggleSidebar} from "./nav.js";

function init(): void {
    enableCategories();
    enableToggleSidebar();
}

window.onload = init;