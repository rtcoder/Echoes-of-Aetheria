/**
 * Reprezentuje punkt w przestrzeni 2D.
 * @typedef {Object} Point
 * @property {number} x - Współrzędna x punktu.
 * @property {number} y - Współrzędna y punktu.
 */

/**
 * Reprezentuje rozmiar prostokąta.
 * @typedef {Object} Size
 * @property {number} width - Szerokość prostokąta.
 * @property {number} height - Wysokość prostokąta.
 */

/**
 * Reprezentuje ścianę na poziomie gry.
 * @typedef {Object} Wall
 * @property {number} x - Współrzędna x lewego górnego rogu ściany.
 * @property {number} y - Współrzędna y lewego górnego rogu ściany.
 * @property {number} width - Szerokość ściany.
 * @property {number} height - Wysokość ściany.
 */

/**
 * Reprezentuje poziom gry.
 * @typedef {Object} Level
 * @property {string} name - Nazwa poziomu.
 * @property {Point} startPoint - Punkt startowy gracza na poziomie.
 * @property {Size} size - Rozmiar poziomu.
 * @property {Wall[]} walls - Lista ścian na poziomie.
 */


/**
 * Reprezentuje główny obiekt gry.
 * @typedef {Object} Game
 * @property {Level|null} level - Aktualny poziom gry.
 * @property {number|null} currentLevel - Aktualny poziom gry.
 * @property {number} gameFieldTop - Pozycja górnej granicy pola gry.
 * @property {number} gravity - Siła grawitacji.
 * @property {Player} player - Obiekt gracza.
 */

export const PlayerMoveDirection = {
    Up: 'up',
    Down: 'down',
    Left: 'left',
    Right: 'right',
};

/** @type {Game} */
export const Game = {
    level: null,
    currentLevel: null,
    gameFieldTop: 100,
    gravity: 0.5,
    },
};
export const CanvasShift = {
    x: 0,
    y: 0,
};
export const Player = {
    width: 30,
    height: 50,
    x: 0,
    y: 0,
    speed: 5,
    lives: 2,
    maxLives: 5,
    dx: 0,
    dy: 0,
    velocityY: 0,
    jumpPower: -10,
    onGround: false,
    isWalking: false,
    moveDirection: PlayerMoveDirection.Down,
    frame: 0,
    frameCount: 9, // Liczba klatek w animacji
    animationDelay: 5, // Liczba klatek czasu między przełączeniem sprite'a
    animationCounter: 0,
};

