import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserInput from "./components/input/UserInput";
import ContentsAll from "./components/contents/ContentsAll";

function App() {
  return (
    <Routes>
      <Route path="/input" element={<UserInput />} />
      <Route path="/contents" element={<ContentsAll />} />
    </Routes>
  );
}

export default App;
