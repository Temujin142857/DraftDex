const abilityHandlersDuringDamageCaclulation = {
  technician: () => {
    // logic for technician
  },
  swarm: () => {
    // logic for swarm
  },
  "light metal/ heavy metal": () => {
    // logic for light metal/ heavy metal
  },
  protosynthesis: () => {
    // logic for protosynthesis
  },
  damp: () => {
    // logic for damp
  },
  "well baked body": () => {
    // logic for well baked body
  },
  "water absorb": () => {
    // logic for water absorb
  },
  "mold breaker": () => {
    // logic for mold breaker
  },
  "liquid ooze": () => {
    // logic for liquid ooze
  },
  levitate: () => {
    // logic for levitate
  },
  overcoat: () => {
    // logic for overcoat
  },
  "water bubble": () => {
    // logic for water bubble
  },
  "flash fire": () => {
    // logic for flash fire
  },
  heatproof: () => {
    // logic for heatproof
  },
  "punk rock": () => {
    // logic for punk rock
  },
  "wind rider": () => {
    // logic for wind rider
  },
  infiltrator: () => {
    // logic for infiltrator
  },
  "neutralising gas": () => {
    // logic for neutralising gas
  },
  galvanize: () => {
    // logic for galvanize
  },
  sturdy: () => {
    // logic for sturdy
  },
  protean: () => {
    // logic for protean
  },
  unaware: () => {
    // logic for unaware
  },
  "volt absorb": () => {
    // logic for volt absorb
  },
  pixelate: () => {
    // logic for pixelate
  },
  torrent: () => {
    // logic for torrent
  },
  transistor: () => {
    // logic for transistor
  },
  overgrow: () => {
    // logic for overgrow
  },
  "good as gold": () => {
    // logic for good as gold
  },
  sharpness: () => {
    // logic for sharpness
  },
  "thick fat": () => {
    // logic for thick fat
  },
  "tera shell": () => {
    // logic for tera shell
  },
  guts: () => {
    // logic for guts
  },
  "sheer force": () => {
    // logic for sheer force
  },
  "sand force": () => {
    // logic for sand force
  },
  "storm drain": () => {
    // logic for storm drain
  },
  "zero to heatproof": () => {
    // logic for zero to heatproof
  },
  "tinted lens": () => {
    // logic for tinted lens
  },
  "wind power": () => {
    // logic for wind power
  },
  sniper: () => {
    // logic for sniper
  },
  "supreme overlord": () => {
    // logic for supreme overlord
  },
  "purifying salt": () => {
    // logic for purifying salt
  },
  "queenly majesty": () => {
    // logic for queenly majesty
  },
  "mind's eye": () => {
    // logic for mind's eye
  },
  libero: () => {
    // logic for libero
  },
  "beads of ruin": () => {
    // logic for beads of ruin
  },
  "marvel scale": () => {
    // logic for marvel scale
  },
  "multi scale": () => {
    // logic for multi scale
  },
  "strong jaw": () => {
    // logic for strong jaw
  },
  blaze: () => {
    // logic for blaze
  },

  // ✅ Default fallback handler
  default: (ability) => {
    console.warn(`No handler defined for ability: "${ability}"`);
  }
};

export function handleAbility(ability) {
  const handler = abilityHandlersDuringDamageCaclulation[ability] || abilityHandlersDuringDamageCaclulation.default;
  return handler(ability);
}
