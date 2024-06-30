import {Game} from './game.js';
import {PlayerEquipment} from './PlayerEquipment.js';

function removeAction(remove, platform) {
    if (!remove || !remove.id) {
        return;
    }
    if (remove.require) {
        const {require} = remove;
        if (require.equipment_item) {
            const {equipment_item} = require;
            if (equipment_item) {
                const foundItem = PlayerEquipment.findItem(equipment_item);
                if (!foundItem) {
                    return;
                }
            }
        }
    }

    if (remove.id === '__self__') {
        Game.level.walls = Game.level.walls.filter(wall => wall.id !== platform.id);
    }else {
        Game.level.walls = Game.level.walls.filter(wall => wall.id !== remove.id);
    }
}

export function platformOnTouch(platform) {
    const {onTouch} = platform;
    const {remove} = onTouch;

    if (remove) {
        removeAction(remove,platform)
    }
}
