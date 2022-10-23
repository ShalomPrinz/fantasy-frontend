import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Team from "./classes/Team";
import User from "./classes/User";
import { NavBar } from "./components";
import { Player } from "./interfaces";
import { Home, UserTeam } from "./pages";

import "./App.css";

const players: Player[] = [
  { id: 0, name: "Ter Stegen", role: "GK", team: "Barcelona" },
  { id: 1, name: "Pique", role: "DEF", team: "Barcelona" },
  { id: 2, name: "Kounde", role: "DEF", team: "Barcelona" },
  { id: 3, name: "Araujo", role: "DEF", team: "Barcelona" },
  { id: 4, name: "Bellingham", role: "MID", team: "Dortmund" },
  { id: 5, name: "Mokuku", role: "ATT", team: "Dortmund" },
];

const team = new Team(players);

function App() {
  const user = new User("Shalom", team);

  return (
    <>
      <NavBar />
      <ToastContainer autoClose={2500} pauseOnFocusLoss={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<UserTeam user={user} />} />
      </Routes>
    </>
  );
}

export default App;
