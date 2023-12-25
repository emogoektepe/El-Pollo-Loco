class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 300;
    height = 150;
    width = 100;
    coinProg = 0;
    bottleProg = 0;

    getImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.getImageIndex()];
        this.img = this.imageCache[path];
    }

    throwBottle() {
        this.bottleProg -= 20;
        return this.bottleProg;
    }

    collectBottel() {
        this.bottleProg += 20;
        return this.bottleProg;
    }

    collectCoin() {
        this.coinProg += 10;
        return this.coinProg;
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof ThrowableObject || this instanceof Bottle || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawFrameOffSet(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof ThrowableObject || this instanceof Bottle || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.right, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}