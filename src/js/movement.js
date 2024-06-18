import {canvas} from './elements.js';
import {detectCollision} from './collisions.js';
import {Game} from './game.js';
import {Keys} from './keys.js';

export function updatePlayerPosition() {
    const {player, canvasShift, level, gameFieldTop} = Game;
    const oldX = player.x;
    const oldY = player.y;
    if (Keys['ArrowUp'] || Keys['w']) {
        player.dy = -player.speed;
    }
    if (Keys['ArrowDown'] || Keys['s']) {
        player.dy = player.speed;
    }
    if (Keys['ArrowLeft'] || Keys['a']) {
        player.dx = -player.speed;
    }
    if (Keys['ArrowRight'] || Keys['d']) {
        player.dx = player.speed;
    }

    player.x += player.dx;
    player.y += player.dy;

    if (player.x < 0) {
        player.x = 0;
    }
    if (player.y < 0) {
        player.y = 0;
    }
    if (player.x + player.size + canvasShift.x > canvas.width) {
        player.x = canvas.width - player.size - canvasShift.x;
    }
    if (player.y + player.size + canvasShift.y > canvas.height - gameFieldTop) {
        player.y = canvas.height - gameFieldTop - player.size - canvasShift.y;
    }

    const collisionResult = detectCollision(
        player,
        level.walls,
    );
    if (collisionResult.top) {
        player.y = oldY;
    }
    if (collisionResult.bottom) {
        player.y = oldY;
    }
    if (collisionResult.left) {
        player.x = oldX;
    }
    if (collisionResult.right) {
        player.x = oldX;
    }
    const halfCanvasWidth = canvas.width / 2;
    const halfCanvasHeight = canvas.height / 2;

    canvasShift.y = 0;
    if (player.y >= halfCanvasHeight) {
        canvasShift.y = halfCanvasHeight - player.y;
        const maxCanvasShift = level.size.height - halfCanvasHeight;
        if (canvasShift.y <= -maxCanvasShift) {
            canvasShift.y = -maxCanvasShift;
        }
    }

    canvasShift.x = 0;
    if (player.x >= halfCanvasWidth) {
        canvasShift.x = halfCanvasWidth - player.x;
        const maxCanvasShift = level.size.width - halfCanvasWidth;
        if (canvasShift.x <= -maxCanvasShift) {
            canvasShift.x = -maxCanvasShift;
        }
    }
}
