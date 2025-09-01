import { createTeam, createTeamFromSnapshot, teamFromJSON, teamToJSON, flattenTeam } from "./useTeams.js";
import {
  loadRoster,
  saveSpecie,
  saveRoster,
  loadUserRosters,
  generateRosterID
} from "./useDatabase";
import { Roster } from "../DataStructures/Roster";
import { loadASpecie } from "./useSpecies";
import { Pokemon } from "../DataStructures/Pokemon";
import { Team } from "../DataStructures/Team.js";
import { Specie } from "../DataStructures/Specie.js";
import { createPokemon } from "./usePokemon.js";
import { loadMoveFromName } from "./useMoves.js";


export let globalRosters = [];

export let globalUserRoster = 0;
export let globalEnemyRoster = 1;

export let globalTemporaryRoster;

export const setRosters = (newRosters) => {
  globalRosters = newRosters;
};

export const setGlobalUserRoster = (newRoster) => {
  globalUserRoster = newRoster;
};

export const setGlobalEnemyRoster = (newRoster) => {
  globalEnemyRoster = newRoster;
};

export const setGlobalTemporaryRoster = (newRoster) => {
  globalTemporaryRoster = rosterFromJSON(rosterToJSON(newRoster));
};

export const saveGlobalTemporaryRoster = async ()=>{
  await generateRosterID(globalTemporaryRoster);
  globalRosters.push(globalTemporaryRoster);
  await saveARoster(globalTemporaryRoster);
};

export const createRoster = async (
  name,
  species = [],
  teams = [],
  rosterID,
  isShallow = true,
) => {
  let newSpecies=JSON.parse(JSON.stringify(species));
  if (!isShallow) {
    if (!Array.isArray(newSpecies)) species = [species];
    for (let i = 0; i < newSpecies.length; i++) {
      if (typeof newSpecies[i] == "string") {
        newSpecies[i] = await loadASpecie(newSpecies[i]);
      }
    }
  }
  console.log("createdRoster", new Roster(name, newSpecies, teams, rosterID, isShallow))
  return new Roster(name, newSpecies, teams, rosterID, isShallow);
};

export const loadARoster = async (rosterID, isShallow) => {
  const roster=await loadRoster(rosterID);
  return createRosterFromSnapshot(roster, isShallow);
};

export const loadRostersFromUser = async (user, isShallow) => {
  const rawRosters = await loadUserRosters(user);
  let rosters = [];
  for (const roster of rawRosters) {
    if (!roster) continue;
    rosters.push(createRosterFromSnapshot(roster, isShallow));
  }
  return rosters;
};

export const createRosterFromSnapshot = async (snapshot, isShallow) => {
  console.log("roster snapshot", snapshot)
  let name = snapshot.name;
  let id = snapshot.rosterID;
  let speciesList = snapshot.speciesList || snapshot.species;
  let teams = snapshot.teams;
  if (!isShallow) {
    let species = await Promise.all(
      speciesList.map((specie) =>
        loadASpecie(specie.name ? specie.name : specie),
      ),
    );
    if(teams){
      console.log("hi0")
    for (let i = 0; i < teams.length; i++) {
      teams[i] = createTeamFromSnapshot(teams[i], species);
      const team = teams[i];
    }
  } 
  }

  return createRoster(name, speciesList, teams, id, isShallow);
};

export const saveARoster = async (roster) => {
  if(roster instanceof Promise){roster= await roster}
  console.log("saving roster, useRosters:", roster);
  for (let i = 0; i < roster.species.length; i++) {
    if(roster.species[i] instanceof Specie) roster.species[i] = roster.species[i].name;
  }
  for (let i = 0; i < roster.teams.length; i++) {
    if(roster.teams[i] instanceof Team) {
      roster.teams[i]=flattenTeam(roster.teams[i]);
    }
  }
  await saveRoster(roster);
};

export const updateRoster = (roster) => {
  for (let i = 0; i < roster.species.length; i++) {
    roster.species[i] = roster.species[i].name;
  }
  for (let i = 0; i < roster.teams.length; i++) {
    for (let j = 0; j < roster.teams[i].pokemons.length; j++) {
      roster.teams[i].pokemons[j] = roster.teams[i].pokemons[i].specie.name;
    }
  }
  saveRoster(roster);
};

export const rosterToJSON = (roster) => {
  console.log("turning myslef into a json: ", roster);
  return {
    rosterID: roster.rosterID,
    name: roster.name,
    species: roster.species,
    teams: roster.teams.map((team) => teamToJSON(team)),
  };
};

export const rosterFromJSON = (json) => {
  if (!json) {
    return null;
  }
  const teams = json?.teams.map((teamJson) => teamFromJSON(teamJson));
  return createRoster(json.name, json.species, teams, json.rosterID);
};

export const addDefaultTeam = (roster) => {
  if(roster.species.length > 0){
    const pokemons =[];
    for (let i = 0; i < 6&&i<roster.species.length; i++) {
      pokemons.push(createPokemon(roster.species[i]));
    }
    roster.teams=[new Team('team1', pokemons)];
  }
}
