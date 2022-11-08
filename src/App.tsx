import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NavBar } from "./components";
import { Home, Login, Register, UserTeam } from "./pages";
import { Player, Team, User } from "./types";

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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
