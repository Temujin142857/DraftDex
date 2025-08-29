import { Team } from "../DataStructures/Team";

export const createTeam = (name = "", initialPokemons = []) => {
  let pokemons = [...initialPokemons]; // Create a new array

  const addPokemon = (pokemon) => {
    pokemons = [...pokemons, pokemon]; // Create a new array with added pokemon
  };

  const removePokemon = (pokemonToRemove) => {
    pokemons = pokemons.filter((pokemon) => pokemon !== pokemonToRemove); // Filter out the pokemon to remove
  };

  const getTeamState = () => {
    return {
      name,
      pokemons: [...pokemons], // Return a new array to avoid mutations
    };
  };

  return {
    addPokemon,
    removePokemon,
    getTeamState,
  };
};

export const createTeamFromSnapshot = (snapshot) => {
  return new Team(snapshot.name, snapshot.pokemons);
};
