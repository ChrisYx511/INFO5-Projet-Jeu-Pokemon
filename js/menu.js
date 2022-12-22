const gameContainerPreStart = document.querySelector("#gameContainerPreStart")
const gameContainerMainMenu = document.querySelector("#gameContainerMainMenu")
const gameContainerOpeningVideo = document.getElementById("gameContainerOpeningVideo")
const openingVideo = document.getElementById("openingVideo")
const gameContainerSecondaryMenu = document.getElementById("gameContainerSecondaryMenu")
const continueButton = document.getElementById("continueButton")
const secondaryMenuButtons = document.getElementById("secondaryMenuButtons")
const continueButtonSaveInfo = document.getElementById("continueButtonSaveInfo")
const gameContainerBirchMoment = document.getElementById("gameContainerBirchMoment")
const birchMomentDialogueContainer = document.querySelector("#gameContainerBirchMoment .dialogueContainer")
const gameContainerCharacterSelection = document.getElementById("gameContainerCharacterSelection")
const characterSelectionDialogueContainer = document.querySelector("#gameContainerCharacterSelection .dialogueContainer")
const gameContainerBattle = document.getElementById("gameContainerBattle")
const gameContainerOptionsMenu = document.getElementById("gameContainerOptionsMenu")
const musicSlider = document.getElementById("musicSlider")
const sfxSlider = document.getElementById("sfxSlider")
const birchSprite = document.getElementById("birchSprite")

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
    music.titleScreen.play()
    music.titleScreen.loop = true
    music.titleScreen.volume = 0.5
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
    birchSprite.appendChild(characterSprites.birch)
    if (getBasicStatsFromSave("trainerName")) {
        fullGameLoad()
        continueButtonSaveInfo.innerHTML = `
        JOUEUR ${trainerName} &emsp;
        TEMPS ${msToHMS(loadedPlayTimeInMilliseconds)}<br>
        BADGES &emsp; ${gymBadges.length}
        `
        continueButton.style.display = "inherit"
    }
}

// NOTE TO SELF: need to discuss with felix how many canvases we're going to have

function startNewGame() {
    gameContainerSecondaryMenu.style.display = "none"
    gameContainerBirchMoment.style.display = "inherit"
    music.stop(music.titleScreen)
    music.play(music.introductions)
    currentStartTime = Date.now()

    printDialogueBox(birchMomentDialogueContainer, [
        "(Cliquez pour avancer le texte, bougez et intéragir avec le monde environnant à l'aide des flèches.)",
        "(Ceci est une reproduction de 2 villes dans Pokémon Emerald avec plusieurs adaptations au context d'évaluation.)",
        "(Explorez les 2 zones et surmontez le défi dans chacun!)",
        "(Bon jeu! -Félix et Chris)",
        "Bonjour! Désolé de te faire attendre.",
        "Bienvenue dans le monde de Pokémon!",
        "Moi, je suis BIRCH, mais tout le monde m'appelle le professeur de pokémon.",
        "Et toi, tu es?"
    ], startCharacterChoice)

}

function startCharacterChoice() {
    gameContainerBirchMoment.style.display = "none"
    gameContainerCharacterSelection.style.display = "inherit"
}

function startNameChoice(selectedGender) {
    trainerGender = selectedGender
    const genderChoice = document.getElementById("genderChoice")
    genderChoice.style.display = "none"
    characterSelectionDialogueContainer.querySelector("p").innerHTML = "Entre ton nom: "
    characterSelectionDialogueContainer.querySelector("#nameChoice").style.display = "inherit"
}

function finalizeCharacter() {
    const trainerNameForm = document.getElementById("trainerNameForm")
    console.log(trainerNameForm)
    if (!trainerNameForm.value) {
        throw "Error: Trainer name undefined"
    }
    trainerName = trainerNameForm.value
    console.log(trainerName)
    printDialogueBox(characterSelectionDialogueContainer, [
        `BIRCH: Bien! Bonne aventure, ${trainerName}! `
    ], goToTown1)
}

function goToTown1() {
    saveGame()
    window.location.href = "town1/mauville.html"
}

function continueGame() {
    saveGame()
    if (locationInGame.area.areaName == "Mauville" || locationInGame.area.areaName == "Mauville Gym") {
        location.href = "town1/mauville.html"
    }
    if (locationInGame.area.areaName == "Petalburg" || locationInGame.area.areaName == "Petalburg Gym" || locationInGame.area.areaName == "Woods") {
        location.href = "town1/petalburg.html"
    }
    currentStartTime = Date.now()
}

function openOptions() {
    gameContainerSecondaryMenu.style.display = "none"
    gameContainerOptionsMenu.style.display = "inherit"
    musicSlider.value = String(100*musicVolume)
    sfxSlider.value = String(100*sfxVolume)
}

function backToSecondaryMenu() {
    musicVolume = Number(musicSlider.value)/100
    sfxVolume = Number(sfxSlider.value)/100
    gameContainerSecondaryMenu.style.display = "inherit"
    gameContainerOptionsMenu.style.display = "none"
}

