import {detectCollision} from './collisions.js';
import {canvas} from './elements.js';
import {Game, PlayerMoveDirection} from './game.js';
import {Keys} from './keys.js';

export function updatePlayerPosition() {
    const {player, level} = Game;
    const oldX = player.x;
    const oldY = player.y;

    updatePlayerCoordinateByKeys();
    preventPlayerLeaveCanvas();

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

    updateCanvasShift();
}

export function updatePlayerPositionOnPlatforms() {
    const {player, level, gravity} = Game;
    updatePlayerCoordinateByKeys();
    player.velocityY += gravity;
    player.y += player.velocityY;

    player.onGround = false;
    level.walls.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y) {
            player.velocityY = 0;
            player.y = platform.y - player.height;
            player.onGround = true;
        }
    });

    // Sprawdzanie kolizji z ziemią
    if (player.y + player.height + Game.canvasShift.y > canvas.height) {
        player.y = canvas.height - player.height - Game.canvasShift.y;
        player.velocityY = 0;
        player.onGround = true;
    }

    preventPlayerLeaveCanvas();

    updateCanvasShift();
}

function updatePlayerCoordinateByKeys() {
    const {player} = Game;

    if (Keys.ArrowUp || Keys.KeyW) {
        player.dy = -player.speed;
        player.moveDirection = PlayerMoveDirection.Up;
    }
    if (Keys.ArrowDown || Keys.KeyS) {
        player.dy = player.speed;
        player.moveDirection = PlayerMoveDirection.Down;
    }
    if (Keys.ArrowLeft || Keys.KeyA) {
        player.dx = -player.speed;
        player.moveDirection = PlayerMoveDirection.Left;
    }
    if (Keys.ArrowRight || Keys.KeyD) {
        player.dx = player.speed;
        player.moveDirection = PlayerMoveDirection.Right;
    }
    if (player.dx < 0 && player.dy < 0) {
        if (player.dx > player.dy) {
            player.moveDirection = PlayerMoveDirection.Up;
        } else {
            player.moveDirection = PlayerMoveDirection.Left;
        }
    }
    if (player.dx > 0 && player.dy > 0) {
        if (player.dx > player.dy) {
            player.moveDirection = PlayerMoveDirection.Right;
        } else {
            player.moveDirection = PlayerMoveDirection.Down;
        }
    }
    // Aktualizacja klatek animacji
    if (player.dx !== 0 || player.dy !== 0) {
        player.animationCounter++;
        if (player.animationCounter >= player.animationDelay) {
            player.frame = (player.frame + 1) % player.frameCount;
            player.animationCounter = 0;
        }
    } else {
        player.frame = 0; // Reset animacji, gdy gracz się nie porusza
    }
    if (Keys.Space && player.onGround) {
        player.velocityY = player.jumpPower;
    }

    player.x += player.dx;
    player.y += player.dy;
    player.dx = 0;
    player.dy = 0;
}

function preventPlayerLeaveCanvas() {
    const {player, canvasShift, gameFieldTop} = Game;
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.y < 0) {
        player.y = 0;
    }
    const cWidth = canvas.width;
    const cHeight = canvas.height;
    if (player.x + player.size + canvasShift.x > cWidth) {
        player.x = cWidth - player.size - canvasShift.x;
    }
    if (player.y + player.size + canvasShift.y > cHeight - gameFieldTop) {
        player.y = cHeight - gameFieldTop - player.size - canvasShift.y;
    }
}

function updateCanvasShift() {
    const {player, canvasShift, level} = Game;
    const cWidth = canvas.width;
    const cHeight = canvas.height;
    const halfCanvasWidth = (cWidth / 2);
    const halfCanvasHeight = (cHeight / 2);

    canvasShift.y = 0;
    if (player.y >= halfCanvasHeight) {
        canvasShift.y = halfCanvasHeight - player.y;
        const maxCanvasShift = level.size.height - cHeight;
        if (canvasShift.y <= -maxCanvasShift) {
            canvasShift.y = -maxCanvasShift;
        }
    }

    canvasShift.x = 0;
    if (player.x >= halfCanvasWidth) {
        canvasShift.x = halfCanvasWidth - player.x;
        const maxCanvasShift = (level.size.width) - cWidth;
        if (canvasShift.x <= -maxCanvasShift) {
            canvasShift.x = -maxCanvasShift;
        }
    }
}
