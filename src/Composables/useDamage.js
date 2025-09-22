import { Item } from "../DataStructures/Item";
import { typeChartCheck } from "./TypeMatchupLookup";

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

