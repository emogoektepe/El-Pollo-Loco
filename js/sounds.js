const sounds = {
    JUMP_SOUND_CHARACTER: new Audio('audio/jump.mp3'),
    WALKING_SOUND_CHARACTER: new Audio('audio/walk.mp3'),
    HURT_SOUND_CHARACTER: new Audio('audio/damageTaken.mp3'),
    LOSE_SOUND_CHARACTER: new Audio('audio/lose.mp3'),
    CHICKEN_SCREAM: new Audio('audio/chickenScream.mp3'),
    DANGER_MUSIC: new Audio('audio/epicFight.mp3'),
    COIN_SOUND: new Audio('audio/coin.mp3'),
    BOTTLE_SOUND: new Audio('audio/bottleCollect.mp3'),
    BOTTLE_THROW: new Audio('audio/bottleThrow.mp3'),
    DAMAGE_CHICKEN: new Audio('audio/damageChicken.mp3'),
    BOSSHURT_SOUND: new Audio('audio/bossHurt.mp3'),
    INTRO_SOUND: new Audio('audio/introSound.mp3'),

    allSounds: [],

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