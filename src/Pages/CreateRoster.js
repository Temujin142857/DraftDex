import React from "react";
import { generateRosterID, loadTeams } from "../Composables/useDatabase.js";
import { Link } from "react-router-dom";
import "../CSS/CreateRoster.css";
import { Specie } from "../DataStructures/Specie";
import Header from "../Components/Header";
import { loadAllSpecies } from "../Composables/useDatabase.js";
import { saveARoster, saveGlobalTemporaryRoster } from "../Composables/useRosters";
import { Roster } from "../DataStructures/Roster";
import {
  createRoster,
  setGlobalTemporaryRoster,
  globalTemporaryRoster,
  rosterToJSON
} from "../Composables/useRosters";
import { NavigateForwards } from "../Navigator.js";

class CreateRoster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: 12,
      speciesSelected: [],
      emptySlots: 0,
      species: [],
      slotsSelected: [],
      name: "Roster Name",
      filteredSpecies: ["temp"],
      searchInput: "",
      roster: new Roster("name"),
      shouldNavigate: false,
    };
  }

  async componentDidMount() {
    loadTeams();
    const speciesL = await loadAllSpecies();
    this.setState({ filteredSpecies: speciesL });
    this.setState({ species: speciesL });
  }

  selectSlot = async (specie) => {
    const roster = this.state.roster;
    const newRoster = await createRoster(
      roster.name,
      [...roster.species, specie],
      roster.teams,
      roster.rosterID,
      true,
    );
    this.setState((prevState) => ({
      speciesSelected: newRoster.species,
      roster: newRoster,
    }));
    setGlobalTemporaryRoster(newRoster);
  };

  handleSearchInputChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    const filteredSpecies = this.state.species.filter((specie) =>
      specie.toLowerCase().includes(searchInput),
    );
    this.setState({ searchInput, filteredSpecies });
  };

  saveRoster = async () => {
    await saveGlobalTemporaryRoster();
  };

  handleInput = async (e) => {
    console.log("name:", e.target.textContent);

    const roster = this.state.roster;

    const newRoster = await createRoster(
      e.target.textContent,
      roster.species,
      roster.teams,
      roster.rosterID,
      true,
    );

    this.setState({ roster: newRoster });
    setGlobalTemporaryRoster(newRoster);
  };

  handleClick = async () => {
    await this.saveRoster();
    this.setState({ shouldNavigate: true});
  };

  render() {
    const {
      emptySlots,
      speciesSelected,
      species,
      slotSelected,
      searchInput,
      filteredSpecies,
      roster,shouldNavigate,
    } = this.state;

    if (shouldNavigate) {
      return (
        <NavigateForwards
          path="/"
        />
      );
    }

    return (
      <div
        style={{
          backgroundColor: "#302B2B",
          textAlign: "center",
          minHeight: "100vh",
          paddingBottom: "20px",
        }}
      >
        <Header></Header>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              padding: "3px",
              border: "2px solid white",
              borderRadius: "10px",
              backgroundColor: "#302B2B",
              textAlign: "center",
              maxHeight: "90vh",
              minWidth: "25vw",
            }}
          >
            <h2 className={"text"}>Choose Pokemon</h2>
            <input
              type="text"
              value={searchInput}
              onChange={this.handleSearchInputChange}
              placeholder="Search for a Pokemon..."
              style={{
                marginBottom: "20px",
                padding: "8px",
                width: "100%",
                boxSizing: "border-box",
              }}
            />

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                marginTop: "5px",
                overflow: "auto",
                maxHeight: "70vh",
              }}
            >
              {filteredSpecies.map((specie, index) => (
                <li
                  className={"i" + " li"}
                  key={index}
                  onClick={() => this.selectSlot(specie)}
                  style={{ margin: "20px 10px", cursor: "pointer" }}
                >
                  {specie}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginLeft: "80px", minWidth: "25vw" }}>
            <h2
              contentEditable={true}
              className="text"
              onInput={this.handleInput}
              suppressContentEditableWarning={true}
            >
              {" "}
              {"Roster Name"}{" "}
            </h2>
            <ul
              style={{
                margin: "50px 0",
                display: "grid",
                gridTemplateColumns: "auto auto",
                gap: "20px",
              }}
            >
              {speciesSelected &&
                speciesSelected.map((specie, index) => (
                  <li key={index} className={"li"} style={{ margin: "20px 0" }}>
                    {specie}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div
        onClick={this.handleClick}
        className="link"
        style={{
          display: "block",
          marginTop: "20px",
          color: "white",
          textDecoration: "none",
          fontSize: "24px",
          cursor: "pointer"
        }}
      >
        Save
      </div>
      </div>
    );
  }
}

export default CreateRoster;
