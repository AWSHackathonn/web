import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserInput from "./components/input/UserInput";
import Contents from "./components/contents/Contents";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/input" element={<UserInput />} />
        <Route path="/contents" element={<Contents />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
