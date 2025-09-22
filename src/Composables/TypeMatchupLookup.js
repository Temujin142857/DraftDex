
export function typeChartCheck(move, defender) {
  switch (move) {
    case "normal":
      return normal(defender);
    case "fire":
      return fire(defender);
    case "water":
      return water(defender);
    case "grass":
      return grass(defender);
    case "electric":
      return electric(defender);
    case "ice":
      return ice(defender);
    case "fighting":
      return fighting(defender);
    case "poison":
      return poison(defender);
    case "ground":
      return ground(defender);
    case "flying":
      return flying(defender);
    case "psychic":
      return psychic(defender);
    case "bug":
      return bug(defender);
    case "rock":
      return rock(defender);
    case "ghost":
      return ghost(defender);
    case "dragon":
      return dragon(defender);
    case "dark":
      return dark(defender);
    case "steel":
      return steel(defender);
    case "fairy":
      return fairy(defender);
    default:
      return 1;
  }
}

function normal(defender) {
  switch (defender) {
    case "rock":
      return 0.5;
    case "ghost":
      return 0;
    case "steel":
      return 0.5;
    default:
      return 1;
  }
}

function fire(defender) {
  switch (defender) {
    case "fire":
      return 0.5;
    case "water":
      return 0.5;
    case "rock":
      return 0.5;
    case "dragon":
      return 0.5;
    case "grass":
      return 2;
    case "ice":
      return 2;
    case "bug":
      return 2;
    case "steel":
      return 2;
    default:
      return 1;
  }
}

function water(defender) {
  switch (defender) {
    case "water":
      return 0.5;
    case "grass":
      return 0.5;
    case "dragon":
      return 0.5;
    case "fire":
      return 2;
    case "ground":
      return 2;
    case "rock":
      return 2;
    default:
      return 1;
  }
}

function grass(defender) {
  switch (defender) {
    case "fire":
      return 0.5;
    case "grass":
      return 0.5;
    case "poison":
      return 0.5;
    case "flying":
      return 0.5;
    case "bug":
      return 0.5;
    case "dragon":
      return 0.5;
    case "steel":
      return 0.5;
    case "water":
      return 2;
    case "ground":
      return 2;
    case "rock":
      return 2;
    default:
      return 1;
  }
}

function electric(defender) {
  switch (defender) {
    case "electric":
      return 0.5;
    case "grass":
      return 0.5;
    case "dragon":
      return 0.5;
    case "water":
      return 2;
    case "flying":
      return 2;
    case "ground":
      return 0;
    default:
      return 1;
  }
}

function ice(defender) {
  switch (defender) {
    case "fire":
      return 0.5;
    case "water":
      return 0.5;
    case "ice":
      return 0.5;
    case "steel":
      return 0.5;
    case "grass":
      return 2;
    case "ground":
      return 2;
    case "flying":
      return 2;
    case "dragon":
      return 2;
    default:
      return 1;
  }
}

function fighting(defender) {
  switch (defender) {
    case "poison":
      return 0.5;
    case "flying":
      return 0.5;
    case "psychic":
      return 0.5;
    case "bug":
      return 0.5;
    case "fairy":
      return 0.5;
    case "rock":
      return 2;
    case "ice":
      return 2;
    case "normal":
      return 2;
    case "dark":
      return 2;
    case "steel":
      return 2;
    case "ghost":
      return 0;
    default:
      return 1;
  }
}

function poison(defender) {
  switch (defender) {
    case "poison":
      return 0.5;
    case "ground":
      return 0.5;
    case "rock":
      return 0.5;
    case "ghost":
      return 0.5;
    case "steel":
      return 0;
    case "grass":
      return 2;
    case "fairy":
      return 2;
    default:
      return 1;
  }
}

function ground(defender) {
  switch (defender) {
    case "grass":
      return 0.5;
    case "bug":
      return 0.5;
    case "flying":
      return 0;
    case "fire":
      return 2;
    case "electric":
      return 2;
    case "poison":
      return 2;
    case "rock":
      return 2;
    case "steel":
      return 2;
    default:
      return 1;
  }
}

function flying(defender) {
  switch (defender) {
    case "electric":
      return 0.5;
    case "rock":
      return 0.5;
    case "steel":
      return 0.5;
    case "grass":
      return 2;
    case "fighting":
      return 2;
    case "bug":
      return 2;
    default:
      return 1;
  }
}

function psychic(defender) {
  switch (defender) {
    case "psychic":
      return 0.5;
    case "steel":
      return 0.5;
    case "dark":
      return 0;
    case "fighting":
      return 2;
    case "poison":
      return 2;
    default:
      return 1;
  }
}

function bug(defender) {
  switch (defender) {
    case "fire":
      return 0.5;
    case "fighting":
      return 0.5;
    case "poison":
      return 0.5;
    case "flying":
      return 0.5;
    case "ghost":
      return 0.5;
    case "steel":
      return 0.5;
    case "fairy":
      return 0.5;
    case "grass":
      return 2;
    case "psychic":
      return 2;
    case "dark":
      return 2;
    default:
      return 1;
  }
}

function rock(defender) {
  switch (defender) {
    case "fighting":
      return 0.5;
    case "ground":
      return 0.5;
    case "steel":
      return 0.5;
    case "fire":
      return 2;
    case "ice":
      return 2;
    case "flying":
      return 2;
    case "bug":
      return 2;
    default:
      return 1;
  }
}

function ghost(defender) {
  switch (defender) {
    case "dark":
      return 0.5;
    case "normal":
      return 0;
    case "psychic":
      return 2;
    case "ghost":
      return 2;
    default:
      return 1;
  }
}

function dragon(defender) {
  switch (defender) {
    case "steel":
      return 0.5;
    case "fairy":
      return 0;
    case "dragon":
      return 2;
    default:
      return 1;
  }
}

function dark(defender) {
  switch (defender) {
    case "fighting":
      return 0.5;
    case "dark":
      return 0.5;
    case "fairy":
      return 0.5;
    case "psychic":
      return 2;
    case "ghost":
      return 2;
    default:
      return 1;
  }
}

function steel(defender) {
  switch (defender) {
    case "fire":
      return 0.5;
    case "water":
      return 0.5;
    case "electric":
      return 0.5;
    case "steel":
      return 0.5;
    case "ice":
      return 2;
    case "rock":
      return 2;
    case "fairy":
      return 2;
    default:
      return 1;
  }
}

function fairy(defender) {
  switch (defender) {
    case "fire":
      return 0.5;
    case "poison":
      return 0.5;
    case "steel":
      return 0.5;
    case "fighting":
      return 2;
    case "dragon":
      return 2;
    case "dark":
      return 2;
    default:
      return 1;
  }
}
