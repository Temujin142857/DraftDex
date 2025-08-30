import { Pokemon } from "../DataStructures/Pokemon";
import { Specie } from "../DataStructures/Specie";
import { globalSpeciesList } from "./useSpecies";


const defaultSpecie=new Specie(
    "Bulbasaur",
    null,
    [45,49,49,65,65,45],
    ['razor-wind', 'swords-dance', 'cut', 'bind', 'vine-whip', 'headbutt', 'tackle', 'body-slam', 'take-down', 'double-edge', 'growl', 'strength', 'mega-drain', 'leech-seed', 'growth', 'razor-leaf', 'solar-beam', 'poison-powder', 'sleep-powder', 'petal-dance', 'string-shot', 'toxic', 'rage', 'mimic', 'double-team', 'defense-curl', 'light-screen', 'reflect', 'bide', 'sludge', 'skull-bash', 'amnesia', 'flash', 'rest', 'substitute', 'snore', 'curse', 'protect', 'sludge-bomb', 'mud-slap', 'outrage', 'giga-drain', 'endure', 'charm', 'false-swipe', 'swagger', 'fury-cutter', 'attract', 'sleep-talk', 'return', 'frustration', 'safeguard', 'sweet-scent', 'synthesis', 'hidden-power', 'sunny-day', 'rock-smash', 'facade', 'nature-power', 'helping-hand', 'ingrain', 'knock-off', 'secret-power', 'weather-ball', 'grass-whistle', 'bullet-seed', 'magical-leaf', 'natural-gift', 'worry-seed', 'seed-bomb', 'energy-ball', 'leaf-storm', 'power-whip', 'captivate', 'grass-knot', 'venoshock', 'acid-spray', 'round', 'echoed-voice', 'grass-pledge', 'work-up', 'grassy-terrain', 'confide', 'grassy-glide', 'tera-blast', 'trailblaze'],
    [ {name: 'razor-wind', power: 80, accuracy: 100, secondaryEffects: "Inflicts regular damage.  User's critical hit rate…ing.\n\nThis move cannot be selected by sleep talk.", targets: "all-opponents", type:"normal"},
      {name: 'swords-dance', power: 0, accuracy: 100, secondaryEffects: "Raises the user's Attack by two stages.", targets: 'user', type: "nromal"},
      {name: 'cut', power: 50, accuracy: 95, secondaryEffects: 'Inflicts regular damage.', targets: 'selected-pokemon', type: "normal"},
      {name: 'bind', power: 15, accuracy: 85, secondaryEffects: 'Inflicts regular damage.  For the next 2–5 turns, … 3 hits per use.\n\nrapid spin cancels this effect.', targets: 'selected-pokemon', type: "normal"}],
    ['grass', 'poison'],
    1,
    [{name: "overgrow", description: "Wenn ein Pokémon mit dieser Fähigkeit nur noch 1/3 seiner maximalen hp oder weniger hat, werden all seine grass Attacken verstärkt, so dass sie 1,5× so viel regular damage anrichten wie sonst."}, {name: "chlorophyll", description: "This Pokémon's Speed is doubled during strong sunlight.This bonus does not count as a stat modifier."}],
    69,);

export const createPokemon = (
  specie = defaultSpecie,
  moves = [],
  ability,
  nature = "Serious",
  evs = [0, 0, 0, 0, 0, 0],
  ivs = [31, 31, 31, 31, 31, 31],
  item = null,
  level = 100,
) => {
  let pokemon = new Pokemon(
    specie,
    nature,
    moves,
    evs,
    ivs,
    ability,
    item,
    level,
  );

  if (pokemon.specie instanceof Specie && pokemon.specie.baseStats) {
    for (let i = 0; i < 6; i++) {
      recalculateStat(pokemon, i);
    }
    if (moves.length === 0 && specie.moves) {
      for (let i = 0; i < 4 && i < specie.moves.length; i++) {
        pokemon.moves.push(specie.moves[i]);
      }
    }
    if (!ability && specie.abilities.length > 0) {
      pokemon.ability = specie.abilities[0];
    }
  }
  return pokemon;
};


export const createPokemonFromSnapshot = (snapshot) => {
  // Implement logic to create a Pokemon from a snapshot
  return null;
};

export const setIv = (pokemon, iv, index) => {
  pokemon.ivs[index] = iv;
  recalculateStat(pokemon, index);
};

export const setEv = (pokemon, ev, index) => {
  pokemon.evs[index] = ev;
  recalculateStat(pokemon, index);
};

export const setNature = (pokemon, nature) => {
  pokemon.nature = nature;
  updateNatureNums(pokemon);
};

