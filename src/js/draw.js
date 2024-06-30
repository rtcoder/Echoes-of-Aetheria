import {Assets} from './assets.js';
import {drawBackground, drawForeground} from './draw/background.js';
import {drawWalls} from './draw/wall.js';
import {canvas, ctx} from './elements.js';
import {CanvasShift, Game} from './game.js';
import {Player, PlayerActionContext, PlayerAnimation} from './Player.js';

function drawPlayer() {
    const {gameFieldTop} = Game;
    const spriteSheet = Assets.img.player.walk[PlayerActionContext.moveDirection];
    const sprite = spriteSheet[PlayerAnimation.frame];
    ctx.drawImage(
        sprite,
        Player.x + CanvasShift.x,
        Player.y + CanvasShift.y + gameFieldTop,
        sprite.width,
        sprite.height,
    );
}

function drawCheckpoints() {
    const {level, gameFieldTop} = Game;
    ctx.fillStyle = 'rgba(255,0,0,0.5)';
    level.checkpoints
        .filter(c => !c.visited)
        .forEach(wall => {
            ctx.fillRect(
                wall.x + CanvasShift.x,
                wall.y + CanvasShift.y + gameFieldTop,
                wall.width,
                wall.height,
            );
        });
}


function drawLives() {
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
    drawWalls();
    drawForeground();
    drawCheckpoints();
    drawLives();
}
