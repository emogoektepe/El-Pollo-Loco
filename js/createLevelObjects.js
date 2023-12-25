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

    createClouds(amount) {
        const cloudArray = [];
        for (let i = 0; i < amount; i++) {
            const imagePathIndex = i % this.cloudImages.length;
            const cloudImagePath = this.cloudImages[imagePathIndex];
            cloudArray.push(new Cloud(cloudImagePath));
        }
        return cloudArray;
    },

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

    createEnemys(amount) {
        const enemys = [];
        for (let i = 0; i < amount; i++) {
            enemys.push(new Chicken(i));
        }
        enemys.push(new Endboss());
        return enemys;
    }

};