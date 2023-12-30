class StatusBarHealthBoss extends DrawableObject {
    percentage = 0;
    otherDirection = true;

    constructor() {
        super();
        this.loadImages(assets.IMAGES_STATUSBAR_BOSS);
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = assets.IMAGES_STATUSBAR_BOSS[this.getImageIndex()];
        this.img = this.imageCache[path];
    }
}