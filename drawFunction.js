const draw = (gates) => {
  console.log(`
      ##            ##            ##
    ######        ######        ######
  ##########    ##########    ##########
  ##########    ##########    ##########
  ##########    ##########    ##########
  ##${gates[0]}##    ##${gates[1]}##    ##${gates[2]}##
  ##########    ##########    ##########
  ##########    ##########    ##########
     [1]           [2]           [3]`)
}


exports.draw = draw