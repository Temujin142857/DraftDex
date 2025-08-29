export class Move {
  constructor(
    name,
    power = 0,
    accuracy = 100,
    type,
    category,
    pp = 1,
    targets = 1,
    secondaryEffects = null,
  ) {
    this.name = name;
    this.power = power;
    this.accuracy = accuracy;
    this.secondaryEffects = secondaryEffects;
    this.targets = targets;
    this.pp = pp;
    this.type = type;
    this.category = category;
  }
}
