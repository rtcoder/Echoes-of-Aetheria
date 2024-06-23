import {Game} from '../game.js';

function moveBackgrounds() {
    Game.level.backgrounds.forEach(moveBg);
}

function moveForegrounds() {
    Game.level.foregrounds.forEach(moveBg);
}

function moveBg(bg) {
    bg.position.x += bg.move.x;
    bg.position.y += bg.move.y;
    bg.position.x = bg.position.x % Game.level.size.width;
    bg.position.y = bg.position.y % Game.level.size.height;
}

export function moveBackgroundAndForeground() {
    moveBackgrounds();
    moveForegrounds();
}
