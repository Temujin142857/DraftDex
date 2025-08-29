import { Team } from "./Team";
import { Pokemon } from "./Pokemon";
import { Specie } from "./Specie";
import { loadASpecie } from "../Composables/useSpecies";
import { createRoster } from "../Composables/useRosters";

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
  }

  toJSON() {
    console.log("turning myslef into a json: ", this);
    return {
      rosterID: this.rosterID,
      name: this.name,
      species: this.species,
      teams: this.teams.map((team) => team.toJSON()),
    };
  }

  static fromJSON(json) {
    if (!json) {
      return null;
    }
    const teams = json?.teams.map((teamJson) => Team.fromJSON(teamJson));
    console.log("rosterFromJson: ", json);
    return createRoster(json.name, json.species, teams, json.rosterID);
  }
}
