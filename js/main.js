// Projet de jeu 2D - insipiré par Pokémon
/*
Collège Jean-Eudes - Xi Yang, Felix Wu
24 novembre 2022 - Concentration Informatique [Y13542-02]
*/

//HEADER
let playerData = {
    x: 59,
    y:34
}
localStorage.setItem("player", JSON.stringify(playerData))
console.log(JSON.parse(localStorage.getItem("player")))

let array = [Treecko,Poochyena]
let testPokemon = new array[Math.floor(Math.random()*2)]()
testPokemon.nickname = "ta mere"
console.log(testPokemon)