/**
 * Utility functions for various tasks.
 * @typedef {Object} Utils
 * @property {function} clearAllIntervals - Clears all active intervals.
 * @property {function(): boolean} isMobile - Checks if the user is using a mobile device.
 */

/**
 * Object containing utility functions for common tasks.
 * @type {Utils}
 */
const utils = {
    /**
     * Clears all active intervals.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    },

    /**
     * Checks if the user is using a mobile device.
     * @returns {boolean} Returns true if the user is on a mobile device, false otherwise.
     */
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}