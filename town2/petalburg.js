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


function gameLoop(){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        player.handleMovement()
        player.draw()
        drawAreaObjects()
        requestAnimationFrame(gameLoop)
}
gameLoop()