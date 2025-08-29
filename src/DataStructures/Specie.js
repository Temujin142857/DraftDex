export class Specie {
  constructor(
    name,
    sprite,
    baseStats,
    learnSet,
    moves = [],
    types,
    number,
    abilities,
    weight,
  ) {
    this.name = name;
    this.number = number;
    this.baseStats = baseStats;
    this.learnSet = learnSet;
    this.moves = moves;
    this.types = types;
    this.sprite = sprite;
    this.abilities = abilities;
    this.weight = weight;
  }
}
