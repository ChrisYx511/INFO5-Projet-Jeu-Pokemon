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
player.x = 500
player.y = 500



let petalburg1 = {
    areaName: "Petalburg",
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
        }
    ],
    npc: {
        oldMan: {
            x: 0,
            y: 540,
            w: 75,
            h: 90,
            sprite: characterSprites.oldMan,
            oncontact: () => {
                keysBlocked = true
                printDialogueBox(gameContainerTown2DialogueContainer, [
                    "gtfo lmao L + ration + you suck",
                    "yee yee ass haircut"
                ])
            }
        },
        randomBlaziken: {
            x: 150,
            y: 540,
            w: 75,
            h: 90,
            sprite: characterSprites.blaziken
        }
        

    },
    
}

const mauville2 = {
    areaName: "Mauville",
    areaSectionId: 2,
    bgPath: "../assets/towns/mauvilleCity_2.jpg",
    layout: [
        {
            // Return to mauville1
            x: 0,
            y: 570,
            w: 20,
            h: 135,
            oncontact: () => {
                loadArea(petalburg1, canvas)
                player.x = 1050
            }
        }
    ],
    npc: {}
}


loadArea(petalburg1, canvas)


function gameLoop(){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        player.handleMovement()
        player.draw()
        drawAreaObjects()
        requestAnimationFrame(gameLoop)
}
gameLoop()