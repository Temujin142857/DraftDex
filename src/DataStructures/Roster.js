import { Team } from "./Team";
import { Pokemon } from "./Pokemon";

export class Roster {
  constructor(name, species = [], teams = [], rosterID) {
    this.name = name;
    this.species = species;
    this.teams = teams;
    this.rosterID = rosterID;
    if (species.length > 0 && teams.length === 0) {
      const pokemons = [];
      for (let i = 0; i < 6 && i < species.length; i++) {
        pokemons.push(new Pokemon(species[i]));
      }
      this.teams = [new Team("team1", pokemons)];
    }
    this.isShallow = true;
  }
}
