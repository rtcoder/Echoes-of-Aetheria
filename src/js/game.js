import {Assets} from './assets.js';
import {drawGame} from './draw.js';
import {canvas, ctx} from './elements.js';
import {loadNextLevel} from './level.js';
import {setListeners} from './listeners.js';
import {updatePlayerPositionOnPlatforms} from './movement.js';
import {moveBackgroundAndForeground} from './movement/backgrounds.js';
import {movePlatforms} from './movement/platforms.js';
import {PlayerActionContext} from './Player.js';
import {playSound} from './sound.js';

/** @type {GameType} */
export const Game = {
    isTouchDevice: false,
    level: null,
    currentLevel: null,
    isGameStarted: false,
    gameFieldTop: 60,
    gravity: 0.5,
    showWelcomeScreen: true,
    sfx: {
        walkAudioDelay: 12,
        walkAudioCounter: 12,
    },
    lastCheckpoint: {
        x: -1,
        y: -1,
    },
};
export const CanvasShift = {
    x: 0,
    y: 0,
};

export function saveGameToLocalStorage() {

}

function update() {
    if (!Game.isGameStarted) {
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePlatforms();
    moveBackgroundAndForeground();
    // updatePlayerPosition();
    updatePlayerPositionOnPlatforms();
    drawGame();
    const {sfx} = Game;
    if (PlayerActionContext.isWalking && PlayerActionContext.onGround) {

        sfx.walkAudioCounter++;
        if (sfx.walkAudioCounter >= sfx.walkAudioDelay) {
            playSound(Assets.audio.step2);
            sfx.walkAudioCounter = 0;
        }
    } else {
        sfx.walkAudioCounter = sfx.walkAudioDelay - 1;
    }
    setTimeout(()=>{
        requestAnimationFrame(update);
    },10)
}

export async function startGame() {
    Game.isGameStarted = true;
    await loadNextLevel();
    setListeners();
    update();
}
