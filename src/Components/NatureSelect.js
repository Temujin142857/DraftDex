// NatureSelect.js
import React, { useState } from "react";
import Select from "react-select";

// Define the list of natures
const natureOptions = [
  { value: "adamant", label: "Adamant" },
  { value: "bashful", label: "Bashful" },
  { value: "bold", label: "Bold" },
  { value: "brave", label: "Brave" },
  { value: "calm", label: "Calm" },
  { value: "careful", label: "Careful" },
  { value: "docile", label: "Docile" },
  { value: "gentle", label: "Gentle" },
  { value: "hardy", label: "Hardy" },
  { value: "hasty", label: "Hasty" },
  { value: "impish", label: "Impish" },
  { value: "jolly", label: "Jolly" },
  { value: "lax", label: "Lax" },
  { value: "lonely", label: "Lonely" },
  { value: "mild", label: "Mild" },
  { value: "modest", label: "Modest" },
  { value: "naive", label: "Naive" },
  { value: "naughty", label: "Naughty" },
  { value: "quiet", label: "Quiet" },
  { value: "quirky", label: "Quirky" },
  { value: "rash", label: "Rash" },
  { value: "relaxed", label: "Relaxed" },
  { value: "sassy", label: "Sassy" },
  { value: "serious", label: "Serious" },
  { value: "timid", label: "Timid" },
];

const NatureSelect = ({ user, defaultNature, onChange }) => {
  const [selectedNature, setSelectedNature] = useState(defaultNature);

  const handleChange = (selectedOption) => {
    setSelectedNature(selectedOption);
    onChange(user, selectedOption);
  };

  return (
    <div style={{ width: "100%" }}>
      <Select
        options={natureOptions}
        value={selectedNature}
        onChange={handleChange}
        placeholder="Select Nature..."
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

export default NatureSelect;
