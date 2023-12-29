class Chicken extends MovableObject {
    y = 350;
    height = 90;
    width = 90;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_WALKING_SMALL = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]
    id;

    constructor(id) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_WALKING_SMALL);
        this.x = 300 + Math.random() * 2500;
        this.speed = 0.55 + Math.random() * 0.75;
        this.animate();
        this.id = id;
        if (this.id % 2 === 1) { 
            this.height = 50;
            this.width = 50;
            this.y = 380;
            this.speed = 10;
        }
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
        setInterval(() => {
            if (this.id % 2 === 0) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_WALKING_SMALL);
            }
        }, 200);
    }

}