const game = {
    canvas: null,
    world: null,
    keyboard: new Keyboard(),
    gameStart: false,

    init() {
        sounds.INTRO_SOUND.play();
        sounds.initialize();
        this.initializeKeyboard();
        this.canvas = document.getElementById('canvas');
        this.world = new World(this.canvas, this.keyboard);
        sounds.INTRO_SOUND.addEventListener('ended', function () {
            sounds.INTRO_SOUND.currentTime = 0;
            sounds.INTRO_SOUND.play();
        });
    },

    startGame() {
        this.gameStart = true;
        document.getElementById('overlay').style.display = 'none';
        levels.level1.enemies.forEach(enemy => {
            if (enemy instanceof Chicken) {
                enemy.move();
            }
        });
    },

    openInfoDialog() {
        document.getElementById('infos-wrap').style.display = 'block';
    },

    closeInfoDialog() {
        document.getElementById('infos-wrap').style.display = 'none';
    },

    doNotClose(event) {
        event.stopPropagation();
    },

    initializeKeyboard() {
        window.addEventListener('keydown', (e) => {
            if (this.gameStart) {
                if (e.keyCode == 32) {
                    this.keyboard.SPACE = true;
                }
                if (e.keyCode == 37) {
                    this.keyboard.LEFT = true;
                }
                if (e.keyCode == 38) {
                    this.keyboard.UP = true;
                }
                if (e.keyCode == 39) {
                    this.keyboard.RIGHT = true;
                }
                if (e.keyCode == 40) {
                    this.keyboard.DOWN = true;
                }
                if (e.keyCode == 66) {
                    this.keyboard.B = true;
                }
            }
        }),

            window.addEventListener('keyup', (e) => {
                if (this.gameStart) {
                    if (e.keyCode == 32) {
                        this.keyboard.SPACE = false;
                    }
                    if (e.keyCode == 37) {
                        this.keyboard.LEFT = false;
                    }
                    if (e.keyCode == 38) {
                        this.keyboard.UP = false;
                    }
                    if (e.keyCode == 39) {
                        this.keyboard.RIGHT = false;
                    }
                    if (e.keyCode == 40) {
                        this.keyboard.DOWN = false;
                    }
                    if (e.keyCode == 66) {
                        this.keyboard.B = false;
                    }
                }
            });
    }
}


