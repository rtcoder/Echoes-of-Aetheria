import {joystick, joystickHandle} from './elements.js';
import {Game} from './game.js';

let joystickActive = false;
let joystickStartX, joystickStartY;

export function handleJoystickStart(event) {
    joystickActive = true;
    const touch = event.touches[0];
    joystickStartX = touch.clientX;
    joystickStartY = touch.clientY;
}

export function handleJoystickMove(event) {
    if (!joystickActive) {
        return;
    }
    const touch = event.touches[0];
    const deltaX = touch.clientX - joystickStartX;
    const deltaY = touch.clientY - joystickStartY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = joystick.clientWidth / 2;

    if (distance < maxDistance) {
        joystickHandle.style.left = `${25 + deltaX}px`;
        joystickHandle.style.top = `${25 + deltaY}px`;
    } else {
        const angle = Math.atan2(deltaY, deltaX);
        joystickHandle.style.left = `${25 + Math.cos(angle) * maxDistance}px`;
        joystickHandle.style.top = `${25 + Math.sin(angle) * maxDistance}px`;
    }

    Game.player.dx = deltaX / maxDistance * Game.player.speed;
    Game.player.dy = deltaY / maxDistance * Game.player.speed;
}

export function handleJoystickEnd() {
    joystickActive = false;
    joystickHandle.style.left = '25px';
    joystickHandle.style.top = '25px';
    Game.player.dx = 0;
    Game.player.dy = 0;
}

function handleActionButton() {
    console.log('Action button pressed!');
    // Dodaj tutaj logikę dla akcji gracza
}
