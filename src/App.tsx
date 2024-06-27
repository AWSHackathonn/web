import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserInput from "./components/input/UserInput";
import ContentsAll from "./components/contents/ContentsAll";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
    <Routes>
      <Route path="/input" element={<UserInput />} />
      <Route path="/contents" element={<ContentsAll />} />
    </Routes>
    </RecoilRoot>
  );
}

export default App;
