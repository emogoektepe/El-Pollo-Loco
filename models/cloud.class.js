class Cloud extends MovableObject {

    y = 0;
    height = 350;
    width = 600;
    speed = 0.15;

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

}