const abilityHandlersDuringDamageCaclulation = {
  swarm: (ability, data) => {
    if(data.defending && data.below33&&data.move.type.toLowercase()==="bug")return 1.5;
  },
   torrent: (ability, data) => {
    if(data.defending && data.below33&&data.move.type.toLowercase()==="water")return 1.5;
  },
  overgrow: (ability, data) => {
    if(data.defending && data.below33&&data.move.type.toLowercase()==="grass")return 1.5;
  },
  blaze: (ability, data) => {
    if(data.defending && data.below33&&data.move.type.toLowercase()==="fire")return 1.5;
  },

  
  technician: (ability, data) => {
    if(!data.defending && data.move.power<=60)return 1.5;
  },
  
  damp: (ability, data) => {

  },
  "well baked body": (ability, data) => {
    if(data.defending && data.move.type.toLowercase()==="fire"){
      return 0;
    }
  },
  "water absorb": (ability, data) => {
    if(data.defending && data.move.type.toLowercase()==="water"){
      return 0;
    }
  },
  levitate: (ability, data) => {
    if(data.defending && data.move.type.toLowercase()==="ground"){
      return 0;
    }
  },
  "water bubble": (ability, data) => {
    if(data.defending && data.move.type.toLowercase()==="fire"){
      return 0.5;
    } else if(!data.defending && data.move.type.toLowercase()==="water"){
      return 2;
    }
  },
  "flash fire": (ability, data) => {
    if(data.defending && data.move.type.toLowercase()==="fire"){
      return 0;
    }
  },
  heatproof: (ability, data) => {
    if(data.defending && data.move.type.toLowercase()==="fire"){
      return 0.5;
    }
  },  
  "volt absorb": (ability, data) => {
    // logic for volt absorb
  },
  "wind rider": (ability, data) => {
    // logic for wind rider
  },
  transistor: (ability, data) => {
    // logic for transistor
  },
  "thick fat": (ability, data) => {
    // logic for thick fat
  },
  "sand force": (ability, data) => {
    // logic for sand force
  },
  "storm drain": (ability, data) => {
    // logic for storm drain
  },

  "mold breaker": (ability, data) => {
    // logic for mold breaker
  },
  "liquid ooze": (ability, data) => {
    // logic for liquid ooze
  },
  
  overcoat: (ability, data) => {
    // logic for overcoat
  },
  
  "punk rock": (ability, data) => {
    // logic for punk rock
  },
  infiltrator: (ability, data) => {
    // logic for infiltrator
  },
  "neutralising gas": (ability, data) => {
    // logic for neutralising gas
  },
  galvanize: (ability, data) => {
    // logic for galvanize
  },
  sturdy: (ability, data) => {
    // logic for sturdy
  },
  protean: (ability, data) => {
    // logic for protean
  },
  unaware: (ability, data) => {
    // logic for unaware
  },
  
  pixelate: (ability, data) => {
    // logic for pixelate
  },
  
  "good as gold": (ability, data) => {
    // logic for good as gold
  },
  sharpness: (ability, data) => {
    // logic for sharpness
  },
  
  "tera shell": (ability, data) => {
    // logic for tera shell
  },
  guts: (ability, data) => {
    // logic for guts
  },
  "sheer force": (ability, data) => {
    // logic for sheer force
  },
  
  "zero to hero": (ability, data) => {
    // logic for zero to heatproof
  },
  "tinted lens": (ability, data) => {
    // logic for tinted lens
  },
  "wind power": (ability, data) => {
    // logic for wind power
  },
  sniper: (ability, data) => {
    // logic for sniper
  },
  "supreme overlord": (ability, data) => {
    // logic for supreme overlord
  },
  "purifying salt": (ability, data) => {
    // logic for purifying salt
  },
  "queenly majesty": (ability, data) => {
    // logic for queenly majesty
  },
  "mind's eye": (ability, data) => {
    // logic for mind's eye
  },
  libero: (ability, data) => {
    // logic for libero
  },
  "beads of ruin": (ability, data) => {
    // logic for beads of ruin
  },
  "marvel scale": (ability, data) => {
    // logic for marvel scale
  },
  "multi scale": (ability, data) => {
    // logic for multi scale
  },
  "strong jaw": (ability, data) => {
    // logic for strong jaw
  },
  

  // ✅ Default fallback handler
  default: (ability) => {
    console.warn(`No handler defined for ability: "${ability}"`);
  }
};

const statModifyingAbilities = {
  protosynthesis: (ability, data) => {
    if(data.weather.toLowercase()==="harsh sunlight"||data.item.name.toLowercase()==="booster energy"){
      getHighest(data.pokemon.stats);
    }
  },  
  "quark drive": (ability, data) =>{
    if(data.terrain.toLowercase()==="electric terrain"||data.item.name.toLowercase()==="booster energy"){
      const index= getHighest(data.pokemon.stats);
      return {statIndex: index, multiplyer: index===5 ? 1.5 : 1.3};
    }
  },
  "light metal/ heavy metal": (ability, data) => {
    // logic for light metal/ heavy metal
  },
}

export function handleAbility(ability, data) {
  const handler = abilityHandlersDuringDamageCaclulation[ability] || abilityHandlersDuringDamageCaclulation.default;
  return handler(ability, data);
}

function getHighest(array){
  let max=0;
  let maxIndex;
  for (let index = 1; index < array.length; index++) {
    if (array[index]>max){
      max=array[index];
      maxIndex=index;
    }    
  }
  return maxIndex;
}