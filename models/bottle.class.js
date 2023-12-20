class Bottle extends MovableObject {

    y = 350;
    x = 250;
    height = 80;
    width = 80;
    static bottleX = 450;
    id;

    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20
    }

    constructor(id, img) {
        super().loadImage(img);
        this.x = Bottle.bottleX;
        Bottle.bottleX += 300;
        this.id = id
    }

}