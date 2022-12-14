// Projet de jeu 2D - insipiré par Pokémon
/*
Collège Jean-Eudes - Xi Yang, Felix Wu
24 novembre 2022 - Concentration Informatique [Y13542-02]
*/

//HEADER
const dialogueBoxTemplate = document.getElementById("dialogueBoxTemplate")
let musicVolume = 0.5
let sfxVolume = 0.5
let trainerName
let trainerGender
let pokemonInventory = []
let pokemonPC = []
let itemInventory = []
let loadedPlayTimeInMilliseconds = 0
let currentStartTime
let currentSaveTime
let sessionTimeDiffInMilliseconds = 0
let gymBadges = []
let locationInGame = {
    mapX: 0,
    mapY: 0,
    area: null,
}
let paused = false
// Movement and player
let activeArea = {}
/*deplacement du joueur*/
let keysDown = {}
let keysBlocked = false
document.addEventListener("keydown", (e) => {
    if (!keysBlocked) {
        keysDown = {}
        keysDown[e.key]=true
    }

})
document.addEventListener("keyup", (e) => {
    delete keysDown[e.key]
})


let player = {
    x: 0,
    y: 0,
    w: 70,
    h: 85,
    speed: 6,
    health: 10,
    collisionObject: (wall) => {
            if (!collision(player, wall)) {
                return null
            }
            if ("ArrowLeft" in keysDown || "ArrowRight" in keysDown) {
                if (player.x < wall.x + player.w/2){
                    player.x-=player.speed
                } else {
                    player.x+=player.speed
                }
            }	
            if ("ArrowUp" in keysDown || "ArrowDown" in keysDown) {
                if (player.y < wall.y + wall.h/2){
                    player.y-=player.speed
                } else {
                    player.y+=player.speed
            }
        }   
    },
    handleMovement: (canvasObject = canvas, contextObject = ctx) => {
        if("ArrowLeft" in keysDown && player.x > 0) {
            player.x-=player.speed
        }
        if("ArrowRight" in keysDown && player.x+player.w < canvasObject.width) {
            player.x += player.speed
        }
    
        if("ArrowUp" in keysDown && player.y > 0) {
            player.y -= player.speed
        }
        if("ArrowDown" in keysDown && player.y + player.h < canvasObject.height) {
            player.y += player.speed
        }
        // Collide with invisible objects
        for (let i = 0; i < activeArea.layout.length; i++) {
            if (!activeArea.layout[i]) {
                return null
            }
            if (activeArea.layout[i] && activeArea.layout[i].hide) {
                continue;
            }
            if ("oncontact" in activeArea.layout[i] && collision(player,activeArea.layout[i]) && !activeArea.layout[i].hasMadeContact) {
                activeArea.layout[i].hasMadeContact = true
                activeArea.layout[i].oncontact(activeArea.layout[i])
            }
            if (activeArea.layout[i] && activeArea.layout[i].sprite) {
                contextObject.drawImage(activeArea.layout[i].sprite, activeArea.layout[i].x, activeArea.layout[i].y, activeArea.layout[i].w, activeArea.layout[i].h)
            }
            if (activeArea.layout[i] && activeArea.layout[i].nocollide == true) {
                continue;
            }
            player.collisionObject(activeArea.layout[i])
            if (!collision(player,activeArea.layout[i])) {
                if (!activeArea.layout[i]) {
                    return null
                }
                activeArea.layout[i].hasMadeContact = false
            }
        } 
    },
    draw: (contextObject = ctx) => {
        contextObject.drawImage(characterSprites.mcBoy, player.x, player.y, player.w, player.h)
    }
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
    localStorage.setItem('musicVolume', JSON.stringify(musicVolume))
    localStorage.setItem('sfxVolume', JSON.stringify(sfxVolume))

    locationInGame.mapX = player.x
    locationInGame.mapY = player.y
    localStorage.setItem('locationInGame', JSON.stringify(locationInGame))
    currentSaveTime = Date.now()
    sessionTimeDiffInMilliseconds = (currentSaveTime - currentStartTime)
    localStorage.setItem('playtime', JSON.stringify(loadedPlayTimeInMilliseconds + sessionTimeDiffInMilliseconds))
    loadedPlayTimeInMilliseconds = JSON.parse(localStorage.getItem('playtime'))
    currentStartTime = Date.now()
    currentSaveTime = 0
}

/**
 * Returns a stat from the current savefile
 * @param {String} stat trainerName, gymBadges, or playtime 
 * @returns Returns the stat or "EMPTY SAVE"
 */
function getBasicStatsFromSave(stat) {
    if (localStorage.getItem('trainerName')) {
        switch (stat) {
            case "trainerName":
                return localStorage.getItem('trainerName')
            case "gymBadges":
                return JSON.parse(localStorage.getItem('gymBadges'))
            case "playtime":
                return JSON.parse(localStorage.getItem('playtime'))
        }
        
    } else {
        return null
    }
}

/** Initial game load function
 * 
 * Loads the save data into the appropriate runtime variables to be used by the rest of the code
 * @returns "SUCCESS" or "EMPTY SAVE"
 */
