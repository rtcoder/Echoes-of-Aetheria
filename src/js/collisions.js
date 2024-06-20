function checkCollision(player, obstacles) {
    for (const obstacle of obstacles) {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            return true;
        }
    }

    return false;
}

export function detectCollision(player, walls) {
    let collision = {
        top: false,
        bottom: false,
        left: false,
        right: false,
    };
    for (const wall of walls) {
        if (player.x < wall.x + wall.width &&
            player.x + player.width > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.height > wall.y) {

            let playerBottom = player.y + player.height;
            let playerTop = player.y;
            let playerRight = player.x + player.width;
            let playerLeft = player.x;

            let wallBottom = wall.y + wall.height;
            let wallTop = wall.y;
            let wallRight = wall.x + wall.width;
            let wallLeft = wall.x;

            let bottomCollision = wallBottom - playerTop;
            let topCollision = playerBottom - wallTop;
            let leftCollision = playerRight - wallLeft;
            let rightCollision = wallRight - playerLeft;

            let minCollision = Math.min(bottomCollision, topCollision, leftCollision, rightCollision);
            if (minCollision === bottomCollision) {
                collision.top = true;
            }else if (minCollision === topCollision) {
                collision.bottom = true;
            }else if (minCollision === leftCollision) {
                collision.right = true;
            }else if (minCollision === rightCollision) {
                collision.left = true;
            }
        }
    }

    return collision;
}
