class StatusBarHealthBoss extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ]
    percentage = 0;
    otherDirection = true;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 260;
        this.y = -10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }
}