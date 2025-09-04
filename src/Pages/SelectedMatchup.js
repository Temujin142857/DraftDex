import { useState, useEffect } from "react";
import Card from "../Components/Card";
import { useLocation } from "react-router-dom";
import "../CSS/SelectedMatchup.css";
import NatureSelect from "../Components/NatureSelect";
import ItemSelect from "../Components/ItemSelect";
import { NavigateForwards, NavigateBackwards } from "../Navigator";
import AbilitySelect from "../Components/AbilitySelect";
import { calculateDamage } from "../Composables/useDamage";
import Header from "../Components/Header";
import {
  loadARoster,
  globalEnemyRoster,
  setGlobalEnemyRoster,
  setGlobalUserRoster,
  globalUserRoster,
  rosterToJSON,
  addDefaultTeam,
  saveARoster
} from "../Composables/useRosters";
import { Ability } from "../DataStructures/Ability";
import { setIv, setEv, setNature, pokemonToJSON, pokemonFromJSON, defaultPokemon, createPokemon, jsonFromPartialObject, setGlobalPokemonToExamine, setStatChange } from "../Composables/usePokemon.js";
import { replacePokemon } from "../Composables/useTeams.js";
import { setGlobalMoveToExamine } from "../Composables/useMoves.js";
import MoveSelect from "../Components/MoveSelect.js"
import StatChangeDropdown from "../Components/StatChangeDropdown.js";

