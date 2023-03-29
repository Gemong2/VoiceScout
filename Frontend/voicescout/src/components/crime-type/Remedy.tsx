import React from 'react'
import { useState, useRef, useEffect } from "react";
import style from "./Remedy.module.css";

export default function Remedy() {
  return (
    <div className={style.container}>
        <h2>구제방법</h2>
        <br />
        <div className={style.remedy_img}></div>
    </div>
  )
}
