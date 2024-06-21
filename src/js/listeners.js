import {joystick} from './elements.js';
import {handleJoystickEnd, handleJoystickMove, handleJoystickStart} from './joystck.js';
import {keydown, keyup} from './keys.js';
import {resize} from './utils.js';

export function setListeners() {
    joystick.addEventListener('touchstart', handleJoystickStart, false);
    joystick.addEventListener('touchmove', handleJoystickMove, false);
    joystick.addEventListener('touchend', handleJoystickEnd, false);
    joystick.addEventListener('touchcancel', handleJoystickEnd, false);

    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);
}

// actionButton.addEventListener('touchstart', handleActionButton, false);