export const updateNatureNums = (pokemon) => {
  const nature = pokemon.nature ? pokemon.nature.toLowerCase() : "";
  switch (nature) {
    case "hardy":
    case "docile":
    case "serious":
    case "bashful":
    case "quirky":
      pokemon.natureNums = [1, 1, 1, 1, 1, 1];
      break;
    case "lonely":
      pokemon.natureNums = [1, 1.1, 0.9, 1, 1, 1]; // Attack increased, Defense decreased
      break;
    case "adamant":
      pokemon.natureNums = [1, 1.1, 1, 1, 0.9, 1]; // Attack increased, Sp. Attack decreased
      break;
    case "naughty":
      pokemon.natureNums = [1, 1.1, 1, 1, 1, 0.9]; // Attack increased, Sp. Defense decreased
      break;
    case "brave":
      pokemon.natureNums = [1, 1.1, 1, 1, 1, 0.9]; // Attack increased, Speed decreased
      break;
    case "bold":
      pokemon.natureNums = [1, 0.9, 1.1, 1, 1, 1]; // Defense increased, Attack decreased
      break;
    case "impish":
      pokemon.natureNums = [1, 1, 1.1, 1, 0.9, 1]; // Defense increased, Sp. Attack decreased
      break;
    case "lax":
      pokemon.natureNums = [1, 1, 1.1, 1, 1, 0.9]; // Defense increased, Sp. Defense decreased
      break;
    case "relaxed":
      pokemon.natureNums = [1, 1, 1.1, 1, 1, 0.9]; // Defense increased, Speed decreased
      break;
    case "modest":
      pokemon.natureNums = [1, 0.9, 1, 1.1, 1, 1]; // Sp. Attack increased, Attack decreased
      break;
    case "mild":
      pokemon.natureNums = [1, 1, 0.9, 1.1, 1, 1]; // Sp. Attack increased, Defense decreased
      break;
    case "rash":
      pokemon.natureNums = [1, 1, 1, 1.1, 1, 0.9]; // Sp. Attack increased, Sp. Defense decreased
      break;
    case "quiet":
      pokemon.natureNums = [1, 1, 1, 1.1, 1, 0.9]; // Sp. Attack increased, Speed decreased
      break;
    case "calm":
      pokemon.natureNums = [1, 0.9, 1, 1, 1.1, 1]; // Sp. Defense increased, Attack decreased
      break;
    case "gentle":
      pokemon.natureNums = [1, 1, 0.9, 1, 1.1, 1]; // Sp. Defense increased, Defense decreased
      break;
    case "careful":
      pokemon.natureNums = [1, 1, 1, 0.9, 1.1, 1]; // Sp. Defense increased, Sp. Attack decreased
      break;
    case "sassy":
      pokemon.natureNums = [1, 1, 1, 1, 1.1, 0.9]; // Sp. Defense increased, Speed decreased
      break;
    case "timid":
      pokemon.natureNums = [1, 0.9, 1, 1, 1, 1.1]; // Speed increased, Attack decreased
      break;
    case "hasty":
      pokemon.natureNums = [1, 1, 0.9, 1, 1, 1.1]; // Speed increased, Defense decreased
      break;
    case "jolly":
      pokemon.natureNums = [1, 1, 1, 0.9, 1, 1.1]; // Speed increased, Sp. Attack decreased
      break;
    case "naive":
      pokemon.natureNums = [1, 1, 1, 1, 0.9, 1.1]; // Speed increased, Sp. Defense decreased
      break;
  }
  for (let i = 0; i < 6; i++) {
    recalculateStat(pokemon, i);
  }
};

export const recalculateStat = (pokemon, index) => {
  switch (index) {
    case 0:
      pokemon.stats[index] = Math.floor(
        ((2 * pokemon.specie.baseStats[index] +
          pokemon.ivs[index] +
          Math.floor(pokemon.evs[index] / 4)) *
          pokemon.level) /
          100 +
          pokemon.level +
          10,
      );
      break;
    default:
      pokemon.stats[index] = Math.floor(
        (((2 * pokemon.specie.baseStats[index] +
          pokemon.ivs[index] +
          Math.floor(pokemon.evs[index] / 4)) *
          pokemon.level) /
          100 +
          5) *
          pokemon.natureNums[index],
      );
  }
};

export const pokemonToJSON = (pokemon) => {
  return {
    specie: pokemon.specie,
    nature: pokemon.nature,
    moves: pokemon.moves,
    evs: pokemon.evs,
    ivs: pokemon.ivs,
    ability: pokemon.ability,
    item: pokemon.item,
    level: pokemon.level,
  };
};

export const pokemonFromJSON = (json) => {
  if (json.specie) {
    return new Pokemon(
      json.specie,
      json.nature,
      json.moves,
      json.evs,
      json.ivs,
      json.ability,
      json.item,
      json.level,
    );
  } else {
    return new Pokemon(globalSpeciesList.json);
  }
};

export const jsonFromPartialObject = (object) => {
  return {
    specie: object.specie,
    nature: object.nature,
    moves: object.moves,
    evs: object.evs,
    ivs: object.ivs,
    ability: object.ability,
    item: object.item,
    level: object.level,
  };
};


export const defaultPokemon=createPokemon();
