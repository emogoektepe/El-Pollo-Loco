class Chicken extends MovableObject {
    y = 350;
    height = 90;
    width = 90;
    id;

    constructor(id) {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(assets.IMAGES_WALKING_CHICKEN);
        this.loadImages(assets.IMAGES_WALKING_SMALL_CHICKEN);
        this.x = 500 + Math.random() * 2500;
        this.speed = 0.55 + Math.random() * 0.75;
        this.animate();
        this.id = id;
        if (this.id % 2 === 1) {
            this.height = 50;
            this.width = 50;
            this.y = 380;
            this.speed = 20;
        }
    }

    animate() {
        setInterval(() => {
            if (this.id % 2 === 0) {
                this.playAnimation(assets.IMAGES_WALKING_CHICKEN);
            } else {
                this.playAnimation(assets.IMAGES_WALKING_SMALL_CHICKEN);
            }
        }, 200);
    }

    move() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
}