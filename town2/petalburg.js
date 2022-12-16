const canvas=document.getElementById("gameContainerTown2")
const ctx=canvas.getContext("2d")
canvas.width = 1080
canvas.height = 720


let dude={
    x: 500,
    y: 500,
    w: 70,
    h:  85,
    speed:5
}

let npc1 ={
    x: 200,
    y: 500,
    w: 70,
    h:  85,
}

var boy = new Image()
boy.src = "../assets/characterSprites/birch.PNG"

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
    ctx.drawImage(boy, dude.x, dude.y, dude.w, dude.h)
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

function movement(){
    if("ArrowLeft" in keysDown && dude.x>0){
		dude.x-=dude.speed
	}
	if("ArrowRight" in keysDown && dude.x+dude.w<canvas.width){
		dude.x+=dude.speed
	}

	if("ArrowUp" in keysDown && dude.y>0){
		dude.y-=dude.speed
	}
	if("ArrowDown" in keysDown && dude.y+dude.h<canvas.height){
		dude.y+=dude.speed
	}

    for (let i = 0; i < activeWalls.length; i++) {
        collisionWall(dude, activeWalls[i])
    }

    /*collisions*/
/*    collisionWall(dude, wall1)
    collisionWall(dude, wall2)
    collisionWall(dude, wall3)
    collisionWall(dude, wall4)*/
}

function collision(objet1,objet2){
	if(objet1.x+objet1.w>objet2.x &&
        objet1.x<objet2.x+objet2.w && 
        objet1.y+objet1.h>objet2.y&& 
        objet1.y<objet2.y+objet2.h){
		return true
	}
}

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
	movement()
	requestAnimationFrame(gameLoop)
}
gameLoop()