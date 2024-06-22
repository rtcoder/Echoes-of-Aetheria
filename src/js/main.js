import {loadAssets} from './assets.js';
import {Game} from './game.js';
import {isTouchDevice, resize} from './utils.js';
import {showWelcomeScreen} from './welcome-screen.js';

window.onresize = resize;

Game.isTouchDevice = isTouchDevice();
if(Game.isTouchDevice){
    document.querySelector('.touch-controls').style.removeProperty('display')
}
(() => {
    resize();
    loadAssets().then(showWelcomeScreen)
        .then(
            resize);
})();
