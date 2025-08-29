import { Specie } from "./Specie";
import { globalSpeciesList } from "../Composables/useSpecies";

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
    if (this.specie instanceof Specie && this.specie.baseStats) {
      for (let i = 0; i < 6; i++) {
        this.recalculateStat(i);
      }
      if (moves.length === 0 && specie.moves) {
        for (let i = 0; i < 4 && i < specie.moves.length; i++) {
          this.moves.push(specie.moves[i]);
        }
      }
      if (!ability && specie.abilities.length > 0) {
        this.ability = specie.abilities[0];
      }
    }
  }

  setIv = (iv, index) => {
    this.ivs[index] = iv;
    this.recalculateStat(index);
  };

  setEv = (ev, index) => {
    this.evs[index] = ev;
    this.recalculateStat(index);
  };

  setNature(nature) {
    this.nature = nature;
    this.updateNatureNums();
  }

  updateNatureNums() {
    const nature = this.nature ? this.nature.toLowerCase() : "";
    switch (nature) {
      case "hardy":
      case "docile":
      case "serious":
      case "bashful":
      case "quirky":
        this.natureNums = [1, 1, 1, 1, 1, 1];
        break;
      case "lonely":
        this.natureNums = [1, 1.1, 0.9, 1, 1, 1]; // Attack increased, Defense decreased
        break;
      case "adamant":
        this.natureNums = [1, 1.1, 1, 1, 0.9, 1]; // Attack increased, Sp. Attack decreased
        break;
      case "naughty":
        this.natureNums = [1, 1.1, 1, 1, 1, 0.9]; // Attack increased, Sp. Defense decreased
        break;
      case "brave":
        this.natureNums = [1, 1.1, 1, 1, 1, 0.9]; // Attack increased, Speed decreased
        break;
      case "bold":
        this.natureNums = [1, 0.9, 1.1, 1, 1, 1]; // Defense increased, Attack decreased
        break;
      case "impish":
        this.natureNums = [1, 1, 1.1, 1, 0.9, 1]; // Defense increased, Sp. Attack decreased
        break;
      case "lax":
        this.natureNums = [1, 1, 1.1, 1, 1, 0.9]; // Defense increased, Sp. Defense decreased
        break;
      case "relaxed":
        this.natureNums = [1, 1, 1.1, 1, 1, 0.9]; // Defense increased, Speed decreased
        break;
      case "modest":
        this.natureNums = [1, 0.9, 1, 1.1, 1, 1]; // Sp. Attack increased, Attack decreased
        break;
      case "mild":
        this.natureNums = [1, 1, 0.9, 1.1, 1, 1]; // Sp. Attack increased, Defense decreased
        break;
      case "rash":
        this.natureNums = [1, 1, 1, 1.1, 1, 0.9]; // Sp. Attack increased, Sp. Defense decreased
        break;
      case "quiet":
        this.natureNums = [1, 1, 1, 1.1, 1, 0.9]; // Sp. Attack increased, Speed decreased
        break;
      case "calm":
        this.natureNums = [1, 0.9, 1, 1, 1.1, 1]; // Sp. Defense increased, Attack decreased
        break;
      case "gentle":
        this.natureNums = [1, 1, 0.9, 1, 1.1, 1]; // Sp. Defense increased, Defense decreased
        break;
      case "careful":
        this.natureNums = [1, 1, 1, 0.9, 1.1, 1]; // Sp. Defense increased, Sp. Attack decreased
        break;
      case "sassy":
        this.natureNums = [1, 1, 1, 1, 1.1, 0.9]; // Sp. Defense increased, Speed decreased
        break;
      case "timid":
        this.natureNums = [1, 0.9, 1, 1, 1, 1.1]; // Speed increased, Attack decreased
        break;
      case "hasty":
        this.natureNums = [1, 1, 0.9, 1, 1, 1.1]; // Speed increased, Defense decreased
        break;
      case "jolly":
        this.natureNums = [1, 1, 1, 0.9, 1, 1.1]; // Speed increased, Sp. Attack decreased
        break;
      case "naive":
        this.natureNums = [1, 1, 1, 1, 0.9, 1.1]; // Speed increased, Sp. Defense decreased
        break;
    }
    for (let i = 0; i < 6; i++) {
      this.recalculateStat(i);
    }
  }

  recalculateStat(index) {
    switch (index) {
      case 0:
        this.stats[index] = Math.floor(
          ((2 * this.specie.baseStats[index] +
            this.ivs[index] +
            Math.floor(this.evs[index] / 4)) *
            this.level) /
            100 +
            this.level +
            10,
        );
        break;
      default:
        this.stats[index] = Math.floor(
          (((2 * this.specie.baseStats[index] +
            this.ivs[index] +
            Math.floor(this.evs[index] / 4)) *
            this.level) /
            100 +
            5) *
            this.natureNums[index],
        );
    }
  }

  toJSON() {
    return {
      specie: this.specie,
      nature: this.nature,
      moves: this.moves,
      evs: this.evs,
      ivs: this.ivs,
      ability: this.ability,
      item: this.item,
      level: this.level,
    };
  }

  static fromJSON(json) {
    if (json.specie) {
      return new Pokemon(
        json.specie,
        json.nature,
        json.moves,
        json.evs,
        json.ivs,
        json.ability,
        json.item,
        json.level,
      );
    } else {
      return new Pokemon(globalSpeciesList.json);
    }
  }

  static jsonFromPartialObject(object) {
    return {
      specie: object.specie,
      nature: object.nature,
      moves: object.moves,
      evs: object.evs,
      ivs: object.ivs,
      ability: object.ability,
      item: object.item,
      level: object.level,
    };
  }
}

export function createPokemonFromSnapshot(snapshot) {
  //check if the species is already loaded into memory
  //if not load it into memory
  return null;
}
