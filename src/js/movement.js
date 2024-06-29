import {Assets} from './assets.js';
import {detectCollision} from './collisions.js';
import {canvas} from './elements.js';
import {CanvasShift, Game} from './game.js';
import {Keys} from './keys.js';
import {Player, PlayerActionContext, PlayerMoveDirection, removeLive} from './Player.js';
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
    const {level, gravity, lastCheckpoint} = Game;
    if (Game.isTouchDevice) {
        updatePlayerCoordinateByJoyStickOnPlatforms();
    } else {
        updatePlayerCoordinateByKeysOnPlatforms();
    }
    Player.velocityY += gravity;
    Player.y += Player.velocityY;
    Player.x += Player.velocityX;
    let playerIsGoingToDie = false;
    if (Player.velocityY > 30) {
        playerIsGoingToDie = true;
    }

    PlayerActionContext.onGround = false;
    level.checkpoints.filter(c => !c.visited)
        .forEach((checkpoint, i) => {
            const collision = colCheck(Player, checkpoint);
            if (collision) {
                lastCheckpoint.x = checkpoint.x + (checkpoint.width / 2);
                lastCheckpoint.y = checkpoint.y + (checkpoint.height / 2);
                level.checkpoints[i].visited = true;
            }
        });

    level.walls.forEach((platform, indexPlatform) => {
        const collision = colCheck(Player, platform);
        if (collision) {
            if (playerIsGoingToDie) {
                removeLive();
                playerIsGoingToDie = false;
                return;
            }
            if (platform.type === 'danger') {
                removeLive();
                return;
            }
            const playerBottom = Player.y + Player.height;
            const platformTop = platform.y;
            const platformBottom = platform.y + platform.height;
            const playerRight = Player.x + Player.width;
            const playerLeft = Player.x;
            const platformRight = platform.x + platform.width;
            const platformLeft = platform.x;
            let hasCollisionLeftSide = false;
            let hasCollisionRightSide = false;
            // Sprawdzamy, czy gracz ma kolizję z platformą z prawej lub lewej strony
            if (playerRight > platformLeft && playerLeft < platformRight) {
                if (playerLeft < platformLeft) {
                    // Kolizja z lewej strony platformy
                    hasCollisionLeftSide = true;
                } else if (playerRight > platformRight) {
                    // Kolizja z prawej strony platformy
                    hasCollisionRightSide = true;
                }
            }

            if (playerBottom <= platformBottom) {
                // Gracz jest nad platformą i opada
                if (Player.y < platformTop) {
                    if (Player.velocityY > 1) {
                        console.log(Player.velocityY);
                    }
                    if (platform.isMoving) {
                        Player.velocityY = platform.move.moveDirection.y;
                        Player.velocityX = platform.move.moveDirection.x;
                    } else {
                        Player.velocityY = 0;
                        Player.velocityX = 0;
                    }
                    Player.y = platformTop - Player.height;
                    PlayerActionContext.onGround = true;
                    Player.currentPlatformIndex = indexPlatform;
                    return;
                }
                if (hasCollisionLeftSide) {
                    Player.x = platformLeft - Player.width;
                    Player.velocityX = 0;
                    return;
                }
                if (hasCollisionRightSide) {
                    Player.x = platformRight;
                    Player.velocityX = 0;
                    return;
                }
            }
            if (Player.y < platformTop && playerBottom >= platformBottom) {
                Player.velocityY = 0;
                Player.y = platformTop - Player.height;
                PlayerActionContext.onGround = true;
                return;
            }
            if (Player.y < platformBottom && Player.velocityY < 0) {
                // Gracz uderza w platformę od dołu
                if (platform.type === 'ceiling') {
                    // Platforma typu "sufit" - gracz odbija się od niej
                    Player.velocityY = -Player.velocityY;
                    Player.y = platformBottom;
                    console.log('cc');
                } else {
                    // Inny typ platformy - gracz normalnie wskakuje na nię
                    Player.velocityY = 0;
                    console.log('ddd');
                    Player.y = platformTop - Player.height;
                    PlayerActionContext.onGround = true;
                }
            }

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

function colCheck(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y;
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
    if (Player.dx < 0) {
        PlayerActionContext.moveDirection = PlayerMoveDirection.Left;
    }
    if (Player.dx > 0) {
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
        const maxCanvasShift = level.size.height - cHeight + gameFieldTop;
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

