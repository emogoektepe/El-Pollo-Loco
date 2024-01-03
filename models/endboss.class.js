/**
 * Represents the end boss character in the game.
 */
class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    speed = 7.5;
    world;
    danger = false;
    offset = {
        top: 60,
        bottom: 10,
        left: 0,
        right: 0
    }
    winningScreen = document.getElementById('endScreen');
    winningTitle = document.getElementById('endScreenHeader');

    /**
     * Creates an Endboss object.
     */
    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(assets.IMAGES_ALERT_BOSS);
        this.loadImages(assets.IMAGES_HURT_BOSS);
        this.loadImages(assets.IMAGES_DEAD_BOSS);
        this.loadImages(assets.IMAGES_WALKING_BOSS);
        this.loadImages(assets.IMAGES_ATTACK_BOSS);
        this.x = 3300;
        this.animate();
    }

    /**
     * Handles actions when the chicken boss is defeated.
     */
    chickenDead() {
        sounds.DANGER_MUSIC.pause();
        utils.clearAllIntervals();
        sounds.WIN.play();
        game.gameStart = false;
        this.winningTitle.innerText = 'YOU WIN!';
        this.winningScreen.style.display = 'flex';
    }

    /**
     * Animates the boss character based on its state.
     * @param {NodeJS.Timeout} moveLeft - Interval for boss movement.
     */
    bossAnimation(moveLeft) {
        if (this.isHurt()) {
            this.playAnimation(assets.IMAGES_HURT_BOSS);
        } else if (this.isDead()) {
            clearInterval(moveLeft);
            setTimeout(() => this.chickenDead(), 500);
            this.playAnimation(assets.IMAGES_DEAD_BOSS);
        } else if (this.danger) {
            this.playAnimation(assets.IMAGES_WALKING_BOSS);
        } else if (this.characterNearEndboss()) {
            this.playAnimation(assets.IMAGES_ATTACK_BOSS);
            setTimeout(() => this.x -= 20, 200);
        } else {
            this.playAnimation(assets.IMAGES_ALERT_BOSS);
        }
    }

    /**
     * Moves the boss character.
     */
    bossMove() {
        if (this.danger && this.x > this.world.character.x + this.world.character.width) {
            this.moveLeft();
        } else {
            this.danger = false;
        }
    }

    /**
     * Initiates the animation for the boss character.
     */
    animate() {
        const moveLeft = setInterval(() => this.bossMove(), 1000 / 60);
        setInterval(() => this.bossAnimation(moveLeft), 150);
    }

    /**
     * Checks if the character is near the end boss, setting the danger state and playing sounds accordingly.
     */
    checkDangerArea() {
        if (this.characterNearEndboss()) {
            sounds.CHICKEN_SCREAM.play();
            sounds.DANGER_MUSIC.play();
            sounds.INTRO_SOUND.pause();
            this.danger = true;

        }
    }

    /**
     * Checks if the character is near the end boss.
     * @returns {boolean} Whether the character is near the end boss.
     */
    characterNearEndboss() {
        return this.world.character.x + this.world.character.width + 400 > this.x;
    }
}