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
        {
            // section 2 de la foret
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
        
        
    ],
    npc: {},
}

const woods2 = {
    areaName: "Woods",
    areaSectionId: 3,
    bgPath: "../assets/wildZones/woods_2.jpg",
    layout:[
        {
            x: 488,
            y: 370,
            w: 290,
            h: 10,
        },
        {
            // section 3 de la foret
            x: 0,
            y: 520,
            w: 10,
            h: 200,
            oncontact: () => {
                loadArea(woods3, canvas)
                player.x = 935
                player.y = 600
            }
        }
    ],
    npc: {}
}
const woods3 = {
    areaName: "Woods",
    areaSectionId: 3,
    bgPath: "../assets/wildZones/woods_3.jpg",
    layout:[
        {
            x: 488,
            y: 370,
            w: 290,
            h: 10,
        } 

    ],
    npc: {}
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