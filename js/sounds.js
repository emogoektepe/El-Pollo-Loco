/**
 * Object containing various sound effects for the game.
 * @typedef {Object} Sounds
 * @property {HTMLAudioElement} JUMP_SOUND_CHARACTER - Sound for character jumping.
 * @property {HTMLAudioElement} WALKING_SOUND_CHARACTER - Sound for character walking.
 * @property {HTMLAudioElement} HURT_SOUND_CHARACTER - Sound for character taking damage.
 * @property {HTMLAudioElement} LOSE_SOUND_CHARACTER - Sound for character losing.
 * @property {HTMLAudioElement} CHICKEN_SCREAM - Sound for chicken scream.
 * @property {HTMLAudioElement} DANGER_MUSIC - Music for intense fights.
 * @property {HTMLAudioElement} COIN_SOUND - Sound for collecting coins.
 * @property {HTMLAudioElement} BOTTLE_SOUND - Sound for collecting bottles.
 * @property {HTMLAudioElement} BOTTLE_THROW - Sound for throwing bottles.
 * @property {HTMLAudioElement} DAMAGE_CHICKEN - Sound for damaging chickens.
 * @property {HTMLAudioElement} BOSSHURT_SOUND - Sound for boss getting hurt.
 * @property {HTMLAudioElement} INTRO_SOUND - Introductory sound.
 * @property {HTMLAudioElement} BOTTLE_SHATTER - Sound for bottle shattering.
 * @property {HTMLAudioElement} WIN - Sound for winning the game.
 * @property {HTMLAudioElement[]} allSounds - Array containing all audio elements.
 * @property {function} initialize - Initializes the sound objects.
 * @property {function} toggleMuteState - Toggles the mute state of all sounds.
 */

/**
 * Object containing sound effects and functions to manage them.
 * @type {Sounds}
 */
const sounds = {
    JUMP_SOUND_CHARACTER: new Audio('./audio/jump.mp3'),
    WALKING_SOUND_CHARACTER: new Audio('./audio/walk.mp3'),
    HURT_SOUND_CHARACTER: new Audio('./audio/damageTaken.mp3'),
    LOSE_SOUND_CHARACTER: new Audio('./audio/lose.mp3'),
    CHICKEN_SCREAM: new Audio('./audio/chickenScream.mp3'),
    DANGER_MUSIC: new Audio('./audio/epicFight.mp3'),
    COIN_SOUND: new Audio('./audio/coin.mp3'),
    BOTTLE_SOUND: new Audio('./audio/bottleCollect.mp3'),
    BOTTLE_THROW: new Audio('./audio/bottleThrow.mp3'),
    DAMAGE_CHICKEN: new Audio('./audio/damageChicken.mp3'),
    BOSSHURT_SOUND: new Audio('./audio/bossHurt.mp3'),
    INTRO_SOUND: new Audio('./audio/introSound.mp3'),
    BOTTLE_SHATTER: new Audio('./audio/bottleShatter.mp3'),
    WIN: new Audio('./audio/win.mp3'),

    allSounds: [],

    /**
     * Initializes the sound objects and populates the allSounds array.
     */
    initialize() {
        Object.values(this).forEach(value => {
            if (value instanceof Audio) {
                this.allSounds.push(value);
            }
        });
        this.allSounds.forEach(sound => {
            sound.volume = 0.1;
        });
    },

    /**
     * Toggles the mute state of all sounds.
     */
    toggleMuteState() {
        const img = document.getElementById('toggleSoundButton');
        img.src = img.src.includes('unmute') ? './img/assets/mute.png' : './img/assets/unmute.png';
        this.allSounds.forEach(sound => {
            if (sound.volume === 0) {
                sound.volume = 0.1;
            } else {
                sound.volume = 0;
            }
        });
    }
};