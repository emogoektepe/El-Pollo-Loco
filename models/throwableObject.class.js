/**
 * Represents a throwable object inheriting properties from MovableObject.
 */
class ThrowableObject extends MovableObject {

    offset = {
        top: 55,
        bottom: 50,
        left: 40,
        right: 40
    }
    id;

    /**
     * Constructs a throwable object at a specified position with a given identifier.
     * @param {number} x - The x-coordinate position of the throwable object.
     * @param {number} y - The y-coordinate position of the throwable object.
     * @param {number} id - The unique identifier for the throwable object.
     */
    constructor(x, y, id) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(assets.IMAGES_ROTATE_BOTTLE);
        this.loadImages(assets.IMAGES_SPLASH);
        this.id = id;
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.throw();
    }

    /**
     * Initiates the throwing action for the throwable object by setting initial properties.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => this.x += 7, 1000 / 60);
        setInterval(() => this.playAnimation(assets.IMAGES_ROTATE_BOTTLE), 100);
    }

    /**
     * Triggers the shattering of the bottle and plays the shatter sound.
     */
    shatterBottle() {
        sounds.BOTTLE_SHATTER.play();
        setInterval(() => this.playAnimation(assets.IMAGES_SPLASH), 50);
    }

}