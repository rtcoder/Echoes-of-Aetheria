import {canvas, ctx} from './elements.js';

export function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

export function drawWrappedText(
    text,
    x,
    y,
    maxWidth,
    lineHeight,
    fontSize,
    fontFamily,
    fillStyle,
    strokeStyle = 'transparent',
    lineWidth = 0,
    underline = false,
    underlineColor = '#ffffff',
    underlineWidth = 2,
) {

    const words = text.split(' ');
    let line = '';
    const lines = [];

    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.textAlign = 'center';
    // Podziel tekst na linie
    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n];
        let testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine + ' ';
        }
    }
    lines.push(line);

    // Rysuj linie, wyśrodkowane
    for (let i = 0; i < lines.length; i++) {
        const currentLine = lines[i].trim();
        let lineWidth = ctx.measureText(currentLine).width;
        let lineX = x - lineWidth / 2;
        ctx.strokeText(currentLine, x, y + i * lineHeight);
        ctx.fillText(currentLine, x, y + i * lineHeight);

        if (underline) {
            ctx.beginPath();
            ctx.moveTo(lineX, y + i * lineHeight + 10); // 5px below text
            ctx.lineTo(lineX + lineWidth, y + i * lineHeight + 10);
            ctx.lineWidth = underlineWidth;
            ctx.strokeStyle = underlineColor;
            ctx.stroke();
        }
    }
}
export function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}
