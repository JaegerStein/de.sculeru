/* REACT */
import React from 'react';
import {createRoot} from 'react-dom/client';
/* STYLES */
import './styles/style.css';
/* APPLICATION */
import App from './scripts/app/App';
import Left from "./scripts/app/Left";
import Right from "./scripts/app/Right";
/* UTILS */
import {el} from "./scripts/utils/utils";
import Session from "./scripts/utils/Session";
import {CENTER_ROOT, LEFT_ROOT, RIGHT_ROOT} from "./scripts/utils/common";

const left: HTMLElement | null = el(LEFT_ROOT)!;
const center: HTMLElement | null = el(CENTER_ROOT)!;
const right: HTMLElement | null = el(RIGHT_ROOT)!;

Session.active().then((): void => {
    createRoot(left).render(<Left/>);
    createRoot(center).render(<App/>);
    createRoot(right).render(<Right/>);
});