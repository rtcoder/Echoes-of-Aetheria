import {Assets} from './assets.js';
import {canvas, ctx} from './elements.js';
import {CanvasShift, Game, Player} from './game.js';

export function drawPlayer() {
    const {gameFieldTop} = Game;
    const spriteSheet = Assets.img.player.walk[Player.moveDirection];
    const sprite = spriteSheet[Player.frame];
    ctx.drawImage(
        sprite,
        Player.x + CanvasShift.x,
        Player.y + CanvasShift.y + gameFieldTop,
        sprite.width,
        sprite.height,
    );
}

export function drawWalls() {
    ctx.fillStyle = 'gray';
    const {level, gameFieldTop} = Game;
    level.walls.forEach(wall => {
        ctx.fillRect(
            wall.x + CanvasShift.x,
            wall.y + CanvasShift.y + gameFieldTop,
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
    const leftPadding = 15;
    for (let i = 0; i < Player.lives; i++) {
        ctx.drawImage(Assets.img.heart_full, i * imgWidth + leftPadding, 10, imgWidth, imgWidth);
    }
    for (let i = Player.lives; i < Player.maxLives; i++) {
        ctx.drawImage(Assets.img.heart_empty, i * imgWidth + leftPadding, 10, imgWidth, imgWidth);
    }
}

export function drawGame() {
    drawPlayer();
    drawWalls();
    drawLives();
}
