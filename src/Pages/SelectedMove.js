import React, { useState, useEffect } from "react";
import { Specie } from "../DataStructures/Specie";
import { Pokemon } from "../DataStructures/Pokemon";
import { loadTeams } from "../Composables/useDatabase";
import { Link, useLocation } from "react-router-dom";
import { Move } from "../DataStructures/Move";
import { Roster } from "../DataStructures/Roster";
import { NavigateBackwards } from "../Navigator";
import "../CSS/SelectedMove.css";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/Header";
import { saveARoster, rosterToJSON, rosterFromJSON, globalUserRoster, globalEnemyRoster } from "../Composables/useRosters";
import { globalPokemonToExamine, pokemonFromJSON } from "../Composables/usePokemon";
import { globalMoveToExamine } from "../Composables/useMoves";


const SelectedMove = (props) => {
  const location = useLocation();
  const { state } = location;

  const [slots, setSlots] = useState(12);
  const [movesSelected, setMovesSelected] = useState([]);
  const [emptySlots, setEmptySlots] = useState(0);
  const [availableMoves, setAvailableMoves] = useState([]);
  const [slotsSelected, setSlotsSelected] = useState([]);
  const [filteredMoves, setFilteredMoves] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedMove, setSelectedMove] = useState([]);
  const [data, setData] = useState(null);
  const [navigate, setNavigate] = useState(false);
  const [path, setPath] = useState("");
  const [userRoster, setUserRoster] = useState(null);
  const [enemyRoster, setEnemyRoster] = useState(null);

  useEffect(() => {

    const initialSelectedMove = globalMoveToExamine;
    const initialSelectedPokemon = globalPokemonToExamine;
    console.log("pokemon: ", initialSelectedPokemon);
    const initialUserRoster = globalUserRoster;
    const initialEnemyRoster =globalEnemyRoster;
    const initialMovesSelected = initialSelectedPokemon
      ? initialSelectedPokemon.moves
      : null;
    const initialAvailableMoves = initialSelectedPokemon
      ? initialSelectedPokemon.specie.moves
      : null;

    

    setAvailableMoves(initialAvailableMoves);
    setFilteredMoves(initialAvailableMoves);
    setSelectedMove(initialSelectedMove);
    setSelectedPokemon(initialSelectedPokemon);
    setUserRoster(initialUserRoster);
    setEnemyRoster(initialEnemyRoster);
    setMovesSelected(initialMovesSelected);
  }, []);

  const selectSlot = (move) => {
    if (
      movesSelected.some((m) => {
        return m.name === move.name;
      })
    ) {
      toast.warn("Move Already Selected", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
        toastId: "customId",
      });
      return;
    }
    toast.dismiss();
    let indexToReplace = movesSelected.findIndex((m) => {
      return m.name === selectedMove.name;
    });
    let tempMoves = movesSelected;
    tempMoves[indexToReplace] = move;
    setMovesSelected(tempMoves);
    setSelectedMove(move);
  };

  const handleSearchInputChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    const filteredMoves = availableMoves.filter(
      (move) =>
        move.name.toLowerCase().includes(searchInput) ||
        move.type.toLowerCase().includes(searchInput) ||
        move.accuracy.toString().includes(searchInput) ||
        move.power.toString().includes(searchInput),
    );
    setSearchInput(searchInput);
    setFilteredMoves(filteredMoves);
  };

  const MoveItem = ({ move }) => {
    return (
      <div>
        {move && (
          <div
            className={
              selectedMove.name === move.name
                ? "SelectedMove square-item"
                : "square-item"
            }
            style={{ border: `2px solid ${getColorForType(move.type)}` }}
            onClick={() => handleMoveSelect(move)}
          >
            {move.name}
            <br />
            {`${move.power}/${move.accuracy}%/${move.pp}pp`}
            <br />
            {`${move.type}/${move.category}`}
          </div>
        )}
      </div>
    );
  };

  const getColorForType = (type) => {
    switch (type) {
      case "Normal":
        return "gray";
      case "Fire":
        return "orange";
      case "Water":
        return "blue";
      case "Electric":
        return "yellow";
      case "Grass":
        return "green";
      case "Ice":
        return "lightblue";
      case "Fighting":
        return "red";
      case "Poison":
        return "purple";
      case "Ground":
        return "brown";
      case "Flying":
        return "skyblue";
      case "Psychic":
        return "pink";
      case "Bug":
        return "lime";
      case "Rock":
        return "sienna";
      case "Ghost":
        return "violet";
      case "Dragon":
        return "indigo";
      case "Dark":
        return "darkslategray";
      case "Steel":
        return "lightsteelblue";
      case "Fairy":
        return "orchid";
      default:
        return "black";
    }
  };

  const handleSave = () => {
    console.log("saving the roster: " + userRoster);
    const data = {
      userRoster: rosterToJSON(userRoster),
      enemyRoster: rosterToJSON(enemyRoster),
    };
    saveARoster(userRoster);
    saveARoster(enemyRoster);
    setData(data);
    setPath("/selectedMatchup");
    setNavigate(true);
  };

  const handleMoveSelect = (move) => {
    setSelectedMove(move);
    console.log(move, selectedMove);
  };

  return (
    <>
      <Header></Header>
      {selectedPokemon && (
        <div
          style={{
            backgroundColor: "#302B2B",
            textAlign: "center",
            minHeight: "100vh",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
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
              <h2 className="text">Choose Moves</h2>
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search for a move..."
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
                {filteredMoves.map((move, index) => (
                  <li
                    className="i li"
                    key={index}
                    onClick={() => selectSlot(move)}
                    style={{ margin: "20px 10px", cursor: "pointer" }}
                  >
                    {move.name}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginLeft: "80px", minWidth: "25vw" }}>
              <h2 className="text">{selectedPokemon.specie.name}</h2>
              <div className="square-container">
                {movesSelected.map((move, index) => (
                  <MoveItem key={index} move={move} />
                ))}
              </div>
            </div>
          </div>

          <h2 onClick={handleSave} className={"link"}>
            save
          </h2>
        </div>
      )}
      {navigate && <NavigateBackwards data={data} path={path} />}
      <ToastContainer />
    </>
  );
};

export default SelectedMove;
