import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import UserTeam from "./components/UserTeam";

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
