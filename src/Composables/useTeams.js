import { Team } from "../DataStructures/Team";
import { Pokemon } from "../DataStructures/Pokemon";
import { pokemonToJSON, pokemonFromJSON, flattenPokemon, createPokemon } from "./usePokemon";
import { loadMoveFromName } from "./useMoves";

export const createTeamFromSnapshot = async (snapshot, species) => {  
  console.log("team snapshot", snapshot)
  for (let i = 0; i < snapshot.pokemons.length; i++) {
    if (typeof snapshot.pokemons[i] == "string") {
      const specie = species.find((s) => s.name === snapshot.pokemons[i]);
      snapshot.pokemons[i] = createPokemon(specie);
    } else {
      snapshot.pokemons[i].specie = species.find(
      (s) => s.name === snapshot.pokemons[i].specie);    
    }
    for (let j = 0; j < snapshot.pokemons[i].moves.length; j++) {            
      snapshot.pokemons[i].moves[j] = (typeof snapshot.pokemons[i].moves[j]== "string") ? await loadMoveFromName(snapshot.pokemons[i].moves[j]) : snapshot.pokemons[i].moves[j];            
    }
  }
  if(snapshot.pokemons[0].stats){
    console.log("hino")
    return new Team(snapshot.name, snapshot.pokemons);
  }else{
    console.log("hiyes")
    console.log("hiyes",snapshot.pokemons)
    let pokemons=snapshot.pokemons.map((pokemon)=>{return createPokemon(pokemon.specie,pokemon.moves,pokemon.ability,pokemon.nature, pokemon.evs, pokemon.ivs, pokemon.item || null, pokemon.level)})
    console.log("hiyes2",pokemons)
    return new Team(snapshot.name, pokemons);
  }
  
};

export const createTeamsFromSnapshot = (snapshot) => {};

export const createDefaultTeam=(speciesList)=>{
  let pokemons=[];
  for (let i = 0; i < speciesList.length&&i<6; i++) {
    pokemons.push(createPokemon(speciesList[i]));
  }
  return new Team("team1", pokemons)
}

export const flattenTeam = (team)=>{
  let newTeam={name: team.name, pokemons: []};
  for (let i = 0; i < team.pokemons.length; i++) {
     newTeam.pokemons.push(flattenPokemon(team.pokemons[i]));    
  }
  return newTeam;
}

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
  for (let i = 0; i < team.pokemons.length; i++) {
    if (team.pokemons[i].specie.name===pokemonToReplace.specie.name ) {
      team.pokemons[i] = newPokemon;
      console.log(newPokemon, i)
      return true;
    }   
  }
  return false;
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
