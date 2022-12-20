# Architecture and design of the game

## Assets
- Assets folder w/ assets in png, wav, etc.
- Load assets as needed, w/ imports at the start

## Menu, Options
- DONE
- Options WIP

## Save
- Use localstorage to store a full playerState (pokemon, pc, bag, gym badges, position, etc.)

## Databasing pokemon
- Just a massive array of objects
    - i.e.: let pidgeot = {
        hp: 500,
        type: something,
        moves: [],
        etc. etc.
    }
- Index moves and effects seperately
- Limit ourselves to 20 MAX

## Catch, battle, store
- Bag and PC Data, entry in playerState localstorage entry
- Battle: create a battle gamecontainer class that we  can fill with various pokemon and dialog boxes 
    - i.e. 
    gameContainer has a slot for pokemon name
    we fill it using a document.querySelector and then put the trainer, text name, image, etc. etc.
    - possibility to use the html <template> to help with the whole thing because it allows to repeat blocks of html that are not displayed
- Catch, instantiate during the battle if health is under x, play animation of pokeball and random chance of catching and storing 

## Music and SFX
- Play when necessary
- Load them into the relevant methods

## Canvases, player movement, etc.
- Each town has an html page, and each section of town + each floor of the gym will be a different canvas background
- Each area will also have an object containing all the obstacles, collisions, etc. of the area
- They will be overlayed depending on the value of locationInGame.area and .areaSectionID

- walls could be a class 

## Character dialogue
- The goal is to be able to press X on a character to interact with them
- On contact, an eventListener should be added 
- When contact no longer exists, the eventListener should be destroyed
- On keypress, a single dialogue instance should be displayed