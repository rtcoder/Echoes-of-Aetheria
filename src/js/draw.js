import {Assets} from './assets.js';
import {canvas, ctx} from './elements.js';
import {Game} from './game.js';

export function drawPlayer() {
    ctx.fillStyle = 'white';
    const {player, canvasShift, gameFieldTop} = Game;
    const spriteSheet = Assets.img.player.walk[player.moveDirection];
    const sprite = spriteSheet[player.frame];
    ctx.drawImage(
        sprite,
        player.x + canvasShift.x,
        player.y + canvasShift.y + gameFieldTop,
        sprite.width,
        sprite.height,
    );
}

export function drawWalls() {
    ctx.fillStyle = 'gray';
    const {level, canvasShift, gameFieldTop} = Game;
    level.walls.forEach(wall => {
        ctx.fillRect(
            wall.x + canvasShift.x,
            wall.y + canvasShift.y + gameFieldTop,
            wall.width,
            wall.height,
        );
    });
}

export function drawLives() {
    ctx.clearRect(0, 0, canvas.width, 100);
    const imgWidth = 64;
    for (let i = 0; i < Game.player.lives; i++) {
        ctx.drawImage(Assets.img.heart_full, i * imgWidth, 10, imgWidth, imgWidth);
    }
    for (let i = Game.player.lives; i < Game.player.maxLives; i++) {
        ctx.drawImage(Assets.img.heart_empty, i * imgWidth, 10, imgWidth, imgWidth);
    }
}

export function drawGame() {
    drawPlayer();
    drawWalls();
    drawLives();
}
