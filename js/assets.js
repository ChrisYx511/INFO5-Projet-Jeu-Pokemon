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
    get mcBoy() {
        let img = new Image()
        img.src = "../assets/characterSprites/birch.PNG"
        return img
    }
}
