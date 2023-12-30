class ThrowableObject extends MovableObject {

    offset = {
        top: 55,
        bottom: 50,
        left: 40,
        right: 40
    }
    id;

    constructor(x, y, id) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(assets.IMAGES_ROTATE_BOTTLE);
        this.loadImages(assets.IMAGES_SPLASH);
        this.id = id;
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 7;
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(assets.IMAGES_ROTATE_BOTTLE);
        }, 100)
    }

    shatterBottle() {
        setInterval(() => {
            this.playAnimation(assets.IMAGES_SPLASH);
        }, 50);
    }

}