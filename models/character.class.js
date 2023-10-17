class Character extends MovableObject {
    x = 100;
    y = 190;
    height = 250;
    width = 100;
    speed = 2;

    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png',
    ]
    world;

    walking_sound = new Audio('../audio/walk.mp3');
    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        this.walking_sound.volume = 0.1;
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.direction = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.direction = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 360);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let path = this.IMAGES_WALKING[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
                if (this.currentImage >= this.IMAGES_WALKING.length) {
                    this.currentImage = 0;
                }
            } else {
                this.loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
            }
        }, 100);
    }

    jump() {

    }
}