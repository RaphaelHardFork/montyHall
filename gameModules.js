// Importation des packages
const { randomInt } = require('crypto')
const readline = require('readline-sync')


// Initialisation du jeu 
const makeDoors = (multiDoors) => {
  let doors = []
  for (let i = 0; i < multiDoors; i++) {
    doors.push({ index: i, display: '######', loot: 'GOAT', choosed: false })
  }
  // Intégration de la voiture
  doors[randomInt(doors.length)].loot = 'CAR'
  return doors
}

// L'utilisateur choisit une porte
const userChooseDoor = (doors) => {
  let choosedIndex = 0
  let isFirstGatesChoosed = false
  let CHOICE = ['Porte [1]', 'Porte [2]', 'Porte [3]']
  if (doors.length === 3) {
    while (!isFirstGatesChoosed) {
      switch (readline.keyInSelect(CHOICE, 'Choisit une des trois portes ! ')) {
        case 0:
          doors[0].choosed = true
          choosedIndex = 0
          break
        case 1:
          doors[1].choosed = true
          choosedIndex = 1
          break
        case 2:
          doors[2].choosed = true
          choosedIndex = 2
          break
        default:
          if (readline.keyInYN('Tu dois choisir l\'une des trois portes.\nVeux tu arrêter ?')) {
            console.log('\nA la prochaine !\n')
            process.exit(0)
          } else {
            continue
          }
      }
      isFirstGatesChoosed = true
    }
  } else { // Mode multiDoors
    while (!isFirstGatesChoosed) {
      choosedIndex = Number(readline.question(`Choisit une porte entre 1 et ${doors.length} : `))
      choosedIndex--
      if (isNaN(choosedIndex)) {
        console.log('Veuillez choisir un nombre.')
        continue
      } else if (choosedIndex > doors.length - 1) {
        console.log('Le nombre choisit est trop grand')
        continue
      } else {
        doors[choosedIndex].choosed = true
        isFirstGatesChoosed = true
      }
    }
  }
  return [doors, choosedIndex]
}

// L'utilisateur change de porte
const userChangeDoor = (doors, index) => {
  let doorChanged = false
  while (!doorChanged) {
    let randomDoor = randomInt(doors.length)
    if (doors[randomDoor].choosed === true || doors[randomDoor].display === ' GOAT ') {
      continue
    } else {
      for (let door of doors) {
        if (door.index === index) {
          door.choosed = false
          doorChanged = true
        }
      }
      doors[randomDoor].choosed = true
    }
  }
  return doors
}


exports.makeDoors = makeDoors
exports.userChooseDoor = userChooseDoor
exports.userChangeDoor = userChangeDoor