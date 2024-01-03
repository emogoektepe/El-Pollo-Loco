/**
 * Represents the status bar for the coin in the game inheriting properties from DrawableObject.
 */
class StatusBarCoin extends DrawableObject {
    percentage = 0;

    /**
     * Creates a status bar for the coin.
     */
    constructor() {
        super();
        this.loadImages(assets.IMAGES_STATUSBAR_COIN);
        this.x = 500;
        this.y = 0;;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the coin's status and updates the displayed image accordingly.
     * @param {number} percentage - The percentage value to set for the coin's status.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = assets.IMAGES_STATUSBAR_COIN[this.getImageIndex()];
        this.img = this.imageCache[path];
    }
}