import { Router, Routes, Route } from "react-router-dom";
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HeaderPage from "./pages/HeaderPage";
import Main from "pages/Main";

function App() {
  return (
    <>
      <Routes>
        <Route element={<HeaderPage />}>
          <Route path="/" element={<Main />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
