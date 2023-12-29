class ThrowableObject extends MovableObject {

    IMAGES_ROTATE_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    offset = {
        top: 55,
        bottom: 50,
        left: 40,
        right: 40
    }
    id;

    constructor(x, y, id) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATE_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
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
            this.playAnimation(this.IMAGES_ROTATE_BOTTLE);
        }, 100)
    }

    shatterBottle() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 50);
    }

}