const utils = {
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    },
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}