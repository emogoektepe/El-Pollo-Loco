/**
 * Represents a character in the game.
 * @extends MovableObject
 */
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
    losingScreen = document.getElementById('endScreen');
    losingTitle = document.getElementById('endScreenHeader');

    /**
     * Creates a character object.
     */
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

    /**
     * Moves the character to the right.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) {
            sounds.WALKING_SOUND_CHARACTER.play();
        }
    }

    /**
     * Moves the character to the left.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround()) {
            sounds.WALKING_SOUND_CHARACTER.play();
        }
    }

    /**
    * Checks if the character can move right.
    * @returns {boolean} True if the character can move right, otherwise false.
    */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x + this.width < this.world.endboss.x + 50;
    }

    /**
     * Checks if the character can move left.
     * @returns {boolean} True if the character can move left, otherwise false.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -1300;
    }

    /**
     * Checks if the character can jump.
     * @returns {boolean} True if the character can jump, otherwise false.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround() && !this.isHurt();
    }

    /**
     * Moves the character based on user input.
     */
    moveCharacter() {
        if (this.canMoveRight()) this.moveRight();
        else if (this.canMoveLeft()) this.moveLeft();
        if (this.canJump()) sounds.JUMP_SOUND_CHARACTER.play() && this.jump();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Handles character's death actions.
     */
    characterDead() {
        utils.clearAllIntervals();
        sounds.INTRO_SOUND.pause();
        this.losingTitle.innerText = 'YOU LOSE!';
        this.losingScreen.style.display = 'flex';
        game.gameStart = false;
    }

    /**
     * Animates the character based on its state.
     */
    characterAnimation() {
        if (this.isDead()) {
            this.timer = 0;
            setTimeout(() => this.characterDead(), 500);
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
    }

    /**
     * Initiates character movement and animation intervals.
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.characterAnimation(), 150);
    }
}