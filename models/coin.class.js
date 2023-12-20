class Coin extends MovableObject {

    y = 50;
    x = 250;
    height = 150;
    width = 150;
    static coinX = 250;
    id;

    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }
    constructor(id) {
        super().loadImage('img/8_coin/coin_2.png');
        this.x = Coin.coinX;
        Coin.coinX += 300;
        this.id = id
    }

}