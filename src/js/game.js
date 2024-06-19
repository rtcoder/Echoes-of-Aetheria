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
 * Reprezentuje gracza w grze.
 * @typedef {Object} Player
 * @property {number} size - Rozmiar gracza.
 * @property {number} width - Rozmiar gracza.
 * @property {number} height - Rozmiar gracza.
 * @property {number} x - Współrzędna x pozycji gracza.
 * @property {number} y - Współrzędna y pozycji gracza.
 * @property {number} speed - Prędkość poruszania się gracza.
 * @property {number} lives - Liczba żyć gracza.
 * @property {number} maxLives - Maksymalna liczba żyć gracza.
 * @property {number} dx - Prędkość ruchu gracza w osi x.
 * @property {number} dy - Prędkość ruchu gracza w osi y.
 */

/**
 * Reprezentuje przesunięcie płótna.
 * @typedef {Object} CanvasShift
 * @property {number} x - Przesunięcie w osi x.
 * @property {number} y - Przesunięcie w osi y.
 */

/**
 * Reprezentuje główny obiekt gry.
 * @typedef {Object} Game
 * @property {Level|null} level - Aktualny poziom gry.
 * @property {number|null} currentLevel - Aktualny poziom gry.
 * @property {number} gameFieldTop - Pozycja górnej granicy pola gry.
 * @property {number} gravity - Siła grawitacji.
 * @property {Player} player - Obiekt gracza.
 * @property {CanvasShift} canvasShift - Przesunięcie płótna.
 */

/** @type {Game} */
export const Game = {
    level: null,
    currentLevel: null,
    gameFieldTop: 100,
    gravity: 0.5,
    player: {
        size: 40,
        width: 40,
        height: 40,
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
    },
    canvasShift: {
        x: 0,
        y: 0,
    },
};
