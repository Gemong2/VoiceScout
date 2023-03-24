import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import HeaderFooterPage from "./pages/HeaderFooterePage";
import HeaderPage from "./pages/HeaderPage";
import Main from "pages/Main";
import CrimeType from "pages/CrimeType";
import Simulation from "pages/Simulation";
import Quiz from "pages/Quiz";

function App() {
  return (
    <>
      <Routes>
        <Route element={<HeaderFooterPage />}>
          <Route path="/" element={<Main />} />
          <Route path="/crime-type/*" element={<CrimeType />} />
          <Route path="/simulation" element={<Simulation />} />
        </Route>
        <Route element={<HeaderPage />}>
          <Route path="/" element={<Main />} />
          <Route path="/quiz/*" element={<Quiz />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
