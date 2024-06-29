/**
 * Reprezentuje punkt w przestrzeni 2D.
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * Reprezentuje rozmiar prostokąta.
 * @typedef {Object} Size
 * @property {number} width
 * @property {number} height
 */

/**
 * Reprezentuje ścianę na poziomie gry.
 * @typedef {Object} Background
 * @property {string} img
 * @property {Point} position
 * @property {Point} move
 * @property {Point} paralax
 */
/**
 * Reprezentuje ścianę na poziomie gry.
 * @typedef {Object} Wall
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {string} type
 * @property {boolean} isMoving
 * @property {Object} move
 * @property {Point} move.from
 * @property {Point} move.to
 * @property {Point} move.moveDirectiond
 * @property {string|undefined} color
 */
/**
 * Reprezentuje punkt w przestrzeni 2D.
 * @typedef {Object} Checkpoint
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {boolean} visited
 */
/**
 * Reprezentuje poziom gry.
 * @typedef {Object} Level
 * @property {string} name
 * @property {Point} startPoint
 * @property {Size} size
 * @property {Background[]} backgrounds
 * @property {Background[]} foregrounds
 * @property {Wall[]} walls
 * @property {Checkpoint[]} checkpoints
 */

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

/**
 * Reprezentuje główny obiekt gry.
 * @typedef {Object} Game
 * @property {Level|null} level - Aktualny poziom gry.
 * @property {number|null} currentLevel - Aktualny poziom gry.
 * @property {boolean} isGameStarted
 * @property {number} gameFieldTop - Pozycja górnej granicy pola gry.
 * @property {number} gravity - Siła grawitacji.
 */

/** @type {Game} */
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
    requestAnimationFrame(update);
}

export async function startGame() {
    Game.isGameStarted = true;
    await loadNextLevel();
    setListeners();
    update();
}
