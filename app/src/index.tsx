import React from 'react';
import {createRoot} from 'react-dom/client';
import './assets/styles/style.css';
import './assets/styles/left.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {el} from "./common/utils";
import Left from "./Left";
import Right from "./Right";
import Session from "./common/Session";

const left: HTMLElement = el('left-root')!;
const center: HTMLElement = el('center-root')!;
const right: HTMLElement = el('right-root')!;

const strict = (component: React.ReactElement): React.ReactElement => <React.StrictMode>{component}</React.StrictMode>

Session.active().then(() => {
    createRoot(left).render(strict(<Left/>));
    createRoot(center).render(strict(<App/>));
    createRoot(right).render(strict(<Right/>));

    // reportWebVitals(console.log);
});