// Importation des packages
const { randomInt } = require('crypto')
const readline = require('readline-sync')

// Importation des fonctions & variables
const { draw } = require('./drawFunction')
const { makeDoors, userChooseDoor, userChangeDoor } = require('./gameModules')

const game = (statsOn, multiDoors) => {
  // Assignation des portes & initialisation du jeu
  let doors = makeDoors(multiDoors)

  // Affichage
  if (!statsOn && multiDoors === 3) { draw(doors) }

  // Choix d'une portes par l'utilisateur
  let choosedIndex = 0
  if (statsOn) {
    let randomDoor = randomInt(doors.length)
    doors[randomDoor].choosed = true
    choosedIndex = doors[randomDoor].index
  } else {
    [doors, choosedIndex] = userChooseDoor(doors)
  }

  // Le jeu ouvre une autre porte
  let openedDoor = 0
  let doorOpened = false
  while (!doorOpened) {
    let randomDoor = randomInt(doors.length)
    if (doors[randomDoor].loot !== 'CAR' && doors[randomDoor].choosed === false) {
      doors[randomDoor].display = ' GOAT '
      openedDoor = randomDoor
      doorOpened = true
    }
  }
  /*   Fonction sans multiDoors
  for (let door of doors) {
    if (door.loot !== 'CAR' && door.choosed === false) {
      door.display = ' GOAT '
      openedDoor = door.index
      break
    }
  }
  */
  // Affichage
  if (!statsOn && multiDoors === 3) {
    draw(doors)
    console.log(`Le jeu vous révèle la porte [${openedDoor + 1}]`)
  } else if (!statsOn) {
    console.log(`Le jeu vous révèle la porte [${openedDoor + 1}]`)
  }

  // Choix de changer de porte
  let changeDoor = false
  if (statsOn) {
    randomInt(2) === 0 ? changeDoor = true : changeDoor = false
  } else {
    changeDoor = readline.keyInYN(`Vous avez la porte [${choosedIndex + 1}]. Voulez-vous changer de porte ?`)
  }
  if (changeDoor) {
    doors = userChangeDoor(doors, choosedIndex)
  }

  // Résultats
  let gain = 'GOAT'
  for (let door of doors) {
    if (door.choosed === true && door.loot === 'CAR') {
      gain = 'CAR'
    }
  }
  return [choosedIndex + 1, changeDoor, gain]
}

exports.game = game