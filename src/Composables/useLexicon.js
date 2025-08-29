const Lexicon = {
  homeHeader: { en: "Welcome to DraftDex", fr: "Bienvenu au DraftDex" },
  homeHeader2: {
    en: "Select two rosters to begin comparing or create a new roster to add to the draft",
    fr: "Choisi deux roster pour les comparer, ou créer un nouveau roster pour l'ajouter au draft",
  },
  newRoster: { en: "+ New Roster", fr: "+ nouveau roster" },
  socialTab: { en: "Social Tab", fr: "Tab Sociaux" },
  headerLNG: { en: "en", fr: "fr" },
  home: { en: "Home", fr: "Page d'Aqueuil" },
  roster: { en: "Create Roster", fr: "Fait Roster" },
  matchup: { en: "Matchup", fr: "Matchup" },
  moves: { en: "Moves", fr: "Attaques" },
  social: { en: "Social", fr: "Sociaux" },
  lng: { en: "en", fr: "fr" },
};

export let lng = "en";

export const getL = (key) => {
  if (!Lexicon[key]) return "";
  return Lexicon[key][lng] || "lexicon error";
};

export const swapLNG = (text, swap = true) => {
  if (swap) {
    lng = lng === "en" ? "fr" : "en";
  }
  console.log(lng);
  for (const key in text) {
    text[key] = getL(key);
  }
  return text;
};
