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
    wildPokemon: new Audio("../assets/music/09 - Battle! (Wild Pokémon).ogg")
}

const characterSprites = {
    mcBoy: getImage("../assets/characterSprites/mc.jpg"),
    oldMan: getImage("../assets/characterSprites/oldMan.jpg"),
    blaziken: getImage("../assets/pokemon/blaziken.png"),
}

/**
 * Return an HTML image from a src string
 * @param {String} source 
 * @returns HTMLImageObject
 */
function getImage(source) {
    let img = new Image()
    img.src = source
    return img
}