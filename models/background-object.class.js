class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;
    constructor(imagePth, x) {
        super().loadImage(imagePth);
        this.x = x;
        this.y = 480 - this.height;
    }

}