import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../CSS/Header.css";
import { getL, swapLNG } from "../Composables/useLexicon";

const Header = ({ navBarBehaviour, reboot }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [text, setText] = useState({
    home: "Home",
    roster: "Create Roster",
    matchup: "Matchup",
    moves: "Moves",
    social: "Social",
    lng: "en",
  });

  const [dummyState, setDummyState] = useState(false);

  const triggerRerender = () => {
    setDummyState((prev) => !prev); // Toggle state to force re-render
  };

  const isActive = (path) => currentPath === path;

  const isDisabled = (path) => {
    switch (path) {
      case "/selectedMatchup":
        return currentPath !== "/selectedMatchup/selectedMove";
      case "/selectedMatchup/selectedMove":
        return currentPath !== "/selectedMatchup";
    }
  };

  const onLinkClick = (e) => {
    navBarBehaviour[e]();
  };

  const languageSwap = () => {
    setText(swapLNG(text));
    triggerRerender();
    if (reboot) {
      reboot();
    }
  };

  return (
    <nav>
      <ul className="ulh">
        <li className="lih">
          <NavLink to="/" activeClassName="active" className={"nav-button"}>
            {text.home}
          </NavLink>
        </li>
        <li className="lih">
          <NavLink
            to="/createRoster"
            activeClassName="active"
            className={"nav-button"}
          >
            {text.roster}
          </NavLink>
        </li>
        <li className="lih">
          <button
            className={`nav-button ${isDisabled("/selectedMatchup") ? "disabled" : ""} ${isActive("/selectedMatchup") ? "active" : ""}`}
            onClick={() => onLinkClick(0)}
            disabled={isDisabled("/selectedMatchup")}
          >
            {text.matchup}
          </button>
        </li>
        <li className="lih">
          <button
            className={`nav-button ${isDisabled("/selectedMatchup/selectedMove") ? "disabled" : ""} ${isActive("/selectedMatchup/selectedMove") ? "active" : ""}`}
            onClick={() => onLinkClick(1)}
            disabled={isDisabled("/selectedMatchup/selectedMove")}
          >
            {text.moves}
          </button>
        </li>
        <li className="lih">
          <NavLink
            to="/social"
            activeClassName="active"
            className={"nav-button"}
          >
            {text.social}
          </NavLink>
        </li>
        <li className="lih">
          <button className={`nav-button`} onClick={() => languageSwap()}>
            {text.lng}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
