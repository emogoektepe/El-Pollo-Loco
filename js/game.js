let canvas;
let world;
let keyboard = new Keyboard();
let gameStart = false;

function init() {
    sounds.INTRO_SOUND.play();
    sounds.initialize();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    sounds.INTRO_SOUND.addEventListener('ended', function () {
        sounds.INTRO_SOUND.currentTime = 0;
        sounds.INTRO_SOUND.play();
    });
}

function startGame() {
    gameStart = true;
    document.getElementById('overlay').style.display = 'none';
    levels.level1.enemies.forEach(enemy => {
        if (enemy instanceof Chicken) {
            enemy.move();
        }
    });
}

window.addEventListener('keydown', (e) => {
    if (gameStart) {
        if (e.keyCode == 32) {
            keyboard.SPACE = true;
        }
        if (e.keyCode == 37) {
            keyboard.LEFT = true;
        }
        if (e.keyCode == 38) {
            keyboard.UP = true;
        }
        if (e.keyCode == 39) {
            keyboard.RIGHT = true;
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = true;
        }
        if (e.keyCode == 66) {
            keyboard.B = true;
        }
    }
});

window.addEventListener('keyup', (e) => {
    if (gameStart) {
        if (e.keyCode == 32) {
            keyboard.SPACE = false;
        }
        if (e.keyCode == 37) {
            keyboard.LEFT = false;
        }
        if (e.keyCode == 38) {
            keyboard.UP = false;
        }
        if (e.keyCode == 39) {
            keyboard.RIGHT = false;
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = false;
        }
        if (e.keyCode == 66) {
            keyboard.B = false;
        }
    }
});