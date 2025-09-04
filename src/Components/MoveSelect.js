import { useState, useEffect } from "react";
import "../CSS/MoveSelect.css";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveARoster, rosterToJSON, rosterFromJSON, globalUserRoster, globalEnemyRoster } from "../Composables/useRosters";
import { globalPokemonToExamine, pokemonFromJSON } from "../Composables/usePokemon";
import { globalMoveToExamine } from "../Composables/useMoves";


const SelectedMove = ({ onClose, onMoveSelect }) => {
  const [movesSelected, setMovesSelected] = useState([]);
  const [availableMoves, setAvailableMoves] = useState([]);
  const [filteredMoves, setFilteredMoves] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedMove, setSelectedMove] = useState();
  const [userRoster, setUserRoster] = useState(null);
  const [sortOrder, setSortOrder] = useState(null); // "power-asc", "power-desc", etc.

  useEffect(() => {

    const initialSelectedMove = globalMoveToExamine;
    const initialSelectedPokemon = globalPokemonToExamine;
    console.log("pokemon: ", initialSelectedPokemon);
    const initialUserRoster = globalUserRoster;
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
    saveARoster(JSON.parse(JSON.stringify(userRoster)));
    onMoveSelect(move);
  };

  const handleSearchInputChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    const filteredMoves = availableMoves.filter(
      (move) =>
        move.name.toLowerCase().includes(searchInput) ||
        move.type.toLowerCase().includes(searchInput) ||
        move.accuracy.toString().includes(searchInput) ||
        move.power.toString().includes(searchInput)
    );
    setSearchInput(searchInput);
    setFilteredMoves(filteredMoves);
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
  

  return (
    <>
      {selectedPokemon && (
      <div
        className="modal-backdrop"
        onClick={() => onClose()} // close on backdrop click
      >
        <div
          className="modal-container"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <button className="modal-close" onClick={() => onClose()}>✕</button>

          <h2 className="text">Choose Moves</h2>

          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search for a move..."
            className="search-box"
          />

          <ul className="move-list">
            {filteredMoves.map((move, idx) => (
              <li
                key={idx}
                className={`move-item ${selectedMove?.name === move.name ? "active" : ""}`}
                onClick={() => selectSlot(move)}
                style={{
                  backgroundColor: getColorForType(move.type),
                  color: "white",
                  border: selectedMove?.name === move.name ? "2px solid gold" : "none",
                  maxWidth: "33vw", 
                }}
              >
                <strong>{move.name}</strong>
                <div>Power: {move.power || "—"}</div>
                <div style={{ fontStyle: "italic", fontSize: "0.9em" }}>
                  {move.secondaryEffects || "No secondary effect"}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
      <ToastContainer />
    </>
  );
};

export default SelectedMove;
