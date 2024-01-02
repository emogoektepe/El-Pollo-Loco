class Character extends MovableObject {
    height = 300;
    width = 150;
    y = 150;
    speed = 10;
    world;
    timer = 0;
    offset = {
        top: 110,
        bottom: 10,
        left: 20,
        right: 20
    }
    energy = 1;
    losingScreen = document.getElementById('endScreen');
    losingTitle = document.getElementById('endScreenHeader');

    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(assets.IMAGES_WALKING_CHARACTER);
        this.loadImages(assets.IMAGES_JUMPING_CHARACTER);
        this.loadImages(assets.IMAGES_DEAD_CHARACTER);
        this.loadImages(assets.IMAGES_HURT_CHARACTER);
        this.loadImages(assets.IMAGES_IDLE_CHARACTER);
        this.loadImages(assets.IMAGES_LONG_IDLE_CHARACTER);
        this.applyGravity();
        this.animate();
    }
    
    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x + this.width < this.world.endboss.x + 50) {
                this.moveRight();
                this.otherDirection = false;
                if (!this.isAboveGround()) {
                    sounds.WALKING_SOUND_CHARACTER.play();
                }
            }
            if (this.world.keyboard.LEFT && this.x > -1300) {
                this.moveLeft();
                this.otherDirection = true;
                if (!this.isAboveGround()) {
                    sounds.WALKING_SOUND_CHARACTER.play();
                }
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.isHurt()) {
                sounds.JUMP_SOUND_CHARACTER.play();
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.timer = 0;
                setTimeout(() => {
                    utils.clearAllIntervals();
                    sounds.INTRO_SOUND.pause();
                    this.losingTitle.innerText = 'YOU LOSE!';
                    this.losingScreen.style.display = 'flex';
                    game.gameStart = false;
                }, 500);
                sounds.LOSE_SOUND_CHARACTER.play();
                this.playAnimation(assets.IMAGES_DEAD_CHARACTER);
            } else if (this.isHurt()) {
                sounds.HURT_SOUND_CHARACTER.play();
                this.timer = 0;
                this.playAnimation(assets.IMAGES_HURT_CHARACTER);
            } else if (this.isAboveGround()) {
                this.timer = 0;
                this.playAnimation(assets.IMAGES_JUMPING_CHARACTER);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.timer = 0;
                this.playAnimation(assets.IMAGES_WALKING_CHARACTER);
            } else if (this.timer < 30) {
                this.playAnimation(assets.IMAGES_IDLE_CHARACTER);
            } else {
                this.playAnimation(assets.IMAGES_LONG_IDLE_CHARACTER);
            }
            this.timer++
        }, 150);
    }
}