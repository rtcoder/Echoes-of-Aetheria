import {Game} from './game.js';

export const PlayerMoveDirection = {
    Up: 'up',
    Down: 'down',
    Left: 'left',
    Right: 'right',
};

class PlayerClass {
    width = 30;
    height = 50;
    x = 0;
    y = 0;
    speed = 5;
    lives = 5;
    maxLives = 5;
    dx = 0;
    dy = 0;
    velocityY = 0;
    velocityX = 0;
    jumpPower = -10;

    removeLive() {
        const {level, lastCheckpoint} = Game;

        this.lives--;
        if (this.lives > 0) {
            if (lastCheckpoint.x > 0 && lastCheckpoint.y > 0) {
                this.setPosition(lastCheckpoint);
            } else {
                this.setStartPosition(level);
            }
        } else {
            this.setStartPosition(level);
            this.lives = this.maxLives;
            level.checkpoints = level.checkpoints.map(c => ({
                ...c,
                visited: false,
            }));
        }
        this.velocityY = 0;
    }

    setStartPosition(level) {
        this.setPosition(level.startPoint);
    }

    setPosition(position) {
        this.x = position.x;
        this.y = position.y;
    }

}

export const Player = new PlayerClass();

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
