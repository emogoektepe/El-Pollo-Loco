class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    energy = 100;
    speed = 3.5;
    world;
    danger = false;
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    offset = {
        top: 60,
        bottom: 10,
        left: 0,
        right: 0
    }

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        // this.x = 750;
        this.x = 3300;
        this.animate();
    }

    animate() {
        const moveLeft = setInterval(() => {
            if (this.danger && this.x > this.world.character.x + this.world.character.width) {
                this.moveLeft();
            } else {
                this.danger = false;
            }
        }, 1000 / 60);


        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isDead()) {
                clearInterval(moveLeft);
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.danger) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.characterNearEndboss()) {
                this.playAnimation(this.IMAGES_ATTACK);
                setTimeout(() => {
                    this.x -= 20;
                }, 200);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 150);
    }

    checkDangerArea() {
        if (this.characterNearEndboss()) {
            this.danger = true;
        }
    }

    characterNearEndboss() {
        return this.world.character.x + this.world.character.width + 400 > this.x;
    }
}