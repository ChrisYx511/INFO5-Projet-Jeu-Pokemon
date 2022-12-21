const canvas=document.querySelector("#gameContainerTown1 canvas")
const ctx=canvas.getContext("2d")
const gameContainerTown1DialogueContainer = document.querySelector(".dialogueContainer")
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
                    keysBlocked = true
                    printDialogueBox(gameContainerTown1DialogueContainer, [
                        "Omg shorts!"
                    ], loadMauvilleGym1)
                    return null
                }
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
                    itemInventory.push("Bike")
                    gameContainerTown1DialogueContainer.innerHTML = ""
                    keysBlocked = false
                }
                if (itemInventory.includes("Bike")) {
                    keysBlocked = true
                    printDialogueBox(gameContainerTown1DialogueContainer, [
                        "(J'ai déjà volé un vélo, ça devrait suffir...)"
                    ])
                    return null
                }
                keysBlocked = true
                printDialogueBox(gameContainerTown1DialogueContainer, [
                    "(Des vélos... Je pourrais en voler un!)",
                    "OBTENU 1 x Vélo!"
                ], storeBike)
            }
        },
        {
            x: 226,
            y: 425,
            w: 130,
            h: 20,
            oncontact: () => {
                keysBlocked = true
                printDialogueBox(gameContainerTown1DialogueContainer, [
                    `"Le Centre intégré universitaire de santé et de services sociaux de l'Est de Hoenn regrette de vous informer que ce centre pokémon est actuellement fermé."`
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
                    keysBlocked = true
                    printDialogueBox(gameContainerTown1DialogueContainer, [
                        "(Je pourrais acheter des shorts ici...)",
                        "(Mais je n'ai pas d'argent.)"
                    ])
                    return null
                }
                if (itemInventory.includes("Bike") && itemInventory.includes("Shorts")) {
                    keysBlocked = true
                    printDialogueBox(gameContainerTown1DialogueContainer, [
                        "(Je n'ai plus rien à obtenir du magasin...)"
                    ])
                    return null
                }
                keysBlocked = true
                printDialogueBox(gameContainerTown1DialogueContainer, [
                    "Le magasin général.",
                    "...",
                    "Je pourrais vendre la bicyclette et obtenir des shorts!",
                    "VENDU 1 x Vélo",
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
            x: 466,
            y: 668,
            w: 133,
            h: 20,
            oncontact: () => {
                loadArea(mauville1)
                player.x = 419
                player.y = 519
            }
        },
        {
            x: 320,
            y: 466,
            w: 135,
            h: 124
        }

    ],
    npc: {}
}

function loadMauvilleGym1() {
    gameContainerTown1DialogueContainer.innerHTML = ""
    keysBlocked = false
    player.y = 525
    player.x = 496
    loadArea(mauvilleGym1)
}

loadArea(mauville1, canvas)
player.x = 500
player. y = 500
function gameLoop(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    player.handleMovement()
    player.draw()
    drawAreaObjects()
    requestAnimationFrame(gameLoop)
}
gameLoop()
