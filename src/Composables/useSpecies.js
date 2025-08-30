import { Specie } from "../DataStructures/Specie";
import { getCachedData, cacheData } from "./useLocalStorage";
import { loadSpecie, saveSpecie } from "./useDatabase";
import { fetchGeneric, fetchSpecies } from "./usePokeAPI";
import { Ability } from "../DataStructures/Ability";
import { createMoveFromSnapshot, loadMoveFromName } from "./useMoves";

export let globalSpeciesList = {};

export const createSpecieFromJson = async (json) => {
  if (!json) {
    return null;
  }
  let moves = json.moves;
  if (!moves) {
    moves = [];
    for (const move of json.learnSet) {
      moves.push(await loadMoveFromName(move));
    }
  }
  if (moves instanceof String) {
    let moveNames = moves.split(",");
    let movesArray = [];
    for (const moveName of moveNames) {
      movesArray.push(await loadMoveFromName(moveName));
    }
    moves = movesArray;
  }
  return new Specie(
    json.name,
    null,
    json.baseStats,
    json.learnSet,
    moves,
    json.types,
    json.number,
    json.abilities,
    json.weight,
  );
};

const createSpecieFromAPI = async (json) => {
  if (!json) return null;
  let stats = [];
  for (const stat of json.stats) {
    stats.push(stat.base_stat);
  }
  let abilities = [];
  for (const ability of json.abilities) {
    const abilityData = await fetchGeneric(ability.ability.url);
    console.log("ability data gotten from api", abilityData);
    abilities.push(
      new Ability(
        ability.ability.name,
        abilityData.effect_entries.length
          ? abilityData.effect_entries[abilityData.effect_entries.length - 1]
              .effect
          : null,
      ),
    );
  }
  let learnSet = [];
  let moves = [];
  for (const move of json.moves) {
    learnSet.push(move.move.name);
    moves.push(await loadMoveFromName(move.move.name));
  }
  let types = [];
  for (const type of json.types) {
    types.push(type.type.name);
  }
  return new Specie(
    json.name,
    null,
    stats,
    learnSet,
    moves,
    types,
    json.id,
    abilities,
    json.weight,
  );
};
export const loadASpecie = async (specieName) => {
  let specie = await createSpecieFromJson(await getCachedData(specieName));
  if (!validateSpecie(specie)) {
    specie = await createSpecieFromJson(await loadSpecie(specieName));
    console.log("loaded species from database", specie);
  } else {
    console.log("loaded species from cache", specie);
  }
  if (!validateSpecie(specie)) {
    console.log("specie not in cache or database", specie, specieName);
    specie = await createSpecieFromAPI(await fetchSpecies(specieName));
    console.log("loaded species from api", specie);
    if (specie?.name) {
      let specieNoMoves = { ...specie };
      specieNoMoves.moves = null;
      cacheData(specieName, specieNoMoves);
      saveSpecie(specieNoMoves);
    }
  } else {
    let specieNoMoves = { ...specie };
    specieNoMoves.moves = null;
    cacheData(specieName, specieNoMoves);
  }
  if (validateSpecie(specie)) {
    globalSpeciesList[specie.name] = specie;
  }
  return globalSpeciesList[specie.name];
};

const validateSpecie = (specie) => {
  return (
    specie &&
    specie.name &&
    specie.baseStats &&
    specie.abilities &&
    specie.learnSet &&
    specie.weight &&
    specie.number
  );
};
