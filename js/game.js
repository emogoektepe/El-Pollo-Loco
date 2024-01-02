const game = {
    canvas: null,
    world: null,
    keyboard: new Keyboard(),
    gameStart: false,

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

    newGame() {
        document.getElementById('endScreen').style.display = 'none';
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
}


