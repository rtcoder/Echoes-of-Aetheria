export const Keys = {};

export function keydown(e){
    Keys[e.code] = true;
}
export function keyup(e){
    console.log(e)
    Keys[e.code] = false;
}
