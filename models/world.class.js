class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObjects = [];
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottleCollect.mp3');
    bottle_throw = new Audio('audio/bottleThrow.mp3');
    damage_chicken = new Audio('audio/damageChicken.mp3');
    throwCooldown = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.pushCoins();
        this.pushBottle();
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 50);
    }

    checkThrowObjects() {
        this.bottle_throw.volume = 0.1;
        if (this.keyboard.B && !this.throwCooldown && this.statusBarBottle.percentage != 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.bottle_throw.play();
            this.statusBarBottle.setPercentage(this.statusBarBottle.throwBottle());
            this.throwableObjects.push(bottle);
            this.throwCooldown = true;
            setTimeout(() => {
                this.throwCooldown = false;
            }, 500);
        }
    }

    checkCollisions() {
        this.damage_chicken.volume = 0.1;
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && enemy instanceof Chicken) {
                    this.character.jump();
                    enemy.hitChicken();
                    this.damage_chicken.play();
                    this.level.enemies = this.level.enemies.filter(obj => obj.id !== enemy.id);
                } else if (enemy instanceof Chicken || enemy instanceof Endboss) {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
        this.coin_sound.volume = 0.1;
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coin_sound.play();
                this.level.coins = this.level.coins.filter(obj => obj.id !== coin.id);
                this.statusBarCoin.setPercentage(this.statusBarCoin.collectCoin());
            }
        });
        this.bottle_sound.volume = 0.1;
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottle_sound.play();
                this.level.bottle = this.level.bottle.filter(obj => obj.id !== bottle.id);
                this.statusBarBottle.setPercentage(this.statusBarBottle.collectBottel());
            }
        });
        const endboss = this.level.enemies.slice(-1)[0];
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && enemy instanceof Chicken) {
                    bottle.shatterBottle();
                    enemy.hitChicken();
                    setTimeout(() => {
                        this.throwableObjects.pop();
                    }, 100);
                    this.damage_chicken.play();
                    this.level.enemies = this.level.enemies.filter(obj => obj.id !== enemy.id);
                } else if (bottle.isColliding(enemy) && enemy instanceof Endboss) {
                    bottle.shatterBottle();
                    enemy.hitBossChicken();
                    setTimeout(() => {
                        this.throwableObjects.pop();
                    }, 100);
                    this.damage_chicken.play();
                    if (endboss.energy <= 0) {
                        this.level.enemies.pop();
                    }
                }
            })
        });
    }
    
    pushBottle() {
        for (let i = 0; i < 5; i++) {
            let imagePath;
            if (Math.random() < 0.5) {
                imagePath = 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png';
            } else {
                imagePath = 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png';
            }
            this.level.bottle.push(new Bottle(i, imagePath));
        }
    }

    pushCoins() {
        for (let i = 0; i < 10; i++) {
            this.level.coins.push(new Coin(i));
        }
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        // fixed objects here
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);
        // OOP Trick
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        })
    }

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        // movableObject.drawFrame(this.ctx);
        movableObject.drawFrameOffSet(this.ctx);
        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

}