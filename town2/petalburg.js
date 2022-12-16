const canvas=document.getElementById("gameContainerTown2")
const ctx=canvas.getContext("2d")
canvas.width = 1080
canvas.height = 720

player.x = 500
player.y = 500


let npc1 ={
    x: 200,
    y: 500,
    w: 70,
    h:  85,
}


var oldMan = new Image()
oldMan.src="../assets/characterSprites/oldMan.jpg"

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
            x: 150,
            y: 600,
            w: 75,
            h:  90,
        }

    }

    
}

loadArea(petalburg1, canvas)

/*dessiner les maps*/
function petalburg(){
    ctx.drawImage(oldMan, petalburg1.npc.oldMan.x, petalburg1.npc.oldMan.y, petalburg1.npc.oldMan.w, petalburg1.npc.oldMan.h)
}

/*deplacement du joueur*/
let keysDown={}
document.addEventListener("keydown", (e) => {
    keysDown[e.key]=true
    console.log(keysDown)

})
document.addEventListener("keyup", (e) => {
	delete keysDown[e.key]
})



function collisionWall(d, p){
    if (collision(d, p)){
        if ("ArrowLeft" in keysDown || "ArrowRight" in keysDown){
            if (d.x<p.x+p.w/2){
                d.x-=d.speed
            }else{
                d.x+=d.speed
            }
        }	
            if ("ArrowUp" in keysDown || "ArrowDown" in keysDown){
            if (d.y<p.y+p.h/2){
                d.y-=d.speed
            }else{
                d.y+=d.speed
            }
    }
}
}

function gameLoop(){
	ctx.clearRect(0,0,canvas.width, canvas.height)
    petalburg()
	player.handleMovement()
	requestAnimationFrame(gameLoop)
}
gameLoop()