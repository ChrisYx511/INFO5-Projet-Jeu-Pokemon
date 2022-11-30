// Projet de jeu 2D - insipiré par Pokémon
/*
Collège Jean-Eudes - Xi Yang, Felix Wu
24 novembre 2022 - Concentration Informatique [Y13542-02]
*/

//HEADER

let trainerName
let pokemonInventory = []
let pokemonPC = []
let itemInventory = []
let loadedPlayTimeInSeconds = 0
let currentStartTime
let currentSaveTime
let sessionTimeDiffInSeconds = 0
let gymBadges = []
let locationInGame = {
    mapX: 0,
    mapY: 0,
    area: "Unidentified",
    // Parce que on split le map, chaque section de map aura un ID qu'on va déterminer
    areaSectionID: null
}

let player = {
    x: 0,
    y: 0,
    speed: 4,
    
}

// PRINCIPAL FUNCTIONS

/**
 * Saves the game
 */
function saveGame() {
    localStorage.setItem('trainerName', trainerName)
    localStorage.setItem('pokemonInventory', JSON.stringify(pokemonInventory))
    localStorage.setItem('pokemonPC', JSON.stringify(pokemonPC))
    localStorage.setItem('gymBadges', JSON.stringify(gymBadges))
    locationInGame.mapX = player.x
    locationInGame.mapY = player.y
    localStorage.setItem('locationInGame', JSON.stringify(locationInGame))
    currentSaveTime = new Date()
    sessionTimeDiffInSeconds = (currentSaveTime - currentStartTime) / 1000
    localStorage.setItem('playtime', loadedPlayTimeInSeconds + sessionTimeDiffInSeconds)
    loadedPlayTimeInSeconds = localStorage.getItem('playtime')
    currentStartTime = new Date()
    currentSaveTime = 0
}

/**
 * Returns a stat from the current savefile
 * @param {String} stat trainerName, gymBadges, or playtime 
 * @returns Returns the stat or "EMPTY SAVE"
 */
function getBasicStatsFromSave(stat) {
    if (!localStorage.getItem('trainerName')) {
        switch (stat) {
            case "trainerName":
                return localStorage.getItem('trainerName')
            case "gymBadges":
                return localStorage.getItem('gymBadges')
            case "playtime":
                return localStorage.getItem('playtime')
        }
        
    } else {
        return "EMPTY SAVE"
    }
}

/** Initial game load function
 * 
 * Loads the save data into the appropriate runtime variables to be used by the rest of the code
 * @returns "SUCCESS" or "EMPTY SAVE"
 */
function fullGameLoad() {
    if (!localStorage.getItem('trainerName')) {
        trainerName = localStorage.getItem('trainerName')
        pokemonInventory = JSON.parse(localStorage.getItem('pokemonInventory'))
        pokemonPC = JSON.parse(localStorage.getItem('pokemonPC'))
        gymBadges = JSON.parse(localStorage.getItem('gymBadges'))
        locationInGame = JSON.parse(localStorage.getItem('locationInGame'))
        loadedPlayTimeInSeconds = JSON.parse(localStorage.getItem('playtime'))

        player.x = locationInGame.mapX
        player.y = locationInGame.mapY
        return "SUCCESS"
    } else {
        return "EMPTY SAVE"
    }
}

