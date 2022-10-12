import React from "react";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Home, UserTeam } from "./pages";
import { NavBar } from "./components";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer autoClose="2500" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<UserTeam user={{name: "Shalom"}} />} />
      </Routes>
    </>
  );
}

export default App;
