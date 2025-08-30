import { Team } from "../DataStructures/Team";
import { Pokemon } from "../DataStructures/Pokemon";
import { pokemonToJSON } from "./usePokemon";

export const createTeamFromSnapshot = (snapshot) => {
  return new Team(snapshot.name, snapshot.pokemons);
};

export const createTeamsFromSnapshot = (snapshot) => {};

export const addPokemon = (team, pokemonToAdd) => {
  if (
    !team.pokemons.some(
      (pokemon) => pokemon.specie.name === pokemonToAdd.specie.name,
    ) &&
    team.pokemons.length < 6
  ) {
    team.pokemons.push(pokemonToAdd);
    return true;
  } else {
    return false;
  }
};

export const replacePokemon = (team, pokemonToReplace, newPokemon) => {
  if (
    team.pokemons.some(
      (pokemon) => pokemon.specie.name === pokemonToReplace.specie.name,
    )
  ) {
    let index = team.pokemons.indexOf(pokemonToReplace);
    team.pokemons[index] = newPokemon;
    return true;
  } else {
    return false;
  }
};

export const removePokemon = (team, pokemon1) => {
  team.pokemons = team.pokemons.filter(
    (pokemon) => pokemon1.specie.name !== pokemon.specie.name,
  );
};

export const teamToJSON = (team) => {
  return {
    name: team.name,
    pokemons: team.pokemons.map((pokemon) =>
      pokemon instanceof Pokemon ? pokemonToJSON(pokemon) : pokemon,
    ),
  };
};

export const fromJSON = (json) => {
  const pokemons = json.pokemons.map((pokemonJson) =>
    Pokemon.fromJSON(pokemonJson),
  );
  return new Team(json.name, pokemons);
};
