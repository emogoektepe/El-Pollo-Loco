const level1 = new Level(
    createLevelObjects.createEnemys(1)
    ,
    createLevelObjects.createBackGroundLayer(5)
    ,
    createLevelObjects.createClouds(20)
    ,
    [/*coins filled from world (pushCoins())*/]
    ,
    [/*bottle filled from world (pushBottel())*/]
);