class StatusBarHealth extends DrawableObject {
    percentage = 100;

    constructor() {
        super();
        this.loadImages(assets.IMAGES_STATUSBAR_HEALTH);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = assets.IMAGES_STATUSBAR_HEALTH[this.getImageIndex()];
        this.img = this.imageCache[path];
    }

}