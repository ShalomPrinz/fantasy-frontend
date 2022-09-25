import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import "./App.css";``

function App() {
  return (
    <main className="container">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
