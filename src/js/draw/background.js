import {Assets} from '../assets.js';
import {ctx} from '../elements.js';
import {CanvasShift, Game, Player} from '../game.js';

export function drawBackground() {
    const {level, gameFieldTop} = Game;
    const {backgrounds} = level;
    backgrounds.forEach(background => {
        for (let i = -1; i <= 1; i++) {
            ctx.drawImage(
                Assets.img.bg[background.img],
                CanvasShift.x + background.position.x + Player.x * background.paralax.x + (level.size.width * i),
                CanvasShift.y + gameFieldTop + background.position.y + Player.y * background.paralax.y ,
                level.size.width,
                level.size.height,
            );
        }
    });
}

export function drawForeground() {
    const {level, gameFieldTop} = Game;
    const {foregrounds} = level;
    foregrounds.forEach(foreground => {
        for (let i = -2; i <= 2; i++) {
            ctx.drawImage(
                Assets.img.bg[foreground.img],
                CanvasShift.x + foreground.position.x + (Player.x * foreground.paralax.x) + (level.size.width * i),
                CanvasShift.y + gameFieldTop + foreground.position.y + Player.y * foreground.paralax.y ,
                level.size.width,
                level.size.height,
            );
        }
    });
}
