import React from "react";
import style from "./Simulation.module.css";
import { Routes, Route } from "react-router-dom";
import RoomList from "components/simulation/RoomList";
import WaitingRoom from "components/simulation/WaitingRoom";
import PlayRoom from "components/simulation/PlayRoom";

export default function Simulation() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RoomList />} />
        <Route path="wait" element={<WaitingRoom />} />
        <Route path="play" element={<PlayRoom />} />
      </Routes>
    </>
  );
}
