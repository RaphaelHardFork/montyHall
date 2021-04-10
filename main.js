// Importation des packages
const readline = require('readline-sync')
const fs = require('fs')
const chalk = require('chalk')

// Importation des fonctions
const { game } = require('./gameV1')
const { stats } = require('./stats')

// Mode Stats
let statsOn = false
let iteration = 1
if (process.argv.includes('stats')) {
  statsOn = true
  iteration = Number(readline.question(chalk.bold('Combien d\'itération voulez-vous (en dessous de 10000) : ')))
  if (iteration === NaN) {
    iteration = 1
  } else if (iteration > 10000) {
    iteration = 10000
  }
}

// Mode multiDoors
let multiDoors = 3
if (process.argv.includes('multiDoors')) {
  multiDoors = Number(readline.question(chalk.bold('Avec combien de portes voulez-vous jouer ? (entre 3 et 1000) : ')))
  if (isNaN(multiDoors)) {
    console.log(chalk.red(`"${multiDoors}" n'est pas un nombre, le nombre de porte est fixé à 3 par defaut.`))
  } else if (multiDoors > 1000) {
    console.log(chalk.red(`Le nombre est au dessus de 1000. Le nombre de porte est fixé à mille.`))
  }
}


// Jeu pour un utilisateur (sans le mode Stats)
if (!statsOn) {
  console.log(chalk.bold.rgb(200, 0, 200)(`
  +-------------------------------+
  |                               |
  |   Bienvenue dans le TV Show   |
  |          MONTY HALL           |
  |                               |
  +-------------------------------+`))
  // Nom de l'utilisateur
  let username = ''
  let usernameHsl = 0
  while (!username) {
    username = readline.question(chalk.bold.hsl(usernameHsl, 75, 50)('Quel est ton nom ?'))
    usernameHsl = (usernameHsl + 10) % 360
  }
  let data = undefined
  do {
    if (data !== undefined && multiDoors !== 3) {
      multiDoors = Number(readline.question(chalk.bold('Choisissez le nombre de portes (entre 3 et 1000) : ')))
      if (multiDoors < 3 || multiDoors > 1000) {
        console.log(chalk.red('Le nombre doit être entre 3 et 1000. Par defaut il sera fixé à 3.'))
      }
    }
    // Le TVshow
    data = game(statsOn, multiDoors)

    if (data[2] === 'CAR') {
      console.log(chalk.green.bold('Vous avez gagné !!'))
    } else {
      console.log(chalk.red.bold('Dommage vous avez perdu...'))
    }

    // Ecrire dans un fichier TXT
    let textOutput = `${username}: GATE n°${data[0]}/${multiDoors} | Gate changed? ${data[1]} | he/she wins a ${data[2]}\n`
    if (!statsOn) {
      fs.appendFileSync('./gameRecord.txt', textOutput)
    }
  } while (readline.keyInYN('Veux tu refaire une partie ?'))
}

// Jeu en mode Stats
if (statsOn) {
  let dataTable = []
  for (i = 0; i < iteration; i++) {
    [gate, change, win] = game(statsOn, multiDoors)
    if (win === 'CAR') {
      win = true
    } else {
      win = false
    }
    dataTable.push([gate, change, win])
  }
  stats(dataTable)
}