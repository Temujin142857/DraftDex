export class Pokemon {
  constructor(
    specie = null,
    nature = "Serious",
    moves = [],
    evs = [0, 0, 0, 0, 0, 0],
    ivs = [31, 31, 31, 31, 31, 31],
    ability = null,
    item = null,
    level = 100,
    statChanges=[0,0,0,0,0,0]
  ) {
    this.specie = specie;
    this.nature = nature;
    this.moves = moves;
    this.evs = evs;
    this.ivs = ivs;
    this.ability = ability;
    this.item = item;
    this.stats = [];
    this.level = level;
    this.natureNums = [1, 1, 1, 1, 1, 1];
    this.statChanges = statChanges
  }
}
