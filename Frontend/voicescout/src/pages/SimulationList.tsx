import React from "react";
import style from "./SimulationList.module.css";
import { Routes, Route } from "react-router-dom";
import RoomList from "components/simulation-list/RoomList";

export default function SimulationList() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RoomList />} />
      </Routes>
    </>
  );
}
