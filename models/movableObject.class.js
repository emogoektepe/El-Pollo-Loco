class MovableObject {
    x = 120;
    y = 300;
    height = 150;
    width = 100;
    img;

    constructor() {

    }

    loadImage(path) {
        this.img = new Image(); // equals to // this.img = document.getElementById('image') <img id='image' src>
        this.img.src = path;
    }

    moveRight() {
        console.log('Movin Right');
    }

    moveLeft() {
        console.log('Movin Left');
    }
}