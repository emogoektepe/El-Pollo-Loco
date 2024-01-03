/**
 * Represents a drawable object in the game.
 */
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

    /**
     * Gets the image index based on the percentage.
     * @returns {number} The image index.
     */
    getImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }

    /**
     * Sets the percentage of completion.
     * @param {number} percentage - The completion percentage.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.getImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Decreases the bottle progress.
     * @returns {number} The updated bottle progress.
     */
    throwBottle() {
        this.bottleProg -= 20;
        return this.bottleProg;
    }

    /**
     * Increases the bottle progress.
     * @returns {number} The updated bottle progress.
     */
    collectBottel() {
        this.bottleProg += 20;
        return this.bottleProg;
    }

    /**
     * Increases the coin progress.
     * @returns {number} The updated coin progress.
     */
    collectCoin() {
        this.coinProg += 20;
        return this.coinProg;
    }

    /**
     * Loads images into the image cache.
     * @param {string[]} array - Array of image paths.
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    
    /**
     * Loads a single image.
     * @param {string} path - The image path.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the drawable object onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}