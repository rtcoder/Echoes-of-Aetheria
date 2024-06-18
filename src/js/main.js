import {loadAssets} from './assets.js';
import {drawGame} from './draw.js';
import {canvas, ctx} from './elements.js';
import {loadNextLevel} from './level.js';
import {setListeners} from './listeners.js';
import {updatePlayerPosition} from './movement.js';
import {resize} from './utils.js';


function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePlayerPosition();
    drawGame();
    requestAnimationFrame(update);
}

async function startGame() {
    await loadNextLevel();
    resize();
    setListeners();
    update();
}

(() => {
    loadAssets()
        .then(resize)
        .finally(startGame);
})();
