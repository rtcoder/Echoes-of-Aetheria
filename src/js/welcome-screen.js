import {canvas, ctx} from './elements.js';
import {Game} from './game.js';
import {showMainMenu} from './main-menu.js';
import {drawWrappedText} from './utils.js';

let subtitleBlinkCounter = 0;
let shouldShowSubtitle = true;

function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#002f4b');
    gradient.addColorStop(1, '#1b8405');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawLogo() {
    const title = 'Echoes of Aetheria';
    const maxWidth = canvas.width * 0.8; // Maksymalna szerokość dla zawijania
    const lineHeight = 100;
    const x = canvas.width / 2;
    const y = canvas.height / 2 - 100;
    drawWrappedText(
        title,
        x,
        y,
        maxWidth,
        lineHeight,
        96,
        'NotJamBlackletter16',
        '#c77202',
        '#fff',
        4,
    );
}

function drawSubtitle() {
    if (!shouldShowSubtitle) {
        return;
    }
    const subtitle = 'Press Enter to Start';
    const maxWidth = canvas.width * 0.8; // Maksymalna szerokość dla zawijania
    const lineHeight = 30;
    const x = canvas.width / 2;
    const y = canvas.height - 100;
    drawWrappedText(
        subtitle,
        x,
        y,
        maxWidth,
        lineHeight,
        24,
        'NotJamBlackletter16',
        '#fff',
    );
}

export function drawWelcomeScreen() {
    drawBackground();
    drawLogo();
    subtitleBlinkCounter++;
    if (subtitleBlinkCounter % 40 === 0) {
        shouldShowSubtitle = !shouldShowSubtitle;
    }
    drawSubtitle();
    if (Game.showWelcomeScreen) {
        requestAnimationFrame(drawWelcomeScreen);
    }
}
export function showWelcomeScreen(){
    Game.showWelcomeScreen = true;
    drawWelcomeScreen();

    window.addEventListener('keydown', e => {
        if (e.code === 'Enter') {
            Game.showWelcomeScreen = false;
            showMainMenu();
        }
    });
}