const SelectedMatchup = () => {
  const location = useLocation();
  const { state } = location;

  const [navigate, setNavigate] = useState(false);  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenMove, setChosenMove] = useState(null);
  const [data, setData] = useState(null);
  const [path, setPath] = useState("");
  const [selectedUserPokemon, setSelectedUserPokemon] = useState(defaultPokemon);
  const [selectedEnemyPokemon, setSelectedEnemyPokemon] = useState(defaultPokemon);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchRosters = async () => {
      console.log("shallow rosters: ", globalUserRoster)
      try {
        if (globalUserRoster.isShallow) {
          setGlobalUserRoster(
            await loadARoster(globalUserRoster.rosterID, false),
          );
        }
        if (globalEnemyRoster.isShallow) {
          setGlobalEnemyRoster(
            await loadARoster(globalEnemyRoster.rosterID, false),
          );
        }
        console.log("initial rosters:", globalUserRoster, globalEnemyRoster);

        if (
          !(globalUserRoster.teams.length > 0) ||
          !(globalUserRoster.teams[0].pokemons?.length > 0)
        ) {
          addDefaultTeam(globalUserRoster);
        }         
        if (
          !(globalEnemyRoster.teams.length > 0) ||
          !(globalEnemyRoster.teams[0].pokemons?.length > 0)
        ) {
          console.log("hi2e")
          addDefaultTeam(globalEnemyRoster);
        }
        console.log("setting selectedPokemon", globalUserRoster.teams[0].pokemons[0], globalEnemyRoster.teams[0].pokemons[0]);
        setSelectedUserPokemon(globalUserRoster.teams[0].pokemons[0]);
        setSelectedEnemyPokemon(globalEnemyRoster.teams[0].pokemons[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading rosters:", error);
        setIsLoading(false);
      }
    };

    fetchRosters();
  }, []);


  const handleNatureChange = (user, selectedOption) => {
      // Assuming selectedUserPokemon and selectedEnemyPokemon are objects with a method to update nature
      if (user && selectedUserPokemon) {
        const prevPokemon=JSON.parse(JSON.stringify(selectedUserPokemon));
        setNature(selectedUserPokemon, selectedOption.value);
        setSelectedUserPokemon(selectedUserPokemon);
        replacePokemon(globalUserRoster.teams[0],prevPokemon, selectedUserPokemon);
      } else if (!user && selectedEnemyPokemon) {
        const prevPokemon=JSON.parse(JSON.stringify(selectedEnemyPokemon));
        setNature(selectedEnemyPokemon, selectedOption.value);
        setSelectedEnemyPokemon(selectedEnemyPokemon);
        replacePokemon(globalEnemyRoster.teams[0],prevPokemon, selectedEnemyPokemon);
      }
    };


    const handleItemChange = (selectedItem, user) => {
      if(user){
        const prevPokemon=JSON.parse(JSON.stringify(selectedUserPokemon));
        selectedUserPokemon.item=selectedItem;
        replacePokemon(globalUserRoster.teams[0],prevPokemon, selectedUserPokemon);
      } else {
        const prevPokemon=JSON.parse(JSON.stringify(selectedEnemyPokemon));
        selectedEnemyPokemon.item=selectedItem;
        replacePokemon(globalEnemyRoster.teams[0],prevPokemon, selectedEnemyPokemon);
      }
    };

  const handleIVChange = (user, index, iv, event) => {
    if (user) {
      const newIVs = [...selectedUserPokemon.ivs];
      newIVs[index] = parseInt(event.target.value, 10);
      const prevPokemon=JSON.parse(JSON.stringify(selectedUserPokemon));
      setIv(selectedUserPokemon, newIVs[index], index);
      setSelectedUserPokemon((prevState) => ({ ...prevState, ivs: newIVs }));
      replacePokemon(globalUserRoster.teams[0],prevPokemon, selectedUserPokemon);
    } else {
      const newIVs = [...selectedEnemyPokemon.ivs];
      newIVs[index] = parseInt(event.target.value, 10);
      const prevPokemon=JSON.parse(JSON.stringify(selectedEnemyPokemon));
      setIv(selectedEnemyPokemon, newIVs[index], index);
      setSelectedEnemyPokemon((prevState) => ({ ...prevState, ivs: newIVs }));
      replacePokemon(globalEnemyRoster.teams[0],prevPokemon, selectedEnemyPokemon);
    }
  };

    const handleStatChangeChange = (user, index, statChange, event) => {
    if (user) {
      const newStatChanges = [...selectedUserPokemon.statChanges];
      newStatChanges[index] = parseInt(event.target.value, 10);
      const prevPokemon=JSON.parse(JSON.stringify(selectedUserPokemon));
      setStatChange(selectedUserPokemon, newStatChanges[index], index);
      setSelectedUserPokemon((prevState) => ({ ...prevState, statChanges: newStatChanges }));
      replacePokemon(globalUserRoster.teams[0],prevPokemon, selectedUserPokemon);
    } else {
      const newStatChanges = [...selectedEnemyPokemon.statChanges];
      newStatChanges[index] = parseInt(event.target.value, 10);
      const prevPokemon=JSON.parse(JSON.stringify(selectedEnemyPokemon));
      setIv(selectedEnemyPokemon, newStatChanges[index], index);
      setSelectedEnemyPokemon((prevState) => ({ ...prevState, statChanges: newStatChanges }));
      replacePokemon(globalEnemyRoster.teams[0],prevPokemon, selectedEnemyPokemon);
    }
  };

  const handleEVChange = (user, index, ev, event) => {
    console.log("initial roster before change", globalUserRoster)
    if (user) {
      console.log("event", event.target.value, "index:", index)
      const newEVs = [...selectedUserPokemon.evs];
      newEVs[index] = parseInt(event.target.value, 10);
      const prevPokemon=JSON.parse(JSON.stringify(selectedUserPokemon));
      console.log("newEvs:", newEVs)
      setEv(selectedUserPokemon, newEVs[index], index);
      setSelectedUserPokemon((prevState) => ({ ...prevState, evs: newEVs }));
      replacePokemon(globalUserRoster.teams[0],prevPokemon, selectedUserPokemon);
      console.log("after roster", globalUserRoster)
    } else {
      const newEVs = [...selectedEnemyPokemon.evs];
      newEVs[index] = parseInt(event.target.value, 10);
      const prevPokemon=JSON.parse(JSON.stringify(selectedEnemyPokemon));
      setEv(selectedEnemyPokemon, newEVs[index], index);
      setSelectedEnemyPokemon((prevState) => ({ ...prevState, evs: newEVs }));
      replacePokemon(globalEnemyRoster.teams[0],prevPokemon, selectedEnemyPokemon);
    }

  };

  const selectMove = (user, move) => {
    console.log("user",user)
    setGlobalPokemonToExamine(user);
    setGlobalMoveToExamine(move);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleMoveChosen = (move) => {
    setChosenMove(move);   // do something with the move
    setIsModalOpen(false); // close modal
  };

  const selectSpecie = (user, specie) => {
    const pokemonToAdd = createPokemon(specie);
    if (user) {
      const alreadyExists = globalUserRoster.teams[0].pokemons.some(
        (pokemon) => pokemon.specie.name === pokemonToAdd.specie.name,
      );
      if (!alreadyExists) {
        replacePokemon(globalUserRoster.teams[0],selectedUserPokemon, pokemonToAdd);
        setSelectedUserPokemon(pokemonToAdd);
      }
    } else {
      const alreadyExists = globalEnemyRoster.teams[0].pokemons.some(
        (pokemon) => pokemon.specie.name === pokemonToAdd.specie.name,
      );
      if (!alreadyExists) {
        replacePokemon(globalEnemyRoster.teams[0],selectedEnemyPokemon, pokemonToAdd);
        setSelectedEnemyPokemon(pokemonToAdd);
      }
    }
  };

  const dmgCalc = (move, min, user) => {
    if(!move){console.log("no move, damageCalc"); return 1;}
    let dmg = user
      ? calculateDamage(selectedUserPokemon, move, selectedEnemyPokemon)
      : calculateDamage(selectedEnemyPokemon, move, selectedUserPokemon);
    let percentDmg = user
      ? {
          max:
            Math.round((dmg.max / selectedEnemyPokemon.stats[0]) * 1000) / 10,
          min:
            Math.round((dmg.min / selectedEnemyPokemon.stats[0]) * 1000) / 10,
        }
      : {
          max: Math.round((dmg.max / selectedUserPokemon.stats[0]) * 1000) / 10,
          min: Math.round((dmg.min / selectedUserPokemon.stats[0]) * 1000) / 10,
        };
    return min ? percentDmg.min : percentDmg.max;
  };

  const MoveItem = ({ move, style, onClick, user }) => {
    return (
      <div>
        <div onClick={onClick} style={{ cursor: "pointer" }}>
          {move && (
            <div
              className="square-item"
              style={{ border: `2px solid ${getColorForType(move.type)}` }}
            >
              {move.name}
              <br />
              {`${move.power}/${move.accuracy}%/${move.pp}pp`}
              <br />
              {`${move.type}/${move.category}`}
            </div>
          )}
        </div>
        <div>
          {dmgCalc(move, true, user) + " - " + dmgCalc(move, false, user) + "%"}
        </div>
      </div>
    );
  };

  const getColorForType = (type) => {
    switch (type.toLowerCase()) {
      case "normal":
        return "gray";
      case "fire":
        return "orange";
      case "water":
        return "blue";
      case "electric":
        return "yellow";
      case "grass":
        return "green";
      case "ice":
        return "cyan";
      case "fighting":
        return "darkRed";
      case "poison":
        return "purple";
      case "ground":
        return "chocolate";
      case "flying":
        return "skyblue";
      case "psychic":
        return "pink";
      case "bug":
        return "oliveDrab";
      case "rock":
        return "darkGoldenRod";
      case "ghost":
        return "violet";
      case "dragon":
        return "indigo";
      case "dark":
        return "darkslategray";
      case "steel":
        return "slateGray";
      case "fairy":
        return "orchid";
      default:
        return "black";
    }
  };

  const handleSave = () => {
      console.log("saving the roster: ", globalUserRoster);
      saveARoster(JSON.parse(JSON.stringify(globalUserRoster)));
    };

  const navBarBehaviourM = [
    () => {
      selectMove(true, selectedUserPokemon.moves[0]);
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }


  

  return (
    <div>
      <Header navBarBehaviour={navBarBehaviourM}></Header>
      {globalUserRoster && globalUserRoster.species && (
        <div
          style={{
            backgroundColor: "#302B2B",
            textAlign: "center",
            minHeight: "120vh",
            minWidth: "100vw",
          }}
        >
          <div style={{ textAlign: "center", margin: "0" }}>
            <div
              style={{
                backgroundColor: "#b9cff5",
                margin: "0",
                paddingBottom: "5px",
                paddingTop: "10px",
              }}
            >
              <ul
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "0",
                }}
              >
                {globalUserRoster &&
                  globalUserRoster.species?.map((specie, index) => (
                    <li
                      key={index}
                      className={"liii nameList"}
                      style={{ color: "black" }}
                      onClick={() => {
                        selectSpecie(true, specie);
                      }}
                    >
                      {specie.name}
                    </li>
                  ))}
              </ul>
            </div>
                  {isModalOpen && (
        <MoveSelect
          onClose={handleCloseModal}
          onMoveSelect={handleMoveChosen}
        />
      )}
            <div className={"container"}>
              <div className={"horizontal-line"}></div>
            </div>

            <div style={{ textAlign: "center", marginTop: "0" }}>
              <ul style={{ display: "flex", justifyContent: "center" }}>
                {globalUserRoster &&
                  globalUserRoster.teams[0].pokemons.map((pokemon, index) => (
                    <li
                      key={index}
                      className={
                        selectedUserPokemon.specie.name === pokemon.specie.name
                          ? "liii nameList selectedPokemon"
                          : "liii nameList"
                      }
                      onClick={() => {
                        setSelectedUserPokemon(pokemon);
                      }}
                    >
                      {pokemon.specie.name}
                    </li>
                  ))}
              </ul>
            </div>

            <div
              style={{ display: "flex", justifyContent: "center", margin: 0 }}
            >
              <Card style={{ backgroundColor: "#b9cff5" }}>
                <h1
                  style={{ marginBottom: "0", marginTop: "15px", padding: "0" }}
                >
                  {selectedUserPokemon.specie.name}
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <div style={{ marginLeft: "10px" }}>
                    <h4>Select Ability</h4>
                    <AbilitySelect
                      user={true}
                      defaultAbility={
                        selectedUserPokemon.specie.abilities?.[0] ||
                        new Ability("default", "Something went wrong loading")
                      }
                      abilities={selectedUserPokemon.specie.abilities}
                      onChange={handleNatureChange}
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <h4>Select Nature</h4>
                    <NatureSelect
                      user={true}
                      defaultNature={{
                        label: selectedUserPokemon
                          ? selectedUserPokemon.nature
                          : "",
                        value: selectedUserPokemon
                          ? selectedUserPokemon.nature.toLowerCase()
                          : "",
                      }}
                      onChange={handleNatureChange}
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <h4>Select Item</h4>
                    <ItemSelect onChange={(selected) => handleItemChange(selected, true)} />
                  </div>
                </div>

                <div
                  style={{
                    marginBottom: "0",
                    paddingBottom: "0",
                    display: "flex",
                  }}
                >
                  <div>
                    <h2>_</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      <li className={"hli"}>Hp</li>
                      <li className={"hli"}>Atk</li>
                      <li className={"hli"}>Def</li>
                      <li className={"hli"}>SpA</li>
                      <li className={"hli"}>SpD</li>
                      <li className={"hli"}>Spe</li>
                    </ul>
                  </div>
                  <div>
                    <h2>IVs</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {selectedUserPokemon &&
                        selectedUserPokemon.ivs?.map((iv, index) => (
                          <li key={index} className="liii">
                            <input
                              style={{ width: "30px", marginLeft: "10px" }}
                              type="number"
                              value={iv}
                              max="31"
                              size="2"
                              maxLength="2"
                              onChange={(event) =>
                                handleIVChange(true, index, iv, event)
                              }
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h2>EVs</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {selectedUserPokemon &&
                        selectedUserPokemon.evs?.map((ev, index) => (
                          <li key={index} className="liii">
                            <input
                              style={{ width: "35px", marginLeft: "10px" }}
                              type="number"
                              value={ev}
                              step="4"
                              max="252"
                              size="3"
                              maxLength="3"
                              onChange={(event) =>
                                handleEVChange(true, index, ev, event)
                              }
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h2>Stats</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {selectedUserPokemon &&
                        selectedUserPokemon.stats?.map((stat, index) => (
                          <li
                            key={index}
                            style={{ marginLeft: "10px", marginBottom: "13px" }}
                          >
                            {stat}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="square-container">
                    <MoveItem
                      move={selectedUserPokemon.moves[0]}
                      onClick={() => {
                        selectMove(selectedUserPokemon, selectedUserPokemon.moves[0]);
                      }}
                      user={true}
                    />
                    <MoveItem
                      move={selectedUserPokemon.moves[1]}
                      onClick={() => {
                        selectMove(selectedUserPokemon, selectedUserPokemon.moves[1]);
                      }}
                      user={true}
                    />
                    <MoveItem
                      move={selectedUserPokemon.moves[2]}
                      onClick={() => {
                        selectMove(selectedUserPokemon, selectedUserPokemon.moves[2]);
                      }}
                      user={true}
                    />
                    <MoveItem
                      move={selectedUserPokemon.moves[3]}
                      onClick={() => {
                        selectMove(selectedUserPokemon, selectedUserPokemon.moves[3]);
                      }}
                      user={true}
                    />
                  </div>
                </div>
              </Card>

              <Card style={{ backgroundColor: "#f5b9b9" }}>
                <h1
                  style={{ marginBottom: "0", marginTop: "15px", padding: "0" }}
                >
                  {selectedEnemyPokemon.specie.name}
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <div style={{ marginLeft: "10px" }}>
                    <h4>Select Ability</h4>
                    <AbilitySelect
                      user={false}
                      defaultAbility={
                        selectedEnemyPokemon.specie.abilities[0] ||
                        new Ability("default", "Something went wrong loading")
                      }
                      abilities={selectedEnemyPokemon.specie.abilities}
                      onChange={handleNatureChange}
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <h4>Select Nature</h4>
                    <NatureSelect
                      user={false}
                      defaultNature={{
                        label: selectedEnemyPokemon
                          ? selectedEnemyPokemon.nature
                          : "",
                        value: selectedEnemyPokemon
                          ? selectedEnemyPokemon.nature.toLowerCase()
                          : "",
                      }}
                      onChange={handleNatureChange}
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <h4>Select Item</h4>
                    <ItemSelect onChange={(selected) => handleItemChange(selected, false)} />
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div>
                    <h2>_</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      <li className={"hli"}>Hp</li>
                      <li className={"hli"}>Atk</li>
                      <li className={"hli"}>Def</li>
                      <li className={"hli"}>SpA</li>
                      <li className={"hli"}>SpD</li>
                      <li className={"hli"}>Spe</li>
                    </ul>
                  </div>
                  <div>
                    <h2>IVs</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {selectedEnemyPokemon &&
                        selectedEnemyPokemon.ivs?.map((iv, index) => (
                          <li key={index} className="liii">
                            <input
                              style={{ width: "30px", marginLeft: "10px" }}
                              type="number"
                              value={iv}
                              size="2"
                              max="31"
                              maxLength="2"
                              onChange={(event) =>
                                handleIVChange(false, index, iv, event)
                              }
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h2>EVs</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {selectedEnemyPokemon &&
                        selectedEnemyPokemon.evs?.map((ev, index) => (
                          <li key={index} className="liii">
                            <input
                              style={{ width: "35px", marginLeft: "10px" }}
                              type="number"
                              value={ev}
                              step="4"
                              max="252"
                              onChange={(event) =>
                                handleEVChange(false, index, ev, event)
                              }
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h2>Stats</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {selectedEnemyPokemon &&
                        selectedEnemyPokemon.stats?.map((stat, index) => (
                          <li
                            key={index}
                            style={{ marginLeft: "10px", marginBottom: "13px" }}
                          >
                            {stat}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h2>+/-</h2>
                    <ul style={{ listStyleType: "none", padding: 0, marginTop: "5px" }}>
                      {selectedEnemyPokemon &&
                        selectedEnemyPokemon.statChanges?.map((statChange, index) => (
                          <li
                            key={index}
                            style={{ marginLeft: "10px", marginBottom: "15px", marginTop: "2px" }}
                          >
                            <StatChangeDropdown/>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="square-container">
                    <MoveItem
                      move={selectedEnemyPokemon.moves[0]}
                      onClick={() => {
                        selectMove(selectedEnemyPokemon, selectedEnemyPokemon.moves[0]);
                      }}
                      user={false}
                    />
                    <MoveItem
                      move={selectedEnemyPokemon.moves[1]}
                      onClick={() => {
                        selectMove(selectedEnemyPokemon, selectedEnemyPokemon.moves[1]);
                      }}
                      user={false}
                    />
                    <MoveItem
                      move={selectedEnemyPokemon.moves[2]}
                      onClick={() => {
                        selectMove(selectedEnemyPokemon, selectedEnemyPokemon.moves[2]);
                      }}
                      user={false}
                    />
                    <MoveItem
                      move={selectedEnemyPokemon.moves[3]}
                      onClick={() => {
                        selectMove(selectedEnemyPokemon, selectedEnemyPokemon.moves[3]);
                      }}
                      user={false}
                    />
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <ul style={{ display: "flex", justifyContent: "center", marginTop: 10, marginBottom: 0, padding: 0 }}>
                {globalEnemyRoster &&
                  globalEnemyRoster.teams[0].pokemons.map((pokemon, index) => (
                    <li
                      key={index}
                      className={
                        selectedEnemyPokemon.specie.name === pokemon.specie.name
                          ? "liii nameList selectedPokemon"
                          : "nameList liii"
                      }
                      onClick={() => {
                        setSelectedEnemyPokemon(pokemon);
                      }}
                    >
                      {pokemon.specie.name}
                    </li>
                  ))}
              </ul>
              <button onClick={()=>handleSave()} style={{width: 75}}>save</button>
            </div>
            <div className={"container"}>
              <div className={"horizontal-line"}></div>
            </div>
            <div
              style={{
                backgroundColor: "#f5b9b9",
                paddingTop: "10px",
                paddingBottom: "5px",
              }}
            >
              <ul
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "0",
                }}
              >
                {globalEnemyRoster &&
                  globalEnemyRoster.species?.map((specie, index) => (
                    <li
                      key={index}
                      className={"liii nameList"}
                      style={{ color: "black" }}
                      onClick={() => {
                        selectSpecie(false, specie);
                      }}
                    >
                      {specie.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {navigate && <NavigateBackwards data={data} path={path} />}
    </div>
  );
};

export default SelectedMatchup;
