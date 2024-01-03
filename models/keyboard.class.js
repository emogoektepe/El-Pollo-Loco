/**
 * Handles keyboard and touch events for game controls.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    B = false;

    /**
     * Constructs a Keyboard object and initializes keyboard and touch event listeners.
     */
    constructor() {
        this.initializeKeyboard();
        this.initializeMobileButtons();
    }

    /**
     * Initializes keyboard event listeners for controlling the game.
     */
    initializeKeyboard() {
        window.addEventListener('keydown', (e) => {
            if (game.gameStart) {
                if (e.keyCode == 32) {
                    this.SPACE = true;
                }
                if (e.keyCode == 37) {
                    this.LEFT = true;
                }
                if (e.keyCode == 38) {
                    this.UP = true;
                }
                if (e.keyCode == 39) {
                    this.RIGHT = true;
                }
                if (e.keyCode == 40) {
                    this.DOWN = true;
                }
                if (e.keyCode == 66) {
                    this.B = true;
                }
            }
        }),

            window.addEventListener('keyup', (e) => {
                if (game.gameStart) {
                    if (e.keyCode == 32) {
                        this.SPACE = false;
                    }
                    if (e.keyCode == 37) {
                        this.LEFT = false;
                    }
                    if (e.keyCode == 38) {
                        this.UP = false;
                    }
                    if (e.keyCode == 39) {
                        this.RIGHT = false;
                    }
                    if (e.keyCode == 40) {
                        this.DOWN = false;
                    }
                    if (e.keyCode == 66) {
                        this.B = false;
                    }
                }
            });
    }

    /**
     * Initializes touch event listeners for mobile controls.
     */
    initializeMobileButtons(){
        document.getElementById('leftArrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('leftArrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('rightArrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('rightArrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('upArrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        document.getElementById('upArrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        document.getElementById('bottleBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.B = true;
        });

        document.getElementById('bottleBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.B = false;
        });
    }
}


