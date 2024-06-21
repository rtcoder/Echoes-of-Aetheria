import {loadAssets} from './assets.js';
import {resize} from './utils.js';
import {showWelcomeScreen} from './welcome-screen.js';

window.onresize = resize;
(() => {
    resize();
    loadAssets().then(showWelcomeScreen);
})();
