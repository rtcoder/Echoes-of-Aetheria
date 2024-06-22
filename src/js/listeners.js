import {actionButton, joystick} from './elements.js';
import {handleActionButton, handleJoystickEnd, handleJoystickMove, handleJoystickStart} from './joystck.js';
import {keydown, keyup} from './keys.js';

export function setListeners() {
    joystick.addEventListener('contextmenu', e=>{
        e.preventDefault();
    }, false);
    joystick.addEventListener('touchstart', handleJoystickStart, false);
    joystick.addEventListener('touchmove', handleJoystickMove, false);
    joystick.addEventListener('touchend', handleJoystickEnd, false);
    joystick.addEventListener('touchcancel', handleJoystickEnd, false);

    actionButton.addEventListener('touchstart', handleActionButton, false);

    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);
}


