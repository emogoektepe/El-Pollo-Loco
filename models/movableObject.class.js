/**
 * Represents a movable object in the game inheriting properties from DrawableObject.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    /**
     * Decreases the energy of the object when hit by a boss chicken.
     * @returns {number} The updated energy level of the object.
     */
    hitBossChicken() {
        this.energy -= 20;
        return this.energy;
    }

    /**
     * Sets the energy level to zero indicating the object is hit by a normal chicken.
     */
    hitChicken() {
        this.energy = 0;
    }

    /**
     * Checks if the object's energy level is zero.
     * @returns {boolean} Indicates whether the object is dead or not.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Decreases the object's energy level when hit, sets the last hit timestamp.
     */
    hit() {
        this.energy -= 2.5;
        if (this.energy < 20) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is in a hurt state based on the time since the last hit.
     * @returns {boolean} Indicates whether the object is currently hurt or not.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.2;
    }

    /**
     * Checks if the object is colliding with another movable object based on their positions and offsets.
     * @param {MovableObject} movableObject - The other movable object to check collision against.
     * @returns {boolean} Indicates whether the objects are colliding or not.
     */
    isColliding(movableObject) {
        return this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom;
    }

    /**
     * Applies gravity to the object causing it to fall if not above the ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y > 150 && this instanceof Character) {
                    this.y = 150;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground level.
     * @returns {boolean} Indicates whether the object is above the ground or not.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }

    /**
     * Plays the animation for the object based on the provided image array.
     * @param {string[]} images - Array of image paths representing the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates a jump action for the object by setting its vertical speed.
     */
    jump() {
        this.speedY = 30;
    }
}