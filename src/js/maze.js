/**
 * Reprezentuje ścianę na poziomie gry.
 * @typedef {Object} Wall
 * @property {number} x - Współrzędna x lewego górnego rogu ściany.
 * @property {number} y - Współrzędna y lewego górnego rogu ściany.
 * @property {number} width - Szerokość ściany.
 * @property {number} height - Wysokość ściany.
 */

const cellSize = 100;
const mazeWidth = 1000;
const mazeHeight = 21000;
const cols = mazeWidth / cellSize;
const rows = mazeHeight / cellSize;

/** @type {Wall[]} */
const walls = [];

// Generowanie labiryntu za pomocą DFS
function generateMaze() {
    const maze = Array.from({ length: rows }, () => Array(cols).fill(false));
    const stack = [];
    const directions = [
        [1, 0], // right
        [0, 1], // down
        [-1, 0], // left
        [0, -1] // up
    ];

    function isValid(x, y) {
        return x >= 0 && y >= 0 && x < cols && y < rows && !maze[y][x];
    }

    function carve(x, y) {
        maze[y][x] = true;
        directions.sort(() => Math.random() - 0.5);

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            const nnx = x + dx * 2;
            const nny = y + dy * 2;

            if (isValid(nnx, nny)) {
                maze[ny][nx] = true;
                carve(nnx, nny);
            }
        }
    }

    carve(0, 0);

    // Konwersja labiryntu na ściany
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (!maze[y][x]) {
                // dodaj górną ścianę
                if (y == 0 || maze[y - 1][x]) {
                    walls.push({ x: x * cellSize, y: y * cellSize, width: cellSize, height: 10 });
                }
                // dodaj dolną ścianę
                if (y == rows - 1 || maze[y + 1][x]) {
                    walls.push({ x: x * cellSize, y: (y + 1) * cellSize - 10, width: cellSize, height: 10 });
                }
                // dodaj lewą ścianę
                if (x == 0 || maze[y][x - 1]) {
                    walls.push({ x: x * cellSize, y: y * cellSize, width: 10, height: cellSize });
                }
                // dodaj prawą ścianę
                if (x == cols - 1 || maze[y][x + 1]) {
                    walls.push({ x: (x + 1) * cellSize - 10, y: y * cellSize, width: 10, height: cellSize });
                }
            }
        }
    }
}

generateMaze();

console.log(walls); // Wyświetlenie listy ścian

function createTemporaryCanvas() {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = mazeWidth;
    tempCanvas.height = mazeHeight;
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.fillStyle = 'black';
    walls.forEach(wall => {
        tempCtx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });

    return tempCanvas;
}

function downloadMaze() {
    const tempCanvas = createTemporaryCanvas();
    const link = document.createElement('a');
    link.download = 'maze.png';
    link.href = tempCanvas.toDataURL();
    link.click();
}
downloadMaze();

