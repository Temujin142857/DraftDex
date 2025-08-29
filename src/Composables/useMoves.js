import { cacheData, getCachedData } from "./useLocalStorage";
import { loadMove, saveMove } from "./useDatabase";
import { fetchMove } from "./usePokeAPI";
import { Move } from "../DataStructures/Move";

export let moves = {};

export const loadMoveFromName = async (name) => {
  if (moves[name]) {
    return moves[name];
  } else {
    moves[name] = createMoveFromSnapshot(await getCachedData(name));
  }

  if (!validateMove(moves[name])) {
    //wasn't found in cache, try to load from database
    moves[name] = createMoveFromSnapshot(await loadMove(name));
  }

  if (!validateMove(moves[name])) {
    //wasn't found in database, hit api and save to db and cache
    moves[name] = createMoveFromApi(await fetchMove(name));
    saveMove(moves[name]);
    cacheData(name, moves[name]);
  } else {
    //was found in database
    cacheData(name, moves[name]);
  }
  return moves[name];
};

export function createMoveFromSnapshot(snapshot) {
  //console.log("data for move from cache/database:", snapshot);
  if (!snapshot) {
    return null;
  }
  return new Move(
    snapshot.name,
    snapshot.power,
    snapshot.accuracy,
    snapshot.type,
    snapshot.category,
    snapshot.pp,
    snapshot.targets,
    snapshot.secondaryEffects,
  );
}

export function createMoveFromApi(data) {
  //console.log("data for move from api:", data);
  let secondaryEffect =
    data.effect_entries?.[data.effect_entries.length - 1]?.effect;
  return new Move(
    data.name,
    data.power,
    data.accuracy,
    data.type.name,
    data.damage_class.name,
    data.pp,
    data.target.name,
    secondaryEffect,
  );
}

function validateMove(move) {
  // Check if 'move' is defined and has all the required properties
  return (
    move &&
    typeof move.power !== "undefined" &&
    typeof move.accuracy !== "undefined" &&
    typeof move.type !== "undefined" &&
    typeof move.category !== "undefined"
  );
}
