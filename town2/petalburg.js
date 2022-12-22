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
        //creux
        {
            x: 488,
            y: 370,
            w: 290,
            h: 10,
        },
        // paquet d'arbres à droite
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
        // rangée d'arbres en bas à droite
        {
            x: 785,
            y: 250,
            w: 350,
            h: 160,
        },
        // rangée d'arbres en bas à gauche
        {
            x: 0,
            y: 640,
            w: 380,
            h: 80,
        },
        // paquet d'arbres à gauche du creux
        {
            x: 200,
            y: 250,
            w: 290,
            h: 170,
        },
        // section 2 de la forêt
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
        // pancarte
        {
            x: 400,
            y: 450,
            w: 30,
            h: 30,
            oncontact: () => {
                sfx.play(sfx.boop)
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
                sfx.play(sfx.boop)
                keysBlocked = true
                printDialogueBox(gameContainerTown2DialogueContainer, [
                    "Mais que vois-la je!",
                    "Un jeune garcon qui se promène dans cette forêt... si dangereuse.",
                    "Je te conseillerais de ne pas t'approcher des zigzagoons...",
                    "...ils sont beaucoup plus aggressifs que tu ne le penses.",
                    "Ne perdez pas d'espoir! Je suis sûre que tu vas survivre...",
                    "...du coup je l'espère."
                ])
            }
        },
        zigzagoon1:{
            x: 0,
            y: 550,
            w: 80,
            h: 60,
            speed: 3,
            sprite: pokemonSprites.zigzagoon,
            oncontact: (self) => {
                ouch()
            } 
        },
    },
}

const woods2 = {
    areaName: "Woods",
    areaSectionId: 3,
    bgPath: "../assets/wildZones/woods_2.jpg",
    layout:[
        //paquet d'arbres en bas
        {
            x: 300,
            y: 550,
            w: 600,
            h: 160,
        },
        //série d'arbres à droite
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
        //creux
        {
            x: 175,
            y: 180,
            w: 250,
            h: 10,
        },
        //arbres en haut à gauche
        {
            x: 0,
            y: 100,
            w: 150,
            h: 160,
        },
    
        // retourner à la section 1 de la forêt
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
        // retourner à la section 1 de la forêt (piège)
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
        // aller vers la section 3 de la forêt
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
                y: 110,
                w: 110,
                h: 100,
                sprite: characterSprites.farmer,
                oncontact: () => {
                        sfx.play(sfx.boop)
                        keysBlocked = true
                        printDialogueBox(gameContainerTown2DialogueContainer, [
                            "Tu veux aller à Petalburg?",
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
        // arbres à gauche
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
        // arbres en haut à droite
        {
            x: 225,
            y: 0,
            w: 40,
            h: 200,
        },
    

        // retourner à la section 2 de la forêt
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
        // aller vers la section 4 de la forêt
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
        // arbres à gauche
        {
            x: 0,
            y: 200,
            w: 90,
            h: 500,
        },
        {
            x: 0,
            y: 0,
            w: 620,
            h: 290,
        },
        // 3 arbres en bas
        {
            x: 410,
            y: 620,
            w: 300,
            h: 70,
        },
        // arbres avant de sortir des bois
        {
            x: 410,
            y: 620,
            w: 300,
            h: 70,
        },

        // pancarte
        {
            x: 580,
            y: 370,
            w: 30,
            h: 30,
            oncontact: () => {
                sfx.play(sfx.boop)
                keysBlocked = true
                printDialogueBox(gameContainerTown2DialogueContainer, [
                    "Vous y êtes presque!",
                    "Il y aura de la nourriture pour vous soigner dans la ville.",
                    '"Note: les fermiers sont suspicieux vous ne trouvez pas?"'
                ])
        }
        },
        // retourner à la section 3 de la forêt
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
    npc:{
        trainer:{
            x: 885,
            y: 230,
            w: 110,
            h: 90,
            sprite: characterSprites.trainer,
            oncontact: () => {
                    sfx.play(sfx.boop)
                    keysBlocked = true
                    printDialogueBox(gameContainerTown2DialogueContainer, [
                        "Salut!",
                        "Mais qu'est-ce que-",
                        "Vous avez survecu a traverser la foret sans pokemon!?",
                        "Je vous dois mon respect en tant que jeune amateur. Tenez.",
                        'Vous avez obtenu 100$'
                    ])
            }
        }
    }
}

function playMusic(){
        music.play(music.petalburg)
}

const petalburg1 = {
    areaName: "Petalburg",
    areaSectionId: 4,
    bgPath: "../assets/towns/petalburgCity_1.jpg",
    layout: [
        // pokemon center
        {
            x: 210,
            y: 310,
            w: 290,
            h: 280,
        },
        // shop
        {
            x: 620,
            y: 50,
            w: 290,
            h: 230,
        },
        // colonne d'arbres
        {
            x: 930,
            y: 260,
            w: 150,
            h: 230,
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
    npc:{
        nurse:{
            x: 265,
            y: 530,
            w: 120,
            h: 85,
            sprite: characterSprites.nurse,
            oncontact: () => {
                    sfx.play(sfx.boop)
                    keysBlocked = true
                    printDialogueBox(gameContainerTown2DialogueContainer, [
                        "Bonjour!",
                        "Malheureusement le pokemon center est ferme temporairement dans cette ville du a des renovations.",
                        "Je suis vraiment desole de ne pas pouvoir vous aider avec des soins."
                    ])
            }
        }
    }
}

const petalburg2 = {
    areaName: "Petalburg",
    areaSectionId: 4,
    bgPath: "../assets/towns/petalburgCity_2.jpg",
    layout: [
        // maison
        {
            x: 222,
            y: 160,
            w: 280,
            h: 250,
        },
        // colone d'arbres
        {
            x: 50,
            y: 5,
            w: 170,
            h: 430,
        },
        // rivière
        {
            x: 0,
            y: 480,
            w: 60,
            h: 200,
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
    npc:{
        scientific:{
            x: 380,
            y: 400,
            w: 120,
            h: 90,
            sprite: characterSprites.scientific,
            oncontact: () => {
                    sfx.play(sfx.boop)
                    keysBlocked = true
                    printDialogueBox(gameContainerTown2DialogueContainer, [
                        "J'en ai marre de la vie.",
                    ])
            }
        }
    }
}

const petalburg3 = {
    areaName: "Petalburg",
    areaSectionId: 4,
    bgPath: "../assets/towns/petalburgCity_4.jpg",
    layout: [
        //colone d'arbres à gauche
        {
            x: 0,
            y: 290,
            w: 70,
            h: 440,
        },
         // rangée d'arbres
        {
            x: 70,
            y: 600,
            w: 900,
            h: 70,
        },
        // colone d'arbres à droite
        {
            x: 980,
            y: 200,
            w: 80,
            h: 600,
        },
        // pots de fleurs
        {
            x: 810,
            y: 150,
            w: 150,
            h: 100,
        },
        // maison
        {
            x: 500,
            y: 240,
            w: 280,
            h: 80,
        },
        // colone de buisson à l'entrée
        {
            x: 405,
            y: 40,
            w: 50,
            h: 220,
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
        //gym
        {
            x: 670,
            y: 230,
            w: 290,
            h: 150,
        },
        // buissons a droite
        {
            x: 1000,
            y: 380,
            w: 50,
            h: 110,
        },
        // buissons du milieu
        {
            x: 500,
            y: 430,
            w: 150,
            h: 50,
        },
        {
            x: 570,
            y: 50,
            w: 90,
            h: 330,
        },
        // maison
        {
            x: 270,
            y: 100,
            w: 290,
            h: 140,
        },
        // colones d'arbres a droite
        {
            x: 100,
            y: 170,
            w: 80,
            h: 230,
        },
        {
            x: 0,
            y: 330,
            w: 100,
            h: 230,
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
player.x = 510
player.y = 630
keysBlocked = true
printDialogueBox(gameContainerTown2DialogueContainer,[
    "Proche de Petalburg..."
], startPetalburgArea)
function startPetalburgArea() {
    gameContainerTown2DialogueContainer.innerHTML = ""
    keysBlocked = false
    playMusic()
}

//function finiTot()

var barreDeVie = document.getElementById("life")
var pointsDeVie = 208

function ouch(){
    player.x = 420
    player.y = 520

    var viesPerdues = 52
    barreDeVie.style.width = pointsDeVie + "px"
    
    pointsDeVie -= viesPerdues
    
    keysBlocked = true
    printDialogueBox(gameContainerTown2DialogueContainer, [
        "Eille!! Ca fait mal!!!",
        'Vous avez perdu quelques points de vie'
    ])
    if (pointsDeVie == -52 || pointsDeVie < -52){
        player.x = 510
        player.y = 630
        pointsDeVie += 208
        printDialogueBox(gameContainerTown2DialogueContainer, [
            "Vous vous etes reveillez a l'entree de la foret..."
        ])
    }
}

function gameLoop(){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        player.handleMovement()
        player.draw()
        drawAreaObjects()
        requestAnimationFrame(gameLoop)
}
gameLoop()