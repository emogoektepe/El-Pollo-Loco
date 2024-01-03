/**
 * Represents the status bar for the bottle in the game inheriting properties from DrawableObject.
 */
class StatusBarBottle extends DrawableObject {
    percentage = 0;

    /**
     * Create a status bar for the bottle.
     */
    constructor() {
        super();
        this.loadImages(assets.IMAGES_STATUSBAR_BOTTLE);
        this.x = 260;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the bottle's status and updates the displayed image accordingly.
     * @param {number} percentage - The percentage value to set for the bottle's status.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = assets.IMAGES_STATUSBAR_BOTTLE[this.getImageIndex()];
        this.img = this.imageCache[path];
    }
}