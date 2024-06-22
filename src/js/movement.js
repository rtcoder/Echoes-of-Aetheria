import {Assets} from './assets.js';
import {detectCollision} from './collisions.js';
import {canvas} from './elements.js';
import {CanvasShift, Game, Player, PlayerActionContext, PlayerMoveDirection} from './game.js';
import {Keys} from './keys.js';
import {playSound} from './sound.js';

export function updatePlayerPosition() {
    const {level} = Game;
    const oldX = Player.x;
    const oldY = Player.y;

    updatePlayerCoordinateByKeys();
    preventPlayerLeaveCanvas();

    const collisionResult = detectCollision(
        Player,
        level.walls,
    );
    if (collisionResult.top) {
        Player.y = oldY;
    }
    if (collisionResult.bottom) {
        Player.y = oldY;
    }
    if (collisionResult.left) {
        Player.x = oldX;
    }
    if (collisionResult.right) {
        Player.x = oldX;
    }

    updateCanvasShift();
}

export function updatePlayerPositionOnPlatforms() {
    const { level, gravity } = Game;
    if(Game.isTouchDevice){
        updatePlayerCoordinateByJoyStickOnPlatforms();
    }else {
        updatePlayerCoordinateByKeysOnPlatforms();
    }
    Player.velocityY += gravity;
    Player.y += Player.velocityY;

    PlayerActionContext.onGround = false;
    level.walls.forEach(platform => {
        if (Player.x < platform.x + platform.width &&
            Player.x + Player.width > platform.x &&
            Player.y < platform.y + platform.height &&
            Player.y + Player.height > platform.y) {
            // Sprawdzanie, czy platforma nie jest typem "sufit"
            // if (platform.type !== 'ceiling') {
                Player.velocityY = 0;
                Player.y = platform.y - Player.height;
                PlayerActionContext.onGround = true;
            // }
        }
    });

    // Sprawdzanie kolizji z ziemią
    if (Player.y + Player.height + CanvasShift.y > canvas.height) {
        Player.y = canvas.height - Player.height - CanvasShift.y;
        Player.velocityY = 0;
        PlayerActionContext.onGround = true;
    }

    preventPlayerLeaveCanvas();

    updateCanvasShift();
}

function updatePlayerCoordinateByKeys() {
    if (Keys.ArrowUp || Keys.KeyW) {
        Player.dy = -Player.speed;
        PlayerActionContext.moveDirection = PlayerMoveDirection.Up;
    }
    if (Keys.ArrowDown || Keys.KeyS) {
        Player.dy = Player.speed;
        PlayerActionContext.moveDirection = PlayerMoveDirection.Down;
    }
    if (Keys.ArrowLeft || Keys.KeyA) {
        Player.dx = -Player.speed;
        PlayerActionContext.moveDirection = PlayerMoveDirection.Left;
    }
    if (Keys.ArrowRight || Keys.KeyD) {
        Player.dx = Player.speed;
        PlayerActionContext.moveDirection = PlayerMoveDirection.Right;
    }
    if (Player.dx < 0 && Player.dy < 0) {
        if (Player.dx > Player.dy) {
            PlayerActionContext.moveDirection = PlayerMoveDirection.Up;
        } else {
            PlayerActionContext.moveDirection = PlayerMoveDirection.Left;
        }
    }
    if (Player.dx > 0 && Player.dy > 0) {
        if (Player.dx > Player.dy) {
            PlayerActionContext.moveDirection = PlayerMoveDirection.Right;
        } else {
            PlayerActionContext.moveDirection = PlayerMoveDirection.Down;
        }
    }
    // Aktualizacja klatek animacji
    if (Player.dx !== 0 || Player.dy !== 0) {
        PlayerActionContext.isWalking = true;
        Player.animationCounter++;
        if (Player.animationCounter >= Player.animationDelay) {
            Player.frame = (Player.frame + 1) % Player.frameCount;
            Player.animationCounter = 0;
        }
    } else {
        Player.frame = 0; // Reset animacji, gdy gracz się nie porusza
        PlayerActionContext.isWalking = false;
    }
    if (Keys.Space && PlayerActionContext.onGround) {
        Player.velocityY = Player.jumpPower;
        playSound(Assets.audio.jump);
    }

    Player.x += Player.dx;
    Player.y += Player.dy;
    Player.dx = 0;
    Player.dy = 0;
}
function updatePlayerCoordinateByKeysOnPlatforms() {
    if (Keys.ArrowLeft || Keys.KeyA) {
        Player.dx = -Player.speed;
        PlayerActionContext.moveDirection = PlayerMoveDirection.Left;
    }
    if (Keys.ArrowRight || Keys.KeyD) {
        Player.dx = Player.speed;
        PlayerActionContext.moveDirection = PlayerMoveDirection.Right;
    }
    if (Player.dx < 0 && Player.dy < 0) {
        if (Player.dx < Player.dy) {
            PlayerActionContext.moveDirection = PlayerMoveDirection.Left;
        }
    }
    if (Player.dx > 0 && Player.dy > 0) {
        if (Player.dx > Player.dy) {
            PlayerActionContext.moveDirection = PlayerMoveDirection.Right;
        }
    }
    // Aktualizacja klatek animacji
    if (Player.dx !== 0 || Player.dy !== 0) {
        PlayerActionContext.isWalking = true;
        Player.animationCounter++;
        if (Player.animationCounter >= Player.animationDelay) {
            Player.frame = (Player.frame + 1) % Player.frameCount;
            Player.animationCounter = 0;
        }
    } else {
        Player.frame = 0; // Reset animacji, gdy gracz się nie porusza
        PlayerActionContext.isWalking = false;
    }
    if (Keys.Space && PlayerActionContext.onGround) {
        Player.velocityY = Player.jumpPower;
        playSound(Assets.audio.jump);
    }

    Player.x += Player.dx;
    Player.y += Player.dy;
        Player.dx = 0;
        Player.dy = 0;
}
function updatePlayerCoordinateByJoyStickOnPlatforms() {
    if (Player.dx<0) {
        PlayerActionContext.moveDirection = PlayerMoveDirection.Left;
    }
    if (Player.dx>0) {
        Player.dx = Player.speed;
        PlayerActionContext.moveDirection = PlayerMoveDirection.Right;
    }
    // Aktualizacja klatek animacji
    if (Player.dx !== 0 || Player.dy !== 0) {
        PlayerActionContext.isWalking = true;
        Player.animationCounter++;
        if (Player.animationCounter >= Player.animationDelay) {
            Player.frame = (Player.frame + 1) % Player.frameCount;
            Player.animationCounter = 0;
        }
    } else {
        Player.frame = 0; // Reset animacji, gdy gracz się nie porusza
        PlayerActionContext.isWalking = false;
    }
    if (Keys.Space && PlayerActionContext.onGround) {
        Player.velocityY = Player.jumpPower;
        playSound(Assets.audio.jump);
    }

    Player.x += Player.dx;
}

function preventPlayerLeaveCanvas() {
    const {gameFieldTop} = Game;
    if (Player.x < 0) {
        Player.x = 0;
    }
    if (Player.y < 0) {
        Player.y = 0;
    }
    const cWidth = canvas.width;
    const cHeight = canvas.height;
    if (Player.x + Player.width + CanvasShift.x > cWidth) {
        Player.x = cWidth - Player.width - CanvasShift.x;
    }
    if (Player.y + Player.height + CanvasShift.y > cHeight - gameFieldTop) {
        Player.y = cHeight - gameFieldTop - Player.height - CanvasShift.y;
    }
}

export function updateCanvasShift() {
    const {level, gameFieldTop} = Game;
    const cWidth = canvas.width;
    const cHeight = canvas.height;
    const halfCanvasWidth = (cWidth / 2);
    const halfCanvasHeight = (cHeight / 2);

    CanvasShift.y = 0;
    if (Player.y >= halfCanvasHeight) {
        CanvasShift.y = halfCanvasHeight - Player.y;
        const maxCanvasShift = level.size.height - cHeight+gameFieldTop;
        if (CanvasShift.y <= -maxCanvasShift) {
            CanvasShift.y = -maxCanvasShift;
        }
    }

    CanvasShift.x = 0;
    if (Player.x >= halfCanvasWidth) {
        CanvasShift.x = halfCanvasWidth - Player.x;
        const maxCanvasShift = (level.size.width) - cWidth;
        if (CanvasShift.x <= -maxCanvasShift) {
            CanvasShift.x = -maxCanvasShift;
        }
    }
}
