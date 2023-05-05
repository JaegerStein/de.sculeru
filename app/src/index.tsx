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
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
