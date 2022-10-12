import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home, UserTeam } from "./pages";
import { NavBar } from "./components";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<UserTeam user={{name: "Shalom"}} />} />
      </Routes>
    </>
  );
}

export default App;
