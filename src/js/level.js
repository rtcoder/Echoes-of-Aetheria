import {Game} from './game.js';

 async function loadLevel(number) {
    const level = await fetch(`./src/json/levels/level_${number}.json`).then(res => res.json());
    Game.player.x = level.startPoint.x;
    Game.player.y = level.startPoint.y;
    Game.level = level;
    Game.currentLevel = number;
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
