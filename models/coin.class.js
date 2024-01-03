/**
 * Represents a coin object in the game.
 * @extends MovableObject
 */
class Coin extends MovableObject {

    y = 50;
    height = 150;
    width = 150;
    static coinX = 550;
    id;

    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }

    /**
     * Creates a coin object.
     * @param {any} id - The unique identifier for the coin.
     */
    constructor(id) {
        super().loadImage('./img/8_coin/coin_2.png');
        this.x = Coin.coinX;
        Coin.coinX += 300;
        this.id = id;
    }

}