/**
 * Object containing functions to create various elements for a game level.
 * @typedef {Object} LevelObjects
 * @property {string[]} cloudImages - Array of paths for cloud images.
 * @property {string[]} backgroundImages1 - Array of paths for first set of background images.
 * @property {string[]} backgroundImages2 - Array of paths for second set of background images.
 * @property {function(number): Cloud[]} createClouds - Function to create cloud objects.
 * @property {function(number): BackgroundObject[]} createBackGroundLayer - Function to create background layer objects.
 * @property {function(number): Chicken[]} createEnemys - Function to create enemy objects.
 */

/**
 * Object with functions to create different elements for a game level.
 * @type {LevelObjects}
 */
const createLevelObjects = {

    cloudImages: [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ],

    backgroundImages1: [
        'img/5_background/layers/3_third_layer/1.png',
        'img/5_background/layers/2_second_layer/1.png',
        'img/5_background/layers/1_first_layer/1.png'
    ],

    backgroundImages2: [
        'img/5_background/layers/3_third_layer/2.png',
        'img/5_background/layers/2_second_layer/2.png',
        'img/5_background/layers/1_first_layer/2.png'
    ],
    
    /**
     * Create cloud objects based on the specified amount.
     * @param {number} amount - Number of cloud objects to create.
     * @returns {Cloud[]} An array of Cloud objects.
     */
    createClouds(amount) {
        const cloudArray = [];
        for (let i = 0; i < amount; i++) {
            const imagePathIndex = i % this.cloudImages.length;
            const cloudImagePath = this.cloudImages[imagePathIndex];
            cloudArray.push(new Cloud(cloudImagePath));
        }
        return cloudArray;
    },

    /**
     * Create background layer objects for the level.
     * @param {number} levelWidth - Width of the level.
     * @returns {BackgroundObject[]} An array of BackgroundObject instances representing the background layer.
     */
    createBackGroundLayer(levelWidth) {
        const backgroundArray = [];
        let imagesArraySwitch = true;
        for (let i = -1438; i <= 719 * levelWidth; i += 719) {
            const currentImageArray = imagesArraySwitch ? this.backgroundImages2 : this.backgroundImages1;
            for (let j = 0; j < 3; j++) {
                backgroundArray.push(new BackgroundObject(currentImageArray[j], i));
            }
            imagesArraySwitch = !imagesArraySwitch;
        }
        return backgroundArray;
    },

    /**
     * Create enemy objects based on the specified amount.
     * @param {number} amount - Number of enemy objects to create.
     * @returns {Chicken[]} An array of Chicken objects.
     */
    createEnemys(amount) {
        const enemys = [];
        for (let i = 0; i < amount; i++) {
            enemys.push(new Chicken(i));
        }
        return enemys;
    }

};