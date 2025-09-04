import { useState } from "react";
import Select from "react-select";
import { ITEMS } from "../DataStructures/Item";


const PokemonItemsSelect = ({ onChange }) => {
  const [selectedItem, setSelectedItem] = useState(null);

const handleChange = (selectedOption) => {
  setSelectedItem(selectedOption);
  onChange(selectedOption); // ← this sends the selected item to the parent
};

  return (
    <div style={{ width: "100%" }}>
      <Select
        options={ITEMS}
        value={selectedItem}
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
