// App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SelectedMatchup from "./Pages/SelectedMatchup";
import CreateRoster from "./Pages/CreateRoster";
import SelectedMove from "./Pages/SelectedMove";
import Social from "./Pages/Social";
import { loadRostersFromUser, setRosters } from "./Composables/useRosters";
import { User } from "./DataStructures/User";
import { useState } from "react";

const App = () => {
  const defaultUser = new User("Ash");
  const [isReady, setIsReady] = useState(false);

  const setupData = async () => {
    try {
      const newRosters = await loadRostersFromUser(defaultUser, true);
      const resolvedRosters = await Promise.all(newRosters);
      setRosters(resolvedRosters);
      console.log("Rosters:", resolvedRosters);
      setIsReady(true);
    } catch (error) {
      console.error("Error loading rosters:", error);
    }
  };

  setupData(); // Call the async function

  if (!isReady) {
    return <div>Loading...</div>; // You can replace this with a spinner or splash screen
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selectedMatchup" element={<SelectedMatchup />} />
        <Route path="/createRoster" element={<CreateRoster />} />
        <Route
          path="/selectedMatchup/selectedMove"
          element={<SelectedMove />}
        />
        <Route path="/social" element={<Social />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
