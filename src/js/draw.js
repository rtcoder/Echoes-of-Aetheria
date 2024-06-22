import {Assets} from './assets.js';
import {canvas, ctx} from './elements.js';
import {CanvasShift, Game, Player, PlayerActionContext} from './game.js';

export function drawPlayer() {
    const {gameFieldTop} = Game;
    const spriteSheet = Assets.img.player.walk[PlayerActionContext.moveDirection];
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
    ctx.fillStyle = '#808080';
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

export function drawBackground() {
    ctx.fillStyle = '#808080';
    const {level, gameFieldTop} = Game;
    ctx.drawImage(
        Assets.img.bg.level_1,
        CanvasShift.x,
        CanvasShift.y + gameFieldTop,
        level.size.width,
        level.size.height,
    );
}

export function drawLives() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, Game.gameFieldTop);
    const imgWidth = 40;
    const leftPadding = 15;
    for (let i = 0; i < Player.lives; i++) {
        ctx.drawImage(Assets.img.heart_full, i * imgWidth + leftPadding, 10, imgWidth, imgWidth);
    }
    for (let i = Player.lives; i < Player.maxLives; i++) {
        ctx.drawImage(Assets.img.heart_empty, i * imgWidth + leftPadding, 10, imgWidth, imgWidth);
    }
}

export function drawGame() {
    drawBackground();
    drawPlayer();
    // drawWalls();
    drawLives();
}
