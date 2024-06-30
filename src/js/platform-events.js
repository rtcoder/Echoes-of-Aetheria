import {Game} from './game.js';

export function platformOnTouch(platform) {
    const {onTouch} = platform;
    if (onTouch.remove) {
        if (onTouch.remove === '__self__') {
            Game.level.walls = Game.level.walls.filter(wall => wall.id !== platform.id);
        }
    }
}
