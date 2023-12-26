class Cloud extends MovableObject {
    height = 250;
    width = 500;
    static cloudX = -1438;

    constructor(cloud) {
        super().loadImage(cloud);
        this.x = Cloud.cloudX;
        Cloud.cloudX += 300;
        this.y = Math.random() * 100;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }

}