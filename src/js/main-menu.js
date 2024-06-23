import {canvas, ctx} from './elements.js';
import {Game, startGame} from './game.js';
import {drawWrappedText} from './utils.js';

const menuOptions = [{
    isSelected: false,
    title: 'Resume',
    display: false,
    id: '_resume_',
}, {
    isSelected: false,
    title: 'Load last save',
    display: false,
    id: '_last_save_',
}, {
    isSelected: false,
    title: 'New Game',
    display: true,
    id: '_new_game_',
}, {
    isSelected: false,
    title: 'Controls',
    display: true,
    id: '_controls_',
}];
let filteredMenuOptions = [];

function getFilteredMenuOptions() {
    const filteredOptions = menuOptions.filter(option => option.display);
    filteredOptions[0].isSelected = true;
    return filteredOptions;
}

function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#002f4b');
    gradient.addColorStop(1, '#125f02');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawTitle() {
    const title = 'Main menu';
    const maxWidth = canvas.width * 0.8; // Maksymalna szerokość dla zawijania
    const lineHeight = 100;
    const x = canvas.width / 2;
    const y = 100;
    drawWrappedText(
        title,
        x, y,
        maxWidth,
        lineHeight,
        70,
        'NotJamBlackletter16',
        '#c77202',
        '#fff',
        4,
    );
}

function drawOptions() {
    const margin = 60;
    for (let i in filteredMenuOptions) {
        const option = filteredMenuOptions[i];
        const maxWidth = canvas.width * 0.8; // Maksymalna szerokość dla zawijania
        const lineHeight = 100;
        const x = canvas.width / 2;
        const y = 200 + (i * margin);
        if (option.isSelected) {
            drawWrappedText(
                option.title,
                x, y,
                maxWidth,
                lineHeight,
                50,
                'NotJamBlackletter16',
                '#c73d02',
                '#fff',
                4,
                true,
            );
            continue;
        }

        drawWrappedText(
            option.title,
            x, y,
            maxWidth,
            lineHeight,
            50,
            'NotJamBlackletter16',
            '#c77202',
            '#fff',
            4,
        );

    }
}


export function drawMainMenu() {
    if (!Game.showMainMenu) {
        return;
    }
    drawBackground();
    drawTitle();
    drawOptions();
    requestAnimationFrame(drawMainMenu);
}

export function showMainMenu() {
    Game.showMainMenu = true;
    filteredMenuOptions = getFilteredMenuOptions();
    drawMainMenu();

    window.addEventListener('keydown', e => {
        if (e.code === 'Enter') {
            const selectedOption = filteredMenuOptions.find(opt => opt.isSelected);
            switch (selectedOption.id) {
                case '_resume_':
                    break;
                case '_last_save_':
                    break;
                case '_new_game_':
                    Game.showMainMenu = false;
                    startGame();
                    break;
                case '_controls_':
                    break;
            }
        }
        if (e.code === 'Escape') {
        }
        if (['ArrowUp', 'ArrowDown'].includes(e.code)) {
            let selectedIndex = filteredMenuOptions.findIndex(opt => opt.isSelected);
            if (e.code === 'ArrowUp') {
                if (selectedIndex === 0) {
                    return;
                }
                selectedIndex--;
            }
            if (e.code === 'ArrowDown') {
                if (selectedIndex >= filteredMenuOptions.length - 1) {
                    return;
                }
                selectedIndex++;
            }
            filteredMenuOptions.forEach(option => option.isSelected = false);
            filteredMenuOptions[selectedIndex].isSelected = true;
        }
    });
}
