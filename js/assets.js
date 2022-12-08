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
    introductions: new Audio("../assets/music/04 - Introductions.ogg")
}