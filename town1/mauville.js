const gameContainerTown1 = document.getElementById("gameContainerTown1")
const canvas=document.querySelector("#gameContainerTown1 canvas")
const ctx=canvas.getContext("2d")
const gameContainerTown1DialogueContainer = document.querySelector(".dialogueContainer")
const healthDisplay = document.getElementById("healthDisplay")
const playerNameDisplay = document.getElementById("playerName")
const healthBar = document.getElementById("hpBar")
const healthNumber = document.getElementById("healthNumber")
const gameContainerGameOver = document.getElementById("gameContainerGameOver")

canvas.width = 1080
canvas.height = 720

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})

const mauville1 = {
    areaName: "Mauville",
    areaSectionId: 1,
    bgPath: "../assets/towns/mauvilleCity_1.jpg",
    layout: [
        {
            x: 190,
            y: 100,
            w: 380,
            h: 250,
            color: "red"
        },
        {
            x: 570,
            y: 0,
            w: 130,
            h: 320,
        },
        {
            x: 0,
            y: 270,
            w: 200,
            h: 50,
        },
        {
            x: 185,
            y: 660,
            w: 450,
            h: 60,
        },
        {
            //Exit to mauville 2
            x: 1060,
            y: 460,
            w: 20,
            h: 200,
            oncontact: () => {
                loadArea(mauville2, canvas)
                player.x = 21
                }
        },
        {
            //Exit to mauville 3
            x: 645,
            y: 700,
            w: 140,
            h: 20,
            oncontact: () => {
                loadArea(mauville3, canvas)
                player.y = 20
                player.x = 190
            }
        }

    ],
    npc: {
        shortsBoy: {
            x: 390,
            y:405,
            w: 60,
            h:80,
            sprite: characterSprites.shortsBoy,
            oncontact: () => {
                if (itemInventory.includes("Shorts")) {
                    sfx.play(sfx.boop)
                    keysBlocked = true
                    printDialogueBox(gameContainerTown1DialogueContainer, [
                        "Omg shorts!"
                    ], loadMauvilleGym1)
                    return null
                }
                sfx.play(sfx.boop)
                keysBlocked = true
                printDialogueBox(gameContainerTown1DialogueContainer, [
                    "I like shorts, they are comfy and easy to wear!",
                    "(Il semble qu'il ne va pas te laisser entrer.)"
                ])
            }
        }

    },
    
}

const mauville2 = {
    areaName: "Mauville",
    areaSectionId: 2,
    bgPath: "../assets/towns/mauvilleCity_2.jpg",
    layout: [
        {
            x: 78,
            y:0,
            w: 418,
            h: 420
        },
        {
            x: 440,
            y:0,
            w:640,
            h:166
        },
        {
            x: 508,
            y: 384,
            w: 506,
            h: 40,
            oncontact: () => {
                function storeBike() {
                    sfx.play(sfx.boop)
                    itemInventory.push("Bike")
                    gameContainerTown1DialogueContainer.innerHTML = ""
                    keysBlocked = false
                }
                if (itemInventory.includes("Bike")) {
                    sfx.play(sfx.boop)
                    keysBlocked = true
                    printDialogueBox(gameContainerTown1DialogueContainer, [
                        "(J'ai d??j?? vol?? un v??lo, ??a devrait suffir...)"
                    ])
                    return null
                }
                sfx.play(sfx.boop)
                keysBlocked = true
                printDialogueBox(gameContainerTown1DialogueContainer, [
                    "(Des v??los... Je pourrais en voler un!)",
                    "OBTENU 1 x V??lo!"
                ], storeBike)
            }
        },
        {
            x: 226,
            y: 425,
            w: 130,
            h: 20,
            oncontact: () => {
                sfx.play(sfx.boop)
                keysBlocked = true
                printDialogueBox(gameContainerTown1DialogueContainer, [
                    `"Le Centre int??gr?? universitaire de sant?? et de services sociaux de l'Est de Hoenn regrette de vous informer que ce centre pok??mon est actuellement ferm??."`
                ])
            }
        },
        {
            // Return to mauville1
            x: 0,
            y: 570,
            w: 20,
            h: 135,
            oncontact: () => {
                loadArea(mauville1, canvas)
                player.x = 1050
            }
        }
    ],
    npc: {}
}

const mauville3 = {
    areaName: "Mauville",
    areaSectionId: 3,
    bgPath: "../assets/towns/mauvilleCity_3.jpg",
    layout: [
        {
            x:340,
            y:0,
            w: 400,
            h: 360
        },
        {
            x:660,
            y:367,
            w: 100,
            h: 360
        },
        {
            x:0,
            y:610,
            w: 677,
            h: 720
        },
        {
            x:113,
            y:0,
            w:250,
            h: 20,
            oncontact: () => {
                loadArea(mauville1, canvas)
                player.y = 700 - player.h
                player.x = 715
            }
        },
        {
            // To mauville 4
            x: 0,
            y: 335,
            h: 140,
            w: 20,
            oncontact: () => {
                loadArea(mauville4)
                player.x = 1060-player.w
                player.y += 50
            }
        }
    ],
    npc: {}
}


const mauville4 = {
    areaName: "Mauville",
    areaSectionId: 3,
    bgPath: "../assets/towns/mauvilleCity_4.jpg",
    layout: [
        {
            x:0,
            y:0,
            w: 1080,
            h: 410
        },
        {
            x: 720,
            y: 405,
            h: 20,
            w: 80,
            oncontact: () => {
                if (!itemInventory.includes("Bike")) {
                    sfx.play(sfx.boop)
                    keysBlocked = true
                    printDialogueBox(gameContainerTown1DialogueContainer, [
                        "(Je pourrais acheter des shorts ici...)",
                        "(Mais je n'ai pas d'argent.)"
                    ])
                    return null
                }
                if (itemInventory.includes("Bike") && itemInventory.includes("Shorts")) {
                    sfx.play(sfx.boop)
                    keysBlocked = true
                    printDialogueBox(gameContainerTown1DialogueContainer, [
                        "(Je n'ai plus rien ?? obtenir du magasin...)"
                    ])
                    return null
                }
                sfx.play(sfx.boop)
                keysBlocked = true
                printDialogueBox(gameContainerTown1DialogueContainer, [
                    "Le magasin g??n??ral.",
                    "...",
                    "Je pourrais vendre la bicyclette et obtenir des shorts!",
                    "VENDU 1 x V??lo",
                    `OBTENU 1x Shorts`
                ], () => {
                    itemInventory.push("Shorts")
                    gameContainerTown1DialogueContainer.innerHTML = ""
                    keysBlocked = false
                })
            }
        },
        {
            x: 1060,
            y:415,
            h: 160,
            w: 20,
            oncontact: () => {
                loadArea(mauville3)
                player.x = 21

            }
        }
    ],
    npc: {}
}

const mauvilleGym1 = {
    areaName: "Mauville Gym",
    areaSectionId: 1,
    bgPath: "../assets/gyms/mauvilleGym1.png",
    layout: [
        {
            x: 320,
            y: 466,
            w: 135,
            h: 124
        },
        {
            x: 604,
            y: 464,
            w: 143,
            h: 124,
        },
        {
            x:0,
            y:0,
            w: 180,
            h: 720
        },
        {
            x: 187,
            y: 457,
            w: 140,
            h: 260
        },
        {
            x: 395,
            y: 225,
            w: 273,
            h: 85
        },
        {
            x: 878,
            y: 0,
            w: 200,
            h: 720
        },
        {
            x: 743,
            y: 462,
            w: 140,
            h: 250,
        },
        {
            x: 670,
            y: 149,
            w: 200,
            h: 160,
        }, {
            x: 190,
            y: 0,
            w: 260,
            h: 108
        }, 
        {
            x: 654,
            w: 175,
            y: 20,
            h: 80,
            sprite: bgElements.mauvilleGymElectricity
        },
        {
            x:465,
            w: 135,
            y:0,
            h: 20,
            oncontact: () => {
                keysDown = {}
                loadArea(mauvilleGym2)
                player.x = 519
                player.y = 635
            }

        }

    ],
    npc: {
        flyingZigzagoon1: {
            x: 300,
            y: 125,
            w: 100,
            h: 85,
            speedX: 20,
            sprite: pokemonSprites.zigzagoon,
            loop: (self) => {
                self.x += self.speedX
                for (let i = 0; i < activeArea.layout.length; i++) {
                    if (collision(self, activeArea.layout[i])) {
                        self.speedX = -self.speedX
                    }
                    if (collision(self, player)) {
                        sfx.play(sfx.fwoop)
                        player.x = 488
                        player.y = 641
                        player.health -= 1
                    }

                }
            }
        },
        flyingZigzagoon2: {
            x: 375,
            y: 350,
            w: 100,
            h: 85,
            speedX: 8,
            sprite: pokemonSprites.zigzagoon,
            loop: (self) => {
                self.x += self.speedX
                for (let i = 0; i < activeArea.layout.length; i++) {
                    if (collision(self, activeArea.layout[i])) {
                        self.speedX = -self.speedX
                    }
                    if (collision(self, player)) {
                        player.x = 488
                        player.y = 641
                        sfx.play(sfx.fwoop)
                        player.health -= 1
                    }

                }
            }
        },
        button1: {
            x: 201,
            y: 324,
            w: 35,
            h: 60,
            oncontact: (self) => {
                self.hide = true
                sfx.play(sfx.boop)
                activeArea.npc.flyingZigzagoon1.hide = true
                activeArea.npc.flyingZigzagoon2.hide = true
                setTimeout(() => {
                    if (activeArea.areaSectionId != mauvilleGym1.areaSectionId) {
                        return null
                    }
                    
                    self.hide = false
                    activeArea.npc.flyingZigzagoon1.hide = false
                    activeArea.npc.flyingZigzagoon2.hide = false
                }, 3000)
            }
        }

    }
}

const mauvilleGym2 = {
    areaName: "Mauville Gym",
    areaSectionId: 2,
    bgPath: "../assets/gyms/mauvilleGym2.png",
    layout: [
        {
            x:0,
            y:0,
            w: 180,
            h: 720
        },
        {
            x: 878,
            y: 0,
            w: 200,
            h: 720
        },
        {
            x: 257,
            y: 562,
            w: 135,
            h: 66
        },
        {
            x: 188,
            y: 543,
            w: 50,
            h: 100,
        },
        {
            x: 398,
            y: 545,
            w: 60,
            h: 100,
        },
        {
            x: 190,
            w: 200,
            y: 0,
            h: 436
        },
        {
            x: 673,
            w: 200,
            y: 0,
            h: 376
        },
        {
            x: 391,
            w: 66,
            y: 198,
            h: 235
        },
        {
            x: 608,
            w: 66,
            y: 198,
            h: 235
        },
        {
            x: 608,
            y: 542,
            w: 68,
            h: 100,
            
        },
        {
            x: 674,
            y: 692,
            w: 200,
            h: 30
        },
        {
            x: 608,
            y: 452,
            w: 50,
            h: 80,
        },
        {
            x: 465,
            y: 291,
            w: 130,
            h: 60
        },
        {
            x: 402,
            y: 0,
            w: 256,
            h: 100,
            nocollide: true,
            oncontact: () => {
                music.stop(music.gymBattle)
                music.play(music.gymVictory)
                sfx.play(sfx.boop)
                keysBlocked = true
                function exitMauville() {
                    gymBadges.push("Mauville Badge")
                    saveGame()
                    location.href = "../town2/petalburg.html"
                }
                printDialogueBox(gameContainerTown1DialogueContainer, [
                    "Oof! Il n'y avais pas plus de choses ?? voir ici apr??s tout.",
                    "OBTENU 1x Badge du Gym de Mauville",
                ], exitMauville)
            }
        }
    ],
    npc: {
        flyingZigzagoon1: {
            x: 198,
            y: 459,
            w: 100,
            h: 75,
            speedX: 3,
            sprite: pokemonSprites.zigzagoon,
            loop: (self) => {
                self.x += self.speedX
                for (let i = 0; i < activeArea.layout.length; i++) {
                    if (collision(self, activeArea.layout[i])) {
                        self.speedX = -self.speedX
                    }
                    if (collision(self, player)) {
                        player.x = 537
                        player.y = 628
                        sfx.play(sfx.fwoop)
                        player.health -= 1
                    }

                }
            }
            
        },
        eonTicket: {
            x: 310,
            y:645,
            w:60,
            h:60,
            sprite: itemSprites.eonTicket,
            oncontact: (self) => {
                self.hide = true
                itemInventory.push("Ticket")
                activeArea.layout[11].sprite = bgElements.mauvilleGymFloorPattern
                activeArea.layout[11].nocollide = true
                sfx.play(sfx.boop)
            }
        },
        button1: {
            x: 406,
            y:457,
            w: 50,
            h: 55,
            oncontact: (self) => {
                self.hide = true
                activeArea.layout[2].sprite = bgElements.mauvilleGymFloorPattern
                activeArea.layout[2].nocollide = true
                activeArea.npc.flyingZigzagoon1.hide = true
                sfx.play(sfx.boop)
                setTimeout(() => {
                    if (activeArea.areaSectionId != mauvilleGym2.areaSectionId) {
                        return null
                    }
                    self.hide = false
                    activeArea.npc.flyingZigzagoon1.hide = false
                }, 2000)
            },
        },
        button2: {
            x: 476,
            y: 659,
            w: 50,
            h: 55,
            oncontact: (self) => {
                player.speed = 8
                self.hide = true
                keysBlocked = true
                sfx.play(sfx.boop)
                printDialogueBox(gameContainerTown1DialogueContainer, [
                    "Vitesse augment??e!"
                ])
            }
        },
        button3: {
            x: 753,
            y: 454,
            w: 50,
            h: 55,
            oncontact: (self) => {
                self.hide = true
                sfx.play(sfx.boop)
                activeArea.layout[12].sprite = bgElements.mauvilleGymFloorPattern
                activeArea.layout[12].nocollide = true
            }
        }

    }
}

