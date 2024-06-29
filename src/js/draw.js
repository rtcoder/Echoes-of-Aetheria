import {Assets} from './assets.js';
import {drawBackground, drawForeground} from './draw/background.js';
import {canvas, ctx} from './elements.js';
import {CanvasShift, Game} from './game.js';
import {Player, PlayerActionContext} from './Player.js';

function drawPlayer() {
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

function drawWalls() {
    const {level, gameFieldTop} = Game;
    level.walls
        // .filter(w=>w.color)
        .forEach(wall => {
            if (wall.gif) {
                const gif = Assets.img[wall.gif];
                if (wall.frameDelay) {
                    const now = performance.now();
                    if (now - wall.lastFrameTime >= wall.frameDelay) {
                        wall.frameIndex = (wall.frameIndex + 1) % Object.keys(gif).length;
                        wall.lastFrameTime = now;
                        console.log(wall.frameIndex);
                    }
                } else {
                    wall.frameIndex = (wall.frameIndex + 1) % Object.keys(gif).length;
                }
                ctx.drawImage(
                    gif[wall.frameIndex],
                    wall.x + CanvasShift.x,
                    wall.y + CanvasShift.y + gameFieldTop,
                    wall.width,
                    wall.height,
                );
            } else {
                ctx.fillStyle = wall.color || (wall.type === 'ceiling' ? '#000' : '#09c');
                // ctx.fillStyle = wall.type==='ceiling'?'#000':'#09c';
                ctx.fillRect(
                    wall.x + CanvasShift.x,
                    wall.y + CanvasShift.y + gameFieldTop,
                    wall.width,
                    wall.height,
                );
            }
        });
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
