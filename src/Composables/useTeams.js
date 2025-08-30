import { Team } from "../DataStructures/Team";
import { Pokemon } from "../DataStructures/Pokemon";
import { pokemonToJSON, pokemonFromJSON } from "./usePokemon";

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
  console.log("replacing pokemon", pokemonToReplace, newPokemon)
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
  console.log("tem",team)
  return {
    name: team.name,
    pokemons: team.pokemons.map((pokemon) =>
      pokemon instanceof Pokemon ? pokemonToJSON(pokemon) : pokemon,
    ),
  };
};

export const teamFromJSON = (json) => {
  console.log(json)
  const pokemons = json.pokemons.map((pokemonJson) =>
    pokemonFromJSON(pokemonJson),
  );
  return new Team(json.name, pokemons);
};
