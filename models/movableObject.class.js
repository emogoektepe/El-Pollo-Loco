class MovableObject {
    x = 120;
    y = 300;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;

    constructor() {

    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    loadImage(path) {
        this.img = new Image(); // equals to // this.img = document.getElementById('image') <img id='image' src>
        this.img.src = path;
    }

    moveRight() {
        console.log('Movin Right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }
}