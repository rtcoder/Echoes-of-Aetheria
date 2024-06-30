import {Game} from './game.js';
import {updateCanvasShift} from './movement.js';
import {Player} from './Player.js';
import {randomStr} from './utils.js';

async function loadLevel(number) {
    /**
     * @type {Level}
     */
    const level = await fetch(`./src/json/levels/level_${number}.json`)
        .then(res => res.json());

    Player.setStartPosition(level);
    level.walls = level.walls.map(wall => {
        if (!wall.id) {
            wall.id = randomStr(10);
        }
        return wall;
    });
    Game.level = level;
    Game.currentLevel = number;
    updateCanvasShift();
}

export async function loadNextLevel() {
    let nextLevel;
    if (Game.currentLevel === null) {
        nextLevel = 1;
    } else {
        nextLevel = Game.currentLevel + 1;
    }
    await loadLevel(nextLevel);
}
