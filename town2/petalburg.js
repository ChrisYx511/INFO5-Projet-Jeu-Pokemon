const canvas=document.getElementById("gameContainerTown2")
const ctx=canvas.getContext("2d")
canvas.width = 1080
canvas.height = 720
canvas.style.backgroundImage = "url(../assets/towns/mauvilleCity_1.jpg)"

let dude={
    x: 500,
    y: 500,
    w: 70,
    h:  85,
    color: "blue",
    speed:5
}

let wall={
    x: 190,
    y: 100,
    w: 380,
    h: 250,
    color: "black"
}

function petalburg(){
    ctx.fillRect(dude.x, dude.y, dude.w, dude.h)
    ctx.fillStyle=dude.color

    ctx.fillRect(wall.x, wall.y, wall.w, wall.h)
    ctx.fillStyle=wall.color
}

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

    collisionWall(dude, wall)
}

function collision(objet1,objet2){
	if(objet1.x+objet1.w>objet2.x &&
        objet1.x<b.x+b.w && 
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

function gameLoop(){
	ctx.clearRect(0,0,canvas.width, canvas.height)
	petalburg()
	movement()
    collisionWall()
    collision(dude, wall)
	requestAnimationFrame(gameLoop)
}
gameLoop()
}