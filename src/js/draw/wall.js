import {Assets} from '../assets.js';
import {ctx} from '../elements.js';
import {CanvasShift, Game} from '../game.js';

function setWallFrameIndex(wall) {
    const gif = Assets.img[wall.gif];
    if (wall.frameDelay) {
        const now = performance.now();
        if (now - wall.lastFrameTime >= wall.frameDelay) {
            wall.frameIndex = (wall.frameIndex + 1) % Object.keys(gif).length;
            wall.lastFrameTime = now;
        }
    } else {
        wall.frameIndex = (wall.frameIndex + 1) % Object.keys(gif).length;
    }
}

function drawWallGif(wall) {
    const {gameFieldTop} = Game;
    const gif = Assets.img[wall.gif];

    setWallFrameIndex(wall);

    const frame = gif[wall.frameIndex];
    if (wall.repeat) {
        drawWallGifRepeat(wall);
        return;
    }

    ctx.drawImage(
        frame,
        wall.x + CanvasShift.x,
        wall.y + CanvasShift.y + gameFieldTop,
        wall.width,
        wall.height,
    );
}

function drawWallGifRepeat(wall) {
    const {gameFieldTop} = Game;
    const gif = Assets.img[wall.gif];
    const frame = gif[wall.frameIndex];

    const scaledHeight = wall.repeat === 'repeat-y'
        ? wall.width * (frame.height / frame.width)
        : wall.height;
    const scaledWidth = wall.repeat === 'repeat-x'
        ? wall.height * (frame.width / frame.height)
        : wall.width;

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = scaledWidth;
    tempCanvas.height = scaledHeight;

    tempCtx.drawImage(frame, 0, 0, scaledWidth, scaledHeight);

    const pattern = ctx.createPattern(tempCanvas, wall.repeat);

    ctx.save();

    ctx.translate(
        wall.x + CanvasShift.x,
        wall.y + CanvasShift.y + gameFieldTop,
    );

    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, wall.width, wall.height);

    ctx.restore();
}

function drawSingleWall(wall) {
    const {gameFieldTop} = Game;
    if (wall.gif) {
        drawWallGif(wall);
        return;
    }

    ctx.fillStyle = wall.color || (wall.type === 'ceiling' ? '#000' : '#09c');
    // ctx.fillStyle = wall.type==='ceiling'?'#000':'#09c';
    ctx.fillRect(
        wall.x + CanvasShift.x,
        wall.y + CanvasShift.y + gameFieldTop,
        wall.width,
        wall.height,
    );
}

export function drawWalls() {
    const {level} = Game;
    level.walls
        // .filter(w=>w.color)
        .forEach(drawSingleWall);
}
