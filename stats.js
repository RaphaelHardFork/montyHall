// Importation de packages
const chalk = require('chalk')

// dataTable = [gate,change,win]
const stats = (dataTable) => {
  let nbOfData = dataTable.length
  let nbOfChange = dataTable.filter((elem) => elem[1] === true).length
  let nbWin = dataTable.filter((elem) => elem[2] === true).length

  let nbWinChange = dataTable.filter((elem) => elem[1] === true && elem[2] === true).length
  let nbWinNoChange = dataTable.filter((elem) => elem[1] === false && elem[2] === true).length
  let nbWinGate1 = dataTable.filter((elem) => elem[0] === 1 && elem[2] === true).length
  let nbWinGate2 = dataTable.filter((elem) => elem[0] === 2 && elem[2] === true).length
  let nbWinGate3 = dataTable.filter((elem) => elem[0] === 3 && elem[2] === true).length

  console.log(`\nPourcentage de chance de gagné si on change de porte : ${(nbWinChange / nbOfChange) * 100}%`)
  console.log(chalk.bold(`Pourcentage de chance de gagné si l'on ne change pas de porte : ${(nbWinNoChange / nbOfChange) * 100}%`))
  console.log('----------------------')
  console.log(`Pourcentage de chance de gagné si l'on choisit la porte 1 : ${(nbWinGate1 / nbWin) * 100}%`)
  console.log(chalk.bold(`Pourcentage de chance de gagné si l'on choisit la porte 2 : ${(nbWinGate2 / nbWin) * 100}%`))
  console.log(`Pourcentage de chance de gagné si l'on choisit la porte 3 : ${(nbWinGate3 / nbWin) * 100}%`)
  console.log('---------------------------------')
}

exports.stats = stats