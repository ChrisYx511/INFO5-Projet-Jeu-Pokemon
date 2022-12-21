const canvas=document.querySelector("#gameContainerTown2 canvas")
const ctx=canvas.getContext("2d")
const gameContainerTown2DialogueContainer = document.querySelector(".dialogueContainer")
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

const woods1 = {
    areaName: "Woods",
    areaSectionId: 3,
    bgPath: "../assets/wildZones/woods_1.jpg",
    layout: [
        {
            x: 488,
            y: 370,
            w: 290,
            h: 10,
        },
        {
            x: 685,
            y: 640,
            w: 350,
            h: 225,
        },
        {
            x: 984,
            y: 430,
            w: 150,
            h: 80,
        },
        {
            x: 785,
            y: 250,
            w: 350,
            h: 160,
        },
        {
            x: 0,
            y: 640,
            w: 380,
            h: 80,
        },
        {
            x: 200,
            y: 250,
            w: 290,
            h: 170,
        },
        // section 2 de la foret
        {
            x: 980,
            y: 10,
            w: 70,
            h: 10,
            oncontact: () => {
                loadArea(woods2, canvas)
                player.x = 935
                player.y = 600
            }
        },
        //pancarte 1
        {
            x: 400,
            y: 450,
            w: 20,
            h: 20,
            oncontact: () => {
                keysBlocked = true
                printDialogueBox(gameContainerTown2DialogueContainer, [
                    "Bienvenue dans la foret de Petalburg!",
                    "Attention! Des pokemons rodent sur les lieux..."
                ])
            }
        }
    ],

    npc: {
        vieuxVeteran:{
            x: 1010,
            y: 550,
            w: 70,
            h: 90,
            sprite: characterSprites.oldMan,
            oncontact: () => {
                keysBlocked = true
                printDialogueBox(gameContainerTown2DialogueContainer, [
                    "Mais que vois-la je!",
                    "Un jeune garcon qui se promene dans cette foret... si dangereuse...",
                    "Je te conseillerais de ne pas t'approcher des zigzagoons...",
                    "...ils sont beaacoup plus aggressifs que vous ne le pensez.",
                    "Ne perdez pas d'espoir! Je suis sure que tu vas survivre...",
                    "...du coup je l'espere."
                ])
            }
        }
    },
}

const woods2 = {
    areaName: "Woods",
    areaSectionId: 3,
    bgPath: "../assets/wildZones/woods_2.jpg",
    layout:[
        {
            x: 300,
            y: 550,
            w: 600,
            h: 160,
        },
        {
            x: 1030,
            y: 315,
            w: 50,
            h: 405,
        },
        {
            x: 490,
            y: 150,
            w: 600,
            h: 110,
        },
        {
            x: 175,
            y: 180,
            w: 250,
            h: 10,
        },
        {
            x: 0,
            y: 100,
            w: 150,
            h: 160,
        },
        // retourner a la section 1 de la foret
        {
            x: 910,
            y: 715,
            w: 180,
            h: 10,
            oncontact: () => {
                loadArea(woods1, canvas)
                player.x = 995
                player.y = 65
            }  
        },
        // retourner a la section 1 de la foret (piege)
        {
            x: 50,
            y: 700,
            w: 180,
            h: 10,
            oncontact: () => {
                loadArea(woods1, canvas)
                player.x = 350
                player.y = 70
            }  
        },
        // aller vers la section 3 de la foret
        {
            x: 0,
            y: 340,
            w: 10,
            h: 180,
            oncontact: () => {
                loadArea(woods3, canvas)
                player.x = 950
                player.y = 530
            }
        },
       
    ],
        npc: {
            fermier:{
                x: 260,
                y: 130,
                w: 70,
                h: 90,
                sprite: characterSprites.oldMan,
                oncontact: () => {
                        keysBlocked = true
                        printDialogueBox(gameContainerTown2DialogueContainer, [
                            "Tu veux aller a Petalburg?",
                            "Prenez le chemin vers le bas. Trust.",
                        ])
                }
            }
        }
}

