class StatusBarCoin extends DrawableObject {
    percentage = 0;

    constructor() {
        super();
        this.loadImages(assets.IMAGES_STATUSBAR_COIN);
        this.x = 500;
        this.y = 0;;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = assets.IMAGES_STATUSBAR_COIN[this.getImageIndex()];
        this.img = this.imageCache[path];
    }
}