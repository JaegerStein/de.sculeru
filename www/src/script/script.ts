import {enableCategories, enableToggleSidebar} from "./navigation.js";
import Session from "./Session.js";

function init(): void {
    Session.active();
    // enableCategories();
    // enableToggleSidebar();
}

window.onload = init;