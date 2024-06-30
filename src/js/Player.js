import {Game} from './game.js';

export const PlayerMoveDirection = {
    Up: 'up',
    Down: 'down',
    Left: 'left',
    Right: 'right',
};

export const Player = {
    width: 30,
    height: 50,
    x: 0,
    y: 0,
    speed: 5,
    lives: 5,
    maxLives: 5,
    dx: 0,
    dy: 0,
    velocityY: 0,
    velocityX: 0,
    jumpPower: -10,
};

export const PlayerActionContext = {
    moveDirection: PlayerMoveDirection.Down,
    onGround: false,
    isWalking: false,
};

export const PlayerAnimation = {
    frame: 0,
    frameCount: 9,
    animationDelay: 5,
    animationCounter: 0,
};

export function removeLive() {
    const {level, lastCheckpoint} = Game;
    console.log('die');
    Player.lives--;
    if (Player.lives > 0) {
        if (lastCheckpoint.x > 0 && lastCheckpoint.y > 0) {
            Player.x = lastCheckpoint.x;
            Player.y = lastCheckpoint.y;
        } else {
            Player.x = level.startPoint.x;
            Player.y = level.startPoint.y;
        }
    } else {
        Player.x = level.startPoint.x;
        Player.y = level.startPoint.y;
        Player.lives = Player.maxLives;
        level.checkpoints = level.checkpoints.map(c => ({
            ...c,
            visited: false,
        }));
    }
    Player.velocityY = 0;
}