function loadMauvilleGym1() {
    gameContainerTown1DialogueContainer.innerHTML = ""
    player.y = 525
    player.x = 496
    loadArea(mauvilleGym1)
    printDialogueBox(gameContainerTown1DialogueContainer, [
        "Oh non! Il y a des Zigazagoon sauvages dans le gym.",
        "Il faudrait les ??viter...",
        "(Les bouttons peuvent donner des effets.)"
    ])
    music.stop(music.mauville)
    music.play(music.gymBattle)
}
fullGameLoad()

loadArea(mauville1, canvas)
keysBlocked = true
printDialogueBox(gameContainerTown1DialogueContainer, [
    "(Voici Mauville City.)", 
    "(Le but sera de trouver le gym, combattre le gym leader et obtenir ton premier badge.)"
], startMauvilleSequence)
function startMauvilleSequence() {
    gameContainerTown1DialogueContainer.innerHTML = ""
    keysBlocked = false
    music.play(music.mauville)
}
player.x = 932
player. y = 14
saveGame()
function checkPlayerHealth() {
    if (player.health == 0) {
        paused = true
        gameContainerTown1.style.display = "none"
        gameContainerGameOver.style.display = "inherit"
        music.stop(music.gymBattle)
        return null
    }
    healthBar.style.width = String(player.health*26) + "px"
    healthNumber.innerHTML = `${player.health}/10`
}

function restartArea() {
    sfx.play(sfx.pokemonHealed)
    gameContainerTown1.style.display = "inherit"
    gameContainerGameOver.style.display = "none"
    loadArea(mauville2)
    sfx.pokemonHealed.addEventListener("ended", () => {
        music.play(music.mauville)
    })
    player.health = 10
    paused = false
    gameLoop()
    player.x = 261
    player. y = 493
}

function exitGame() {
    location.href = "../index.html"
}
function gameLoop(){
    if (paused) {
        return null
    }
    ctx.clearRect(0,0,canvas.width, canvas.height)
    player.handleMovement()
    player.draw()
    drawAreaObjects()
    checkPlayerHealth()
    playerNameDisplay.innerHTML = trainerName

    requestAnimationFrame(gameLoop)
}
gameLoop()
