/**
 * Object containing different game levels.
 * @typedef {Object} Levels
 * @property {Level} level1 - First level of the game.
 */

/**
 * Object representing different game levels.
 * @type {Levels}
 */
const levels = {
    /**
     * First level of the game.
     * @type {Level}
     */
    level1: new Level(
        createLevelObjects.createEnemys(15)
        ,
        createLevelObjects.createBackGroundLayer(5)
        ,
        createLevelObjects.createClouds(20)
        ,
        [/*coins filled from world (pushCoins())*/]
        ,
        [/*bottle filled from world (pushBottel())*/]
    )

}