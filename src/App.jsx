import React from "react";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NavBar } from "./components";
import { Home, UserTeam } from "./pages";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer 
        autoClose="2500" 
        pauseOnFocusLoss="false"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<UserTeam user={{name: "Shalom"}} />} />
      </Routes>
    </>
  );
}

export default App;
