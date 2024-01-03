/**
 * Represents the status bar for health in the game inheriting properties from DrawableObject.
 */
class StatusBarHealth extends DrawableObject {
    percentage = 100;

    /**
     * Constructs a status bar for the health.
     */
    constructor() {
        super();
        this.loadImages(assets.IMAGES_STATUSBAR_HEALTH);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the health status and updates the displayed image accordingly.
     * @param {number} percentage - The percentage value to set for the health status.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = assets.IMAGES_STATUSBAR_HEALTH[this.getImageIndex()];
        this.img = this.imageCache[path];
    }

}