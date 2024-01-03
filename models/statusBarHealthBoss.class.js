/**
 * Represents the status bar for the boss health inheriting properties from DrawableObject.
 */
class StatusBarHealthBoss extends DrawableObject {
    percentage = 0;
    otherDirection = true;

    /**
     * Creates a status bar for the boss health.
     */
    constructor() {
        super();
        this.loadImages(assets.IMAGES_STATUSBAR_BOSS);
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the boss health status and updates the displayed image accordingly.
     * @param {number} percentage - The percentage value to set for the boss health status.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = assets.IMAGES_STATUSBAR_BOSS[this.getImageIndex()];
        this.img = this.imageCache[path];
    }
}