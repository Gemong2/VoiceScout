import React from "react";
import style from "./CrimeType.module.css";
import { useState, useRef, useEffect } from "react";
import CrimeMethods from "components/crime-type/CrimeMethods";
import CriminalLetter from "components/crime-type/CriminalLetter";
import CrimePrevention from "components/crime-type/CrimePrevention";
import Remedy from "components/crime-type/Remedy";


export default function CrimeType() {
  
  const [toggleState, setToggleState] = useState(0);
  
  const toggleTab = (index:number) => {
    setToggleState(index);
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.button_container}>
          <button className={toggleState === 1 ? style.button_on  + " " + style.button + " " + style.button_size_s : 
          style.button + " " + style.button_size_s}
          onClick={() => toggleTab(1)}>
            수법소개
          </button>

          <button className= {toggleState === 2 ? style.button_on  + " " + style.button + " " + style.button_size_s : 
          style.button + " "+ style.button_size_s}
          onClick={() => toggleTab(2)}>
            범인문자
          </button>
      
          <button className={toggleState === 3 ? style.button_on  + " " +style.button + " " + style.button_size_s : 
          style.button + " "+ style.button_size_s}
          onClick={() => toggleTab(3)}>
            예방법
          </button>

          <button className={toggleState === 4 ? style.button_on  + " " +style.button + " " + style.button_size_s : 
          style.button + " "+ style.button_size_s}
          onClick={() => toggleTab(4)}>
            구제방법
          </button>

        </div>
        <div className={style.square}>
          <div className={style.context_square}>
            <div className={style.context}>
              {(toggleState === 1 && (
                <div className={style.active_content}>
                <CrimeMethods /></div> 
              )) || (toggleState === 2 && (
                <div className={style.active_content}>
                <CriminalLetter /></div> 
              )) || (toggleState === 3 && (
                <div className={style.active_content}>
                <CrimePrevention /></div> 
              )) || (toggleState === 4 && (
                <div className={style.active_content}>
                <Remedy /></div> ))}
            </div>
          </div>
        </div>
      </div> 
        
    </>
  );
}
