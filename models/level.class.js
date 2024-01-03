/**
 * Represents a game level containing various elements.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottle;

    /**
     * Constructs a Level object with specified elements.
     * @param {MovableObject[]} enemies - Array of enemy objects in the level.
     * @param {Cloud[]} clouds - Array of cloud objects in the level.
     * @param {BackgroundObject[]} backgroundObjects - Array of background objects in the level.
     * @param {Coin[]} coins - Array of coin objects in the level.
     * @param {Bottle[]} bottle - Array of bottle objects in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottle = bottle;
    }
}