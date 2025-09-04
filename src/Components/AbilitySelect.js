import { useState } from "react";
import Select from "react-select";

const AbilitySelect = ({ user, defaultAbility, abilities, onChange }) => {
  const [selectedAbility, setSelectedAbility] = useState(
    defaultAbility
      ? { value: defaultAbility.name, label: defaultAbility.name }
      : null,
  );

  const handleChange = (selectedOption) => {
    setSelectedAbility(selectedOption);
    onChange(user, selectedOption);
  };

  // Transform abilities into options with 'value' and 'label' properties
  const options = abilities?.map((ability) => ({
    value: ability.name, // Use name as the value
    label: ability.name, // Display name as the label
  }));

  return (
    <div style={{ width: "100%" }}>
      <Select
        options={options}
        value={selectedAbility}
        onChange={handleChange}
        placeholder="Select Ability..."
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
          singleValue: (provided) => ({
            ...provided,
            color: "black",
          }),
        }}
      />
    </div>
  );
};

export default AbilitySelect;
