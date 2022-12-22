// MUSIC
const music = {
    play: (trackReference) => {
        trackReference.play()
        trackReference.volume = musicVolume
        trackReference.loop = true
    },
    stop: (trackReference) => {
        trackReference.pause()
        trackReference.currentTime = 0
    },
    titleScreen: new Audio("../assets/music/03 - Title Screen- Main Theme.ogg"),
    introductions: new Audio("../assets/music/04 - Introductions.ogg"),
    wildPokemon: new Audio("../assets/music/09 - Battle! (Wild Pokémon).ogg"),
    gymBattle: new Audio("../assets/music/50 - Battle! (Gym Leader).ogg"),
    mauville: new Audio("../assets/music/27 - Rustboro City.ogg"),
    petalburg: new Audio("../assets/music/20 - Petalburg City.ogg"),
    gymVictory: new Audio("../assets/music/51 - Victory! (Gym Leader).ogg")
}

const characterSprites = {
    mcBoy: getImage("../assets/characterSprites/mc.png"),
    oldMan: getImage("../assets/characterSprites/oldMan.jpg"),
    blaziken: getImage("../assets/pokemon/blaziken.png"),
    shortsBoy: getImage("../assets/characterSprites/shortsGuy.png"),
    birch: getImage("../assets/characterSprites/birch.PNG"),
    trainer: getImage("../assets/characterSprites/trainer.PNG"),
    farmer: getImage("../assets/characterSprites/farmer.PNG"),
    nurse: getImage("../assets/characterSprites/nurse.PNG"),
    scientific: getImage("../assets/characterSprites/scientific.PNG"),
    baldGuy: getImage("../assets/characterSprites/baldGuy.PNG"),
    bigDude: getImage("../assets/characterSprites/bigDude.PNG"),
}

const pokemonSprites = {
    zigzagoon: getImage("../assets/pokemon/IMG_2994.PNG")
}

const bgElements = {
    mauvilleGymElectricity: getImage("../assets/gyms/mauvilleGymRay.png"),
    mauvilleGymFloorPattern: getImage("../assets/gyms/mauvilleGymNoRay.png")
}

const itemSprites = {
    eonTicket: getImage("../assets/items/eon-ticket.gif")
}

const sfx = {
    play: (trackReference) => {
        trackReference.play()
        trackReference.volume = sfxVolume
        trackReference.addEventListener("ended", () => {
            trackReference.pause()
            trackReference.currentTime = 0
        })
    },
    boop: new Audio("../assets/sfx/boop.wav"),
    fwoop: new Audio("../assets/sfx/fwoop.wav"),
    pokemonHealed: new Audio("../assets/music/14 - Pokémon Healed.ogg")
}
/**
 * Return an HTML image from a src string
 * @param {String} source 
 * @returns HTMLImageElement
 */
function getImage(source) {
    let img = new Image()
    img.src = source
    return img
}