import React from "react";
import { Routes, Route } from "react-router-dom";
import UserInput from "./components/input/UserInput";
import Contents from "./components/contents/Contents";
import { RecoilRoot } from "recoil";
import Main from "./components/main/Main";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/input" element={<UserInput />} />
        <Route path="/contents" element={<Contents />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
