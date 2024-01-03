/**
 * Represents a bottle object in the game.
 * @extends MovableObject
 */
class Bottle extends MovableObject {

    y = 360;
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
    
    /**
     * Creates a bottle object.
     * @param {any} id - The unique identifier for the bottle.
     * @param {string} img - The image path for the bottle object.
     */
    constructor(id, img) {
        super().loadImage(img);
        this.x = Bottle.bottleX;
        Bottle.bottleX += 300;
        this.id = id
    }

}