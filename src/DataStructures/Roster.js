export class Roster {
  constructor(name, species = [], teams = [], rosterID, isShallow=true) {
    this.name = name;
    this.species = species;
    this.teams = teams;
    this.rosterID = rosterID;
    this.isShallow = isShallow;
  }
}
