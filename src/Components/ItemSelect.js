import React, { useState } from "react";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";

const pokemonItems = [
  { value: "leftovers", label: "Leftovers" },
  { value: "black-belt", label: "Black Belt" },
  { value: "choice-band", label: "Choice Band" },
  { value: "choice-specs", label: "Choice Specs" },
  { value: "focus-sash", label: "Focus Sash" },
  { value: "life-orb", label: "Life Orb" },
  { value: "light-clay", label: "Light Clay" },
  { value: "power-herb", label: "Power Herb" },
  { value: "white-herb", label: "White Herb" },
  { value: "mental-herb", label: "Mental Herb" },
  { value: "muscle-band", label: "Muscle Band" },
  { value: "safety-goggles", label: "Safety Goggles" },
  { value: "rocky-helmet", label: "Rocky Helmet" },
  { value: "focus-band", label: "Focus Band" },
  { value: "choice-scarf", label: "Choice Scarf" },
  { value: "air-balloon", label: "Air Balloon" },
  { value: "assault-vest", label: "Assault Vest" },
];

const PokemonItemsSelect = ({ onChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedItems(selectedOptions);
    onChange(selectedOptions);
  };

  return (
    <div style={{ width: "100%" }}>
      <Select
        options={pokemonItems}
        value={selectedItems}
        onChange={handleChange}
        placeholder="Select Pokémon Items..."
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: "40px",
            borderRadius: "8px",
            boxShadow: "none",
            borderColor: "#ccc",
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
          }),
          option: (provided, state) => ({
            ...provided,
            borderBottom: "1px dotted gray",
            color: state.isSelected ? "white" : "black",
            backgroundColor: state.isSelected ? "#5a98d6" : "white",
            "&:hover": {
              backgroundColor: "#5a98d6",
              color: "white",
            },
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: "black",
          }),
        }}
      />
    </div>
  );
};

export default PokemonItemsSelect;
