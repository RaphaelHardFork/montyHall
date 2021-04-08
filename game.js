// Importation des packages
const { randomInt } = require('crypto')
const readline = require('readline-sync')
const { draw } = require('./drawFunction')

const game = (statsOn) => {
  // Initiation du jeu (création des trois portes et de leurs contenu)
  let username = ''
  if (statsOn) {
    username = 'robot'
  } else {
    while (!username) {
      username = readline.question('Quel est ton nom ?')
    }
  }
  let gates = ['######', '######', '######']
  let montyHallGates = []
  for (let i = 0; i < 3; i++) {
    montyHallGates.push([i + 1, 'GOAT', false])
  }
  montyHallGates[randomInt(montyHallGates.length)][1] = 'CAR'


  // L'utilisateur choisi une porte
  let isFirstGatesChoosed = false
  let firstChoice = 0
  if (!statsOn) { draw(gates) }
  let CHOICE = ['Porte [1]', 'Porte [2]', 'Porte [3]']
  while (!isFirstGatesChoosed) {
    // Mode Stat
    if (statsOn) {
      firstChoice = randomInt(3)
    } else {
      firstChoice = readline.keyInSelect(CHOICE, 'Choisit une des trois portes ! ')
    }
    if (firstChoice === -1) {
      if (readline.keyInYN('Tu dois choisir l\'une des trois portes.\nVeux tu arrêter ?')) {
        console.log('\nA la prochaine !\n')
        process.exit(0)
      } else {
        continue
      }
    }
    montyHallGates[firstChoice][2] = true
    isFirstGatesChoosed = true
  }

  // Le jeu ouvre une des deux autres portes
  let openGate = 0
  let isOpen = false
  for (let elem of montyHallGates) {
    if (isOpen) {
      continue
    } else if (!elem.includes(true) && !elem.includes('CAR')) {
      openGate = elem[0]
      gates[elem[0] - 1] = ' GOAT '
      isOpen = true
    }
  }
  if (!statsOn) {
    draw(gates)
    console.log(`Le jeu vous révèle la porte [${openGate}] qui contient ${montyHallGates[openGate - 1][1]}`)
  }

  // L'utilisateur choisit de changer ou non sont choix
  let lastGate = 0
  for (let elem of montyHallGates) {
    if (!elem.includes(true) && elem[0] !== openGate) {
      lastGate = elem[0]
    }
  }
  CHOICE = [`Garder la porte [${firstChoice + 1}]`, `Choisir la porte [${lastGate}]`]

  let isChangeDecided = false
  let secondChoice = 0
  while (!isChangeDecided) {
    // Mode Stat
    if (statsOn) {
      secondChoice = randomInt(1, 3)
    } else {
      secondChoice = readline.keyInSelect(CHOICE, 'Choisissez l\'un des deux propositions.')
    }
    if (secondChoice === -1) {
      if (readline.keyInYN('Tu dois choisir si tu garde ou non ta porte.\nVeux tu arrêter ?')) {
        console.log('\nA la prochaine !\n')
        process.exit(0)
      } else {
        continue
      }
    } else {
      isChangeDecided = true
    }
  }

  // Changement de porte le cas écheant
  if (secondChoice === 1) {
    for (let elem of montyHallGates) {
      if (elem[0] === lastGate) {
        elem[2] = true
        secondChoice = elem[0] - 1
      } else if (elem[2] === true) {
        elem[2] = false
      }
    }
  } else {
    secondChoice = firstChoice
  }


  // Affichage final
  for (let elem of montyHallGates) {
    if (elem[1] === 'GOAT') {
      gates[elem[0] - 1] = ' GOAT '
    } else {
      gates[elem[0] - 1] = ' CAR  '
    }
  }
  if (!statsOn) {
    draw(gates)
  }

  // Le jeu affiche le résultat
  let gain = ''
  if (montyHallGates[secondChoice][1] === 'CAR') {
    if (!statsOn) { console.log('Vous avez gagné') }
    gain = 'CAR'
  } else {
    if (!statsOn) { console.log('Vous avez perdu') }
    gain = 'GOAT'
  }
  return [username, firstChoice + 1, secondChoice === firstChoice ? false : true, gain]
}

// Exportation de la fonction
exports.game = game