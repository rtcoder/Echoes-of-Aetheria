import {Game} from './game.js';
import {Player} from './Player.js';
import {updateCanvasShift} from './movement.js';

 async function loadLevel(number) {
    const level = await fetch(`./src/json/levels/level_${number}.json`).then(res => res.json());
    Player.x = level.startPoint.x;
    Player.y = level.startPoint.y;
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
