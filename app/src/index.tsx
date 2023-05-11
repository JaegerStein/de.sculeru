/* REACT */
import React from 'react';
import {createRoot} from 'react-dom/client';
/* STYLES */
import './styles/style.css';
import './styles/left.css';
import './styles/right.css';
/* APPLICATION */
import App from './scripts/app/App';
import Left from "./scripts/app/Left";
import Right from "./scripts/app/Right";
/* UTILS */
import {el} from "./scripts/utils/utils";
import Session from "./scripts/utils/Session";

const left: HTMLElement | null = el('left-root')!;
const center: HTMLElement | null = el('center-root')!;
const right: HTMLElement | null = el('right-root')!;
Session.active().then(() => {
    createRoot(left).render(<Left/>);
    createRoot(center).render(<App/>);
    createRoot(right).render(<Right/>);
});

// const strict = (component: React.ReactElement): React.ReactElement => <React.StrictMode>{component}</React.StrictMode>