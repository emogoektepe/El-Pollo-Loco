class StatusBarBottle extends DrawableObject {
    percentage = 0;

    constructor() {
        super();
        this.loadImages(assets.IMAGES_STATUSBAR_BOTTLE);
        this.x = 260;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = assets.IMAGES_STATUSBAR_BOTTLE[this.getImageIndex()];
        this.img = this.imageCache[path];
    }
}