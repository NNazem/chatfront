import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Publish from "./pages/Publish";
import Fetch from "./pages/Fetch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />}></Route>
        <Route path="/publish" element={<Publish />}></Route>
        <Route path="/fetch" element={<Fetch />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
