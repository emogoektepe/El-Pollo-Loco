/**
 * Represents the game world handling characters, enemies, collisions, and interactions.
 */
class World {
    character = new Character();
    endboss = new Endboss();
    level = levels.level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarHealthBoss = new StatusBarHealthBoss();
    throwableObjects = [];
    throwCooldown = false;
    bottleId = 0;

    /**
     * Constructs the game world.
     * @param {HTMLCanvasElement} canvas - The HTML canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.createCoins();
        this.createBottles();
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Starts the game loop.
     */
    run() {
        this.level.enemies.push(this.endboss);
        setInterval(() => {
            this.checkAllCollisions();
            this.checkThrowObjects();
            this.endboss.checkDangerArea();
        }, 50);
    }

    /**
     * Checks collisions between various objects in the game.
     */
    checkAllCollisions() {
        this.enemiesCollision();
        this.coinCollectCollision();
        this.bottleCollectCollision();
        this.bottleCollision();
    }

    /**
     * Checks if the player can throw objects and handles the throw action.
     */
    checkThrowObjects() {
        if (this.bottleAvailable()) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.bottleId);
            sounds.BOTTLE_THROW.play();
            this.statusBarBottle.setPercentage(this.statusBarBottle.throwBottle());
            this.throwableObjects.push(bottle);
            this.bottleId++;
            this.throwCooldown = true;
            setTimeout(() => this.throwCooldown = false, 500);
        }
    }

    /**
     * Checks if the player can throw a bottle.
     * @returns {boolean} - Indicates whether the player can throw a bottle or not.
     */
    bottleAvailable() {
        return this.keyboard.B && !this.throwCooldown && this.statusBarBottle.percentage != 0 && this.endboss.energy > 0;
    }

    /**
     * Checks collision with enemies.
     */
    enemiesCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.characterAboveEnemy(enemy)) {
                    this.character.jump();
                    enemy.hitChicken();
                    sounds.DAMAGE_CHICKEN.play();
                    this.level.enemies = this.level.enemies.filter(obj => obj.id !== enemy.id);
                } else if (enemy instanceof Endboss || enemy instanceof Chicken && !this.character.isAboveGround()) {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Checks if character is above the enemy.
     * @param {Object} enemy - The enemy object.
     * @returns {boolean} - Indicates if the character is above the enemy.
     */
    characterAboveEnemy(enemy) {
        return this.character.isAboveGround() && enemy instanceof Chicken && this.character.speedY < 0;
    }

    /**
     * Checks collision for collecting coins.
     */
    coinCollectCollision() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                sounds.COIN_SOUND.play();
                this.level.coins = this.level.coins.filter(obj => obj.id !== coin.id);
                this.statusBarCoin.setPercentage(this.statusBarCoin.collectCoin());
            }
        });
    }

    /**
     * Checks collision for collecting bottles.
     */
    bottleCollectCollision() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                sounds.BOTTLE_SOUND.play();
                this.level.bottle = this.level.bottle.filter(obj => obj.id !== bottle.id);
                this.statusBarBottle.setPercentage(this.statusBarBottle.collectBottel());
            }
        });
    }

    /**
     * Checks collision between bottles and enemies.
     */
    bottleCollision() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (this.bottleColidingWithChicken(bottle, enemy)) {
                    this.bottleHitChicken(bottle, enemy);
                } else if (this.bottleColidingWithBoss(bottle, enemy)) {
                    this.bottleHitBoss(bottle, enemy);
                }
            })
        });
    }

    /**
     * Handles bottle hit on boss.
     * @param {ThrowableObject} bottle - The bottle object.
     * @param {Endboss} enemy - The boss enemy object.
     */
    bottleHitBoss(bottle, enemy) {
        bottle.shatterBottle();
        sounds.BOSSHURT_SOUND.play();
        this.throwableObjects = this.removeObjectById(this.throwableObjects, bottle.id);
        this.statusBarHealthBoss.setPercentage(enemy.hitBossChicken());
        if (this.endboss.energy === 0) setTimeout(() => this.level.enemies.pop(), 1000);
    }

    /**
     * Handles bottle hit on chicken enemy.
     * @param {ThrowableObject} bottle - The bottle object.
     * @param {Object} enemy - The chicken enemy object.
     */
    bottleHitChicken(bottle, enemy) {
        bottle.shatterBottle();
        enemy.hitChicken();
        sounds.DAMAGE_CHICKEN.play();
        this.level.enemies = this.removeObjectById(this.level.enemies, enemy.id);
        this.throwableObjects = this.removeObjectById(this.throwableObjects, bottle.id);
    }

    /**
     * Checks if bottle collides with boss.
     * @param {ThrowableObject} bottle - The bottle object.
     * @param {Endboss} enemy - The boss enemy object.
     * @returns {boolean} - Indicates if the bottle collides with the boss.
     */
    bottleColidingWithBoss(bottle, enemy) {
        return bottle.isColliding(enemy) && enemy instanceof Endboss;
    }

    /**
     * Checks if bottle collides with chicken enemy.
     * @param {ThrowableObject} bottle - The bottle object.
     * @param {Object} enemy - The chicken enemy object.
     * @returns {boolean} - Indicates if the bottle collides with the chicken enemy.
     */
    bottleColidingWithChicken(bottle, enemy) {
        return bottle.isColliding(enemy) && enemy instanceof Chicken;
    }

    /**
     * Removes object from array based on its ID.
     * @param {Array} array - The array from which the object needs to be removed.
     * @param {number} id - The ID of the object to be removed.
     * @returns {Array} - Updated array after object removal.
     */
    removeObjectById(array, id) {
        return array.filter(obj => obj.id !== id);
    }

    /**
     * Creates bottles for the level.
     */
    createBottles() {
        for (let i = 0; i < 5; i++) {
            const imagePath = Math.random() < 0.5 ? './img/6_salsa_bottle/2_salsa_bottle_on_ground.png' : './img/6_salsa_bottle/1_salsa_bottle_on_ground.png';
            this.level.bottle.push(new Bottle(i, imagePath));
        }
    }

    /**
     * Creates coins for the level.
     */
    createCoins() {
        for (let i = 0; i < 5; i++) {
            this.level.coins.push(new Coin(i));
        }
    }

    /**
     * Sets references of world in character and boss objects.
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * Draws all game elements on the canvas.
     */
    draw() {
        const bossHealtbarIcon = new Image();
        bossHealtbarIcon.src = './img/4_enemie_boss_chicken/2_alert/G12.png';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(this.endboss.x, 0);
        if (this.endboss.energy != 0) {
            this.addToMap(this.statusBarHealthBoss);
            this.ctx.drawImage(bossHealtbarIcon, 170, 70, 40, 40);
        }
        this.ctx.translate(-this.endboss.x, 0);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        const self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    /**
     * Adds movable objects to the map for rendering.
     * @param {Array} objects - The array of movable objects.
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        })
    }

    /**
     * Adds a movable object to the rendering map.
     * @param {Object} movableObject - The movable object to be added.
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    /**
     * Flips the image horizontally for rendering.
     * @param {Object} movableObject - The movable object to flip.
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * Reverts the flipped image back to its original state.
     * @param {Object} movableObject - The movable object to revert.
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

}