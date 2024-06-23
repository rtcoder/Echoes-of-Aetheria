import {Game} from '../game.js';

export function movePlatforms() {
    Game.level.walls.filter(w => w.isMoving)
        .forEach(wall => {
            wall.x += wall.move.moveDirection.x;
            if (wall.x <= wall.move.from.x || wall.x >= wall.move.to.x) {
                wall.move.moveDirection.x = -wall.move.moveDirection.x;
            }
            wall.y += wall.move.moveDirection.y;
            if (wall.y <= wall.move.from.y || wall.y >= wall.move.to.y) {
                wall.move.moveDirection.y = -wall.move.moveDirection.y;
            }
        });
}
