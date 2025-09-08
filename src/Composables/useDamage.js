import { Item } from "../DataStructures/Item";

export function calculateDamage(
  attackingPokemon,
  move,
  defendingPokemon,
  item,
  burn = 1,
  screens = 1,
  targets = 1,
  weather = 1,
  critical = 1,
  other = 1,
  terrain = 1,
) {
  if(move.category==="status"){return { min: 0, max: 0 };}
  if(attackingPokemon.item&&!item){
    item=attackingPokemon.item;
  }
  let isStab = attackingPokemon.specie?.types.some((type) => {
    return type === move?.type;
  }); 
  let stab=1;
  if(isStab){
    stab=attackingPokemon.ability.name.toLowerCase()==="adaptability"? 2:1.5
  }

  let randmax = 1;
  let randmin = 0.85;
  let typeWeakness = 1;
  //console.log("move",move)
  for (const type in defendingPokemon.specie?.types) {
    typeWeakness *= typeChartCheck(
      move.type.toLowerCase(),
      defendingPokemon.specie.types[type].toLowerCase(),
    );
  }
  let attackStat =
    move.category.toLowerCase() === "physical"
      ? attackingPokemon.stats[1]
      : attackingPokemon.stats[3];
  let defenceStat =
    move.category.toLowerCase() === "physical"
      ? defendingPokemon.stats[2]
      : defendingPokemon.stats[4];
      
  if(item && (item instanceof Item||(item.name&&item.multiplyer&&item.conditions))){
    console.log("item multiplyer", getItemMulitplyer(item, move, typeWeakness))
    other=other*getItemMulitplyer(item, move, typeWeakness);
  }

  let nonRandDmg =
    (
      getBaseDmg(attackingPokemon.level, move.power, attackStat, defenceStat)
    ) *
    targets *
    weather *
    critical *
    burn *
    terrain *
    stab *
    other *
    typeWeakness;
   // console.log("damageCalc summary",attackingPokemon, defendingPokemon, move, attackStat, defenceStat)
    console.log("damgage calc flat:", move.name, randmin * nonRandDmg, randmax * nonRandDmg)
  return { min: Math.floor(randmin * nonRandDmg), max: Math.floor(randmax * nonRandDmg)};
}


//These 2 functions I got straight from the pkm showdown calcutor's source code, and modified slightly
//https://calc.pokemonshowdown.com
function getBaseDmg(level, basePower, attack, defense){
  return Math.floor((Math.floor(((Math.floor((2 * level) / 5 + 2) * basePower) * attack) / defense) / 50 + 2));
}

function pokeRound(num) {
    return num % 1 > 0.5 ? Math.ceil(num) : Math.floor(num);
}





function getItemMulitplyer(item, move, typeWeakness){
  const itemName=item.name.toLowerCase();
  //plates and gems
  if(itemName.includes("plate")||itemName.includes("gem")){
    if(item.conditions.includes(move.type.toLowerCase())){
      return item.multiplyer;
    }
  }else if (itemName.includes("choice")|| itemName==="muscle band"||itemName==="wise glasses"){
    if(item.conditions.includes(move.category)){
      return item.multiplyer;
    }
  }else if(itemName==="black belt"){
    if(typeWeakness>1){
      return item.multiplyer;
    }
  } else if(itemName==="life orb"){
    return item.multiplyer;
  } else if(itemName.includes("mask")){
    return item.multiplyer;
  }
  return 1;
}

function getAbilityMultiplyer(ability, move){

}


function typeChartCheck(move, defender) {
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
