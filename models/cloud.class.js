/**
 * Represents a cloud object in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    height = 250;
    width = 500;
    static cloudX = -1438;

    /**
     * Creates a cloud object.
     * @param {string} cloud - The image path for the cloud.
     */
    constructor(cloud) {
        super().loadImage(cloud);
        this.x = Cloud.cloudX;
        Cloud.cloudX += 300;
        this.y = Math.random() * 100;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
    * Initiates animation for the cloud.
    */
    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60)
    }

}