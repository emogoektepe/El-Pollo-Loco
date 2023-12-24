const level1 = new Level(
    [
        new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Endboss()
    ],
    createLevelObjects.creatingBackGroundLayer(5)
    ,
    createLevelObjects.creatingClouds(30)
    ,
    [/*coins filled from world (pushCoins())*/]
    ,
    [/*bottle filled from world (pushBottel())*/]
);