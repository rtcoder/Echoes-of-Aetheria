import {canvas} from './elements.js';

export function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
