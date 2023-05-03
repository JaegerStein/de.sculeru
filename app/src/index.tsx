import React from 'react';
import {createRoot} from 'react-dom/client';
import './assets/styles/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {el} from "./utils/utils";
import Left from "./components/Left";
import Right from "./components/Right";

const left: HTMLElement = el('left-root')!;
const center: HTMLElement = el('center-root')!;
const right: HTMLElement = el('right-root')!;

const strict = (component: React.ReactElement): React.ReactElement => <React.StrictMode>{component}</React.StrictMode>

createRoot(left).render(strict(<Left/>));
createRoot(center).render(strict(<App/>));
createRoot(right).render(strict(<Right/>));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
