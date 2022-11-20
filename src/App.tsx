import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NavBar } from "./components";
import { UserProvider } from "./contexts";
import { Home, Login, Register, UserTeam } from "./pages";

import "./App.css";

function App() {
  return (
    <UserProvider>
      <NavBar />
      <ToastContainer autoClose={2500} pauseOnFocusLoss={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<UserTeam />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
