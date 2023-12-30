class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    speed = 4.5;
    world;
    danger = false;
    offset = {
        top: 60,
        bottom: 10,
        left: 0,
        right: 0
    }

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(assets.IMAGES_ALERT_BOSS);
        this.loadImages(assets.IMAGES_HURT_BOSS);
        this.loadImages(assets.IMAGES_DEAD_BOSS);
        this.loadImages(assets.IMAGES_WALKING_BOSS);
        this.loadImages(assets.IMAGES_ATTACK_BOSS);
        this.x = 3300;
        this.animate();
    }

    animate() {
        const moveLeft = setInterval(() => {
            if (this.danger && this.x > this.world.character.x + this.world.character.width) {
                this.moveLeft();
            } else {
                this.danger = false;
            }
        }, 1000 / 60);


        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(assets.IMAGES_HURT_BOSS);
            } else if (this.isDead()) {
                clearInterval(moveLeft);
                this.playAnimation(assets.IMAGES_DEAD_BOSS);
            } else if (this.danger) {
                this.playAnimation(assets.IMAGES_WALKING_BOSS);
            } else if (this.characterNearEndboss()) {
                this.playAnimation(assets.IMAGES_ATTACK_BOSS);
                setTimeout(() => {
                    this.x -= 20;
                }, 200);
            } else {
                this.playAnimation(assets.IMAGES_ALERT_BOSS);
            }
        }, 150);
    }

    checkDangerArea() {
        if (this.characterNearEndboss()) {
            sounds.CHICKEN_SCREAM.play();
            sounds.DANGER_MUSIC.play();
            this.danger = true;

        }
    }

    characterNearEndboss() {
        return this.world.character.x + this.world.character.width + 400 > this.x;
    }
}