const canvas=document.getElementById("gameContainerTown2")
const ctx=canvas.getContext("2d")
canvas.width = 1080
canvas.height = 720

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
        }
    ],
    npc: {
        oldMan: {
            x: 0,
            y: 540,
            w: 75,
            h: 90,
            sprite: characterSprites.oldMan
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

loadArea(petalburg1, canvas)


function gameLoop(){
	ctx.clearRect(0,0,canvas.width, canvas.height)
	player.handleMovement()
    player.draw()
    drawAreaObjects()
	requestAnimationFrame(gameLoop)
}
gameLoop()