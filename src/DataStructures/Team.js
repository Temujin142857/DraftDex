import { Pokemon } from "./Pokemon";

export class Team {
  constructor(name = "team1", pokemons = []) {
    this.name = name;
    this.pokemons = pokemons;
  }

  addPokemon = (pokemonToAdd) => {
    if (
      !this.pokemons.some(
        (pokemon) => pokemon.specie.name === pokemonToAdd.specie.name,
      ) &&
      this.pokemons.length < 6
    ) {
      this.pokemons.push(pokemonToAdd);
      return true;
    } else {
      return false;
    }
  };

  replacePokemon = (pokemonToReplace, newPokemon) => {
    if (
      this.pokemons.some(
        (pokemon) => pokemon.specie.name === pokemonToReplace.specie.name,
      )
    ) {
      let index = this.pokemons.indexOf(pokemonToReplace);
      this.pokemons[index] = newPokemon;
      return true;
    } else {
      return false;
    }
  };

  removePokemon = (pokemon1) => {
    this.pokemons = this.pokemons.filter(
      (pokemon) => pokemon1.specie.name !== pokemon.specie.name,
    );
  };
  toJSON() {
    return {
      name: this.name,
      pokemons: this.pokemons.map((pokemon) =>
        pokemon instanceof Pokemon ? pokemon.toJSON() : pokemon,
      ),
    };
  }

  static fromJSON(json) {
    const pokemons = json.pokemons.map((pokemonJson) =>
      Pokemon.fromJSON(pokemonJson),
    );
    return new Team(json.name, pokemons);
  }
}

export function createTeamsFromSnapshot(snapshot) {}
