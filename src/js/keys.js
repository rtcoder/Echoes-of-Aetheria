export const Keys = {};

export function keydown(e){
    Keys[e.key] = true;
}
export function keyup(e){
    Keys[e.key] = false;
}
