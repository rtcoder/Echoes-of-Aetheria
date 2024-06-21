export const Keys = {
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false,
    KeyW: false,
    KeyS: false,
    KeyA: false,
    KeyD: false,
    Space: false,
};

export function keydown(e) {
    Keys[e.code] = true;
}

export function keyup(e) {
    console.log(e);
    Keys[e.code] = false;
}