const woods3 = {
    areaName: "Woods",
    areaSectionId: 3,
    bgPath: "../assets/wildZones/woods_3.jpg",
    layout:[
        {
            x: 300,
            y: 510,
            w: 570,
            h: 140,
        },
        {
            x: 620,
            y: 0,
            w: 570,
            h: 140,
        },
        {
            x: 225,
            y: 0,
            w: 40,
            h: 200,
        },
        // retourner a la section 2 de la foret
        {
            x: 910,
            y: 715,
            w: 180,
            h: 10,
            oncontact: () => {
                loadArea(woods2, canvas)
                player.x = 65
                player.y = 410
            }  
        },
        // aller vers la section 4 de la foret
        {
            x: 310,
            y: 0,
            w: 270,
            h: 10,
            oncontact: () => {
                loadArea(woods4, canvas)
                player.x = 230
                player.y = 585
            } 
        },
       

    ],
    npc: {}
}

const woods4 = {
    areaName: "Woods",
    areaSectionId: 3,
    bgPath: "../assets/wildZones/woods_4.jpg",
    layout: [
        {
            x: 488,
            y: 370,
            w: 290,
            h: 10,
        },
        // retourner a la section 3 de la foret
        {
            x: 130,
            y: 700,
            w: 180,
            h: 10,
            oncontact: () => {
                loadArea(woods3, canvas)
                player.x = 420
                player.y = 100
            } 
        },
        // aller vers Petalburg!
        {
            x: 765,
            y: 35,
            w: 100,
            h: 10,
            oncontact: () => {
                loadArea(petalburg1, canvas)
                player.x = 940
                player.y = 600
            } 
        }
    ],
    npc:{}
}

const petalburg1 = {
    areaName: "Petalburg",
    areaSectionId: 4,
    bgPath: "../assets/towns/petalburgCity_1.jpg",
    layout: [
        {
            x: 0,
            y: 0,
            w: 290,
            h: 10,
        },
        // aller vers Petalburg2
        {
            x: 0,
            y: 620,
            w: 10,
            h: 80,
            oncontact: () => {
                loadArea(petalburg2, canvas)
                player.x = 945
                player.y = 275
                } 
        }
            
    ],
    npc:{}
}

const petalburg2 = {
    areaName: "Petalburg",
    areaSectionId: 4,
    bgPath: "../assets/towns/petalburgCity_2.jpg",
    layout: [
        {
            x: 0,
            y: 0,
            w: 290,
            h: 10,
        },
        // retourner vers Petalburg1
        {
            x: 1070,
            y: 240,
            w: 10,
            h: 150,
            oncontact: () => {
                loadArea(petalburg1, canvas)
                player.x = 130
                player.y = 630
                } 
        },
        // aller vers Petalburg3
        {
            x: 700,
            y: 700,
            w: 140,
            h: 10,
            oncontact: () => {
                loadArea(petalburg3, canvas)
                player.x = 210
                player.y = 60
                } 
        },
        // aller vers Petalburg4
        {
            x: 700,
            y: 0,
            w: 140,
            h: 10,
            oncontact: () => {
                loadArea(petalburg4, canvas)
                player.x = 820
                player.y = 620
                } 
        }
    ],
    npc:{}
}

const petalburg3 = {
    areaName: "Petalburg",
    areaSectionId: 4,
    bgPath: "../assets/towns/petalburgCity_4.jpg",
    layout: [
        {
            x: 0,
            y: 700,
            w: 290,
            h: 10,
        },
        // retourner vers Petalburg2
        {
            x: 170,
            y: 0,
            w: 180,
            h: 10,
            oncontact: () => {
                loadArea(petalburg2, canvas)
                player.x = 740
                player.y = 600
                } 
        },
    ],
    npc:{}
}

const petalburg4 = {
    areaName: "Petalburg",
    areaSectionId: 4,
    bgPath: "../assets/towns/petalburgCity_3.jpg",
    layout: [
        {
            x: 0,
            y: 0,
            w: 290,
            h: 10,
        },
        // retourner vers Petalburg2
        {
            x: 770,
            y: 700,
            w: 180,
            h: 10,
            oncontact: () => {
                loadArea(petalburg2, canvas)
                player.x = 740
                player.y = 80
                } 
        },
            
    ],
    npc:{}
}

loadArea(woods1, canvas)
player.x = 500
player.y = 500

function gameLoop(){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        player.handleMovement()
        player.draw()
        drawAreaObjects()
        requestAnimationFrame(gameLoop)
}
gameLoop()