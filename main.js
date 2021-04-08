// Importation des packages
const readline = require('readline-sync')
const fs = require('fs')

// Importation des fonctions
const { game } = require('./game')
const { stats } = require('./stats')

// Mode Stats
let statsOn = false
let iteration = 1
if (readline.keyInYN('Voulez-vous activer le mode stat')) {
  statsOn = true
  iteration = Number(readline.question('Combien d\'itération voulez-vous (en dessous de 10000) : '))
  if (iteration === NaN) {
    iteration = 1
  } else if (iteration > 10000) {
    iteration = 10000
  }
}


// Jeu pour un utilisateur (sans le mode Stats)
if (!statsOn) {
  do {
    // Le TVshow
    let data = game(statsOn)


    // Ecrire dans un fichier TXT
    let textOutput = `${data[0]}: GATE n°${data[1]} | Gate changed? ${data[2]} | he/she wins a ${data[3]}\n`
    if (!statsOn) {
      fs.appendFileSync('./gameRecord.txt', textOutput)
    }
  } while (readline.keyInYN('Veux tu refaire une partie ?'))
}

// Jeu en mode Stats
if (statsOn) {
  let dataTable = []
  for (i = 0; i < iteration; i++) {
    [user, gate, change, win] = game(statsOn)
    if (win === 'CAR') {
      win = true
    } else {
      win = false
    }
    dataTable.push([gate, change, win])
  }
  stats(dataTable)
}