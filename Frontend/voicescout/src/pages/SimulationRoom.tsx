import React from "react";
import style from "./SimulationRoom.module.css";
import { Routes, Route } from "react-router-dom";
import WaitingRoom from "components/simulation-room/WaitingRoom";
import Clear from "components/simulation-room/Clear";

export default function SimulationRoom() {
  return (
    <div className={style.container}>
      <div className={style.inner_container}>
        <Routes>
          <Route path="/:link" element={<WaitingRoom />} />
          <Route path="/clear" element={<Clear />} />
        </Routes>
      </div>
    </div>
  );
}