function fullGameLoad() {
    if (localStorage.getItem('trainerName')) {
        trainerName = localStorage.getItem('trainerName')
        pokemonInventory = JSON.parse(localStorage.getItem('pokemonInventory'))
        pokemonPC = JSON.parse(localStorage.getItem('pokemonPC'))
        gymBadges = JSON.parse(localStorage.getItem('gymBadges'))
        locationInGame = JSON.parse(localStorage.getItem('locationInGame'))
        loadedPlayTimeInMilliseconds = JSON.parse(localStorage.getItem('playtime'))
        musicVolume = JSON.parse(localStorage.getItem('musicVolume'))
        sfxVolume = JSON.parse(localStorage.getItem('sfxVolume'))
        if (!musicVolume) {
            musicVolume = 0.5
        }
        if (!sfxVolume) {
            sfxVolume = 0.5
        }
        player.x = locationInGame.mapX
        player.y = locationInGame.mapY
        return "SUCCESS"
    } else {
        return null
    }
}

function clearSave() {
    localStorage.clear()
}

function msToHMS(ms) {
    // 1- Convert to seconds:
    let seconds = ms / 1000;
    // 2- Extract hours:
    const hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    const minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = Math.floor(seconds % 60);
    return hours+":"+minutes+":"+seconds;
}

/**
 * Returns a div containing a dialogue box to be appended or added to an HTML element
 * @param {String} dialogueString Dialogue text to be displayed or HTML to be displayed in the dialogue box
 * @returns String containing the HTML Element defining the dialogue box
 */
function returnDialogueBox(dialogueString) {
    let dialogueClone = dialogueBoxTemplate.content.cloneNode(true)
    let dialogueCloneDiv = dialogueClone.querySelector("div")
    let dialogueCloneP = dialogueCloneDiv.querySelector("p")
    dialogueCloneP.innerHTML = dialogueString
    return dialogueCloneDiv.outerHTML
}
/**
 * Creates and updates innerHTML of a containerObject with the dialogue box
 * @param {HTMLElement} containerObjet An empty div in which the dialogue box will be placed
 * @param {Array} dialogueArr Array containing the dialogue / code in order of appearance
 * @param {Function} exitFunction Optional, defines the function to execute without parameters after dialogue has ended    
*/
function printDialogueBox(containerObjet, dialogueArr, exitFunction = () => {
    containerObjet.innerHTML = ""
    keysBlocked = false
}) {
    let numberOfPageFwd = 0
    const abortFwd = new AbortController
    containerObjet.innerHTML = returnDialogueBox(dialogueArr[0])
    document.addEventListener("mousedown", () => {
        console.log(numberOfPageFwd)
        console.log(dialogueArr[numberOfPageFwd])
        numberOfPageFwd++
        if (numberOfPageFwd == dialogueArr.length) {
            abortFwd.abort()
            exitFunction()
        }
        if (numberOfPageFwd <= dialogueArr.length - 1) {
            containerObjet.innerHTML = returnDialogueBox(dialogueArr[numberOfPageFwd])

        }
    }, {signal: abortFwd.signal})
}

/**
 * Loads an area in the game
 * @param {Object} areaContainer Objet containing the standard layout and parameters of a given area
 * @param {HTMLElement} targetCanvas Object containing the HTML Canvas element
 */
function loadArea(areaContainer, targetCanvas = canvas) {
    activeArea = areaContainer
    targetCanvas.style.backgroundImage = `url(${areaContainer.bgPath})`
    locationInGame.area = areaContainer
}

/**
 * Collision between objects
 * @param {Object} objet1 
 * @param {Object} objet2 
 * @returns 
 */
function collision(objet1 = null, objet2 = null){
    if (!objet1 || !objet2) {
        return null
    }
	if (objet1.x + objet1.w >= objet2.x &&
        objet1.x <= objet2.x + objet2.w && 
        objet1.y + objet1.h >= objet2.y && 
        objet1.y <= objet2.y + objet2.h) {
		return true
	}
}

/**
 * Draws non-player items and characters, handles collisions
 * @param {*} contextObject 
 */
function drawAreaObjects(contextObject = ctx) {
    for (let i = 0; i < Object.keys(activeArea.npc).length; i++) {
        let selectedNpc = activeArea.npc[Object.keys(activeArea.npc)[i]]
        if (selectedNpc.hide) {
            continue;
        }
        if ("oncontact" in selectedNpc && collision(player,selectedNpc) && !selectedNpc.hasMadeContact) {
            selectedNpc.hasMadeContact = true
            selectedNpc.oncontact(selectedNpc)
        }
        if ("loop" in selectedNpc) {
            selectedNpc.loop(selectedNpc)
        }
        player.collisionObject(selectedNpc)
        if ("sprite" in selectedNpc) {
            contextObject.drawImage(selectedNpc.sprite, selectedNpc.x, selectedNpc.y, selectedNpc.w, selectedNpc.h)
        }
        if (!collision(player,selectedNpc)) {
            selectedNpc.hasMadeContact = false
        }
    }
}   
