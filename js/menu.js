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
    printDialogueBox(birchMomentDialogueContainer, [
        "(Ceci est une reproduction de Pokémon Emerald avec quelques adaptations au context d'évaluation.)",
        "(Cliquez pour avancer le texte, bougez avec les flèches et utiliser la touche x pour intéragir avec le monde environnant)",
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
    characterSelectionDialogueContainer.querySelector("p").innerHTML = "Enter your name: "
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
    window.location.href = "town2/petalburg.html"
}

function loadFight() {
    music.stop(music.introductions)
    music.play(music.wildPokemon)
    gameContainerCharacterSelection.style.display = "none"
    gameContainerBattle.style.display = "inherit"
}