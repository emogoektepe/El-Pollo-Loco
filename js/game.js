/**
 * Game object containing properties and methods to manage the game.
 * @typedef {Object} Game
 * @property {HTMLCanvasElement | null} canvas - Reference to the game canvas element.
 * @property {World | null} world - Reference to the game world.
 * @property {Keyboard} keyboard - Keyboard input handler for the game.
 * @property {boolean} gameStart - Indicates whether the game has started.
 * @property {function} init - Initializes the game.
 * @property {function} startGame - Starts the game.
 * @property {function} openInfoDialog - Opens the information dialog.
 * @property {function} closeInfoDialog - Closes the information dialog.
 * @property {function} doNotClose - Prevents closing when an event occurs.
 */

/**
 * Game object managing various aspects of the game.
 * @type {Game}
 */
const game = {
    canvas: null,
    world: null,
    keyboard: new Keyboard(),
    gameStart: false,

    /**
     * Initializes the game.
     */
    init() {
        sounds.INTRO_SOUND.play();
        sounds.initialize();
        this.canvas = document.getElementById('canvas');
        this.world = new World(this.canvas, this.keyboard);
        sounds.INTRO_SOUND.addEventListener('ended', function () {
            sounds.INTRO_SOUND.currentTime = 0;
            sounds.INTRO_SOUND.play();
        });
    },

    /**
     * Starts the game.
     */
    startGame() {
        this.gameStart = true;
        const mobileTab = document.getElementById('mobileTab');
        if (utils.isMobile()) {
            mobileTab.style.display = 'flex';
        }
        document.getElementById('overlay').style.display = 'none';
        levels.level1.enemies.forEach(enemy => {
            if (enemy instanceof Chicken) {
                enemy.move();
            }
        });
    },

    /**
     * Opens the information dialog.
     */
    openInfoDialog() {
        document.getElementById('infos-wrap').style.display = 'block';
    },

    /**
     * Closes the information dialog.
     */
    closeInfoDialog() {
        document.getElementById('infos-wrap').style.display = 'none';
    },
    
    /**
     * Prevents closing when an event occurs.
     * @param {Event} event - The event triggered.
     */
    doNotClose(event) {
        event.stopPropagation();
    },
}


