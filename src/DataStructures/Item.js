export class Item{
    constructor(name, multiplyer, conditions){
        this.label=name;
        this.name=name.toLowerCase();        
        this.multiplyer=multiplyer;
        this.conditions=conditions.toLowerCase();
    }
}

export const ITEMS = [
    // Type-boosting Plates
    new Item("Blank Plate", 1.2, "Normal-type moves"),
    new Item("Earth Plate", 1.2, "Ground-type moves"),
    new Item("Flame Plate", 1.2, "Fire-type moves"),
    new Item("Splash Plate", 1.2, "Water-type moves"),
    new Item("Meadow Plate", 1.2, "Grass-type moves"),
    new Item("Zap Plate", 1.2, "Electric-type moves"),
    new Item("Icicle Plate", 1.2, "Ice-type moves"),
    new Item("Fist Plate", 1.2, "Fighting-type moves"),
    new Item("Toxic Plate", 1.2, "Poison-type moves"),
    new Item("Mind Plate", 1.2, "Psychic-type moves"),
    new Item("Stone Plate", 1.2, "Rock-type moves"),
    new Item("Insect Plate", 1.2, "Bug-type moves"),
    new Item("Spooky Plate", 1.2, "Ghost-type moves"),
    new Item("Draco Plate", 1.2, "Dragon-type moves"),
    new Item("Dread Plate", 1.2, "Dark-type moves"),
    new Item("Iron Plate", 1.2, "Steel-type moves"),
    new Item("Sky Plate", 1.2, "Flying-type moves"),
    new Item("Pixie Plate", 1.2, "Fairy-type moves"),

    // Gems (used only once but very powerful)
    new Item("Normal Gem", 1.3, "First Normal-type move used"),
    new Item("Fire Gem", 1.3, "First Fire-type move used"),
    new Item("Water Gem", 1.3, "First Water-type move used"),
    new Item("Grass Gem", 1.3, "First Grass-type move used"),
    new Item("Electric Gem", 1.3, "First Electric-type move used"),
    new Item("Ice Gem", 1.3, "First Ice-type move used"),
    new Item("Fighting Gem", 1.3, "First Fighting-type move used"),
    new Item("Poison Gem", 1.3, "First Poison-type move used"),
    new Item("Ground Gem", 1.3, "First Ground-type move used"),
    new Item("Flying Gem", 1.3, "First Flying-type move used"),
    new Item("Psychic Gem", 1.3, "First Psychic-type move used"),
    new Item("Bug Gem", 1.3, "First Bug-type move used"),
    new Item("Rock Gem", 1.3, "First Rock-type move used"),
    new Item("Ghost Gem", 1.3, "First Ghost-type move used"),
    new Item("Dragon Gem", 1.3, "First Dragon-type move used"),
    new Item("Dark Gem", 1.3, "First Dark-type move used"),
    new Item("Steel Gem", 1.3, "First Steel-type move used"),
    new Item("Fairy Gem", 1.3, "First Fairy-type move used"),

    // Choice Items
    new Item("Choice Band", 1.5, "Boosts physical Attack, but locks move"),
    new Item("Choice Specs", 1.5, "Boosts Special Attack, but locks move"),
    new Item("Choice Scarf", 1.5, "Boosts Speed, but locks move"),

    // Other Stat-Boosting Items
    new Item("Life Orb", 1.3, "Boosts damage of all moves, costs 10% HP each use"),
    new Item("Expert Belt", 1.2, "Boosts super-effective move damage"),
    new Item("Muscle Band", 1.1, "Boosts physical move damage"),
    new Item("Wise Glasses", 1.1, "Boosts special move damage"),
    new Item("Metronome", 1.1, "Boosts repeated use of same move (up to 2x)"),
    new Item("Punching Glove", 1.1, "Boosts punching moves, prevents contact"),

    // Speed-altering Items
    new Item("Iron Ball", 0.5, "Halves holder's Speed"),
    new Item("Macho Brace", 0.5, "Halves Speed, doubles EV gain"),
    new Item("Power Anklet", 0.5, "Halves Speed, adds Speed EVs"),
    new Item("Lagging Tail", 0.0, "Always moves last"),
    new Item("Full Incense", 0.0, "Always moves last"),

    // Terrain-Boosting Items (Generation 8+)
    new Item("Terrain Extender", 1.0, "Extends terrain duration (indirectly boosts moves affected by terrain)"),
    new Item("Throat Spray", 1.0, "Boosts Sp. Atk when using sound move"),
    new Item("Booster Energy", 1.3, "Activates Protosynthesis/Quark Drive if no terrain"),

    // Ogerpon Masks
    new Item("Hearthflame Mask", 1.2, "Boosts all move damage"),
    new Item("Wellspring Mask", 1.2, "Boosts all move damage"),
    new Item("Cornerstone Mask", 1.2, "Boosts all move damage"),


];