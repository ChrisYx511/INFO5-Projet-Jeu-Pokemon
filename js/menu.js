const gameContainerPreStart = document.querySelector("#gameContainerPreStart")
const gameContainerMainMenu = document.querySelector("#gameContainerMainMenu")
const gameContainerOpeningVideo = document.getElementById("gameContainerOpeningVideo")
const openingVideo = document.getElementById("openingVideo")
const gameContainerSecondaryMenu = document.getElementById("gameContainerSecondaryMenu")
function startGame() {
    gameContainerPreStart.style.display = "none"
    gameContainerOpeningVideo.style.display = "inherit"
    openingVideo.play()
    const stopOpeningVideo = new AbortController()
    setTimeout(() => {
        document.addEventListener("keyup", ()=> {
            openingVideo.pause()
            openingVideo.currentTime = 0
            startTitleScreen()
            stopOpeningVideo.abort()
        }, {signal: stopOpeningVideo.signal})
        document.addEventListener("click", () => {
            openingVideo.pause()
            openingVideo.currentTime = 0
            startTitleScreen()
            stopOpeningVideo.abort()
        }, {signal: stopOpeningVideo.signal})
        openingVideo.addEventListener("ended", () => {
            openingVideo.pause()
            openingVideo.currentTime = 0
            startTitleScreen()
            stopOpeningVideo.abort()
        }, {signal: stopOpeningVideo.signal})
    }, 1000)
}

function startTitleScreen() {
    gameContainerOpeningVideo.style.display = "none"
    gameContainerMainMenu.style.display = "inherit"
    music.titlescreen.play()
    music.titlescreen.loop = true
    music.titlescreen.volume = 0.5
    document.addEventListener("keyup", (e) => {
        console.log(e)
        if (e.key == "Enter") {
            startSecondaryMenu()
        } 
    }, {once: true})
}

function startSecondaryMenu() {
    gameContainerMainMenu.style.display = "none"
    gameContainerSecondaryMenu.style.display = "inherit"
}