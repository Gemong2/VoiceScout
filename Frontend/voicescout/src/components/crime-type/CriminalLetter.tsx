import React from 'react'
import { useState, useRef, useEffect } from "react";
import style from "./CriminalLetter.module.css";

export default function CriminalLetter() {

  const [buttonState, setButtonState] = useState(0);
  const buttonTab = (index:number) => {
    setButtonState(index);
  }
  return (
    <div className={style.content}>
      <div className={style.wrap}>
        <div className={style.guide}></div>
        <div className={style.chat +" "+ style.ch1}>
          <div className={style.textbox}>아래 항목을 클릭해서<br />
              상세 문자내용을<br />
              확인해보세요</div>
          </div>
        <div className={style.square}>
          <div className={style.button_tap}>
              <button className={buttonState === 1 ? style.tabbutton_on + " " + style.tabbutton: style.tabbutton} onClick={() => buttonTab(1)}>대출사기문자</button>
              <button className={buttonState === 2 ? style.tabbutton_on + " " + style.tabbutton: style.tabbutton} onClick={() => buttonTab(2)}>물품결제문자</button>
              <button className={buttonState === 3 ? style.tabbutton_on + " " + style.tabbutton: style.tabbutton} onClick={() => buttonTab(3)}>생계지원대출</button>
              <button className={buttonState === 4 ? style.tabbutton_on + " " + style.tabbutton: style.tabbutton} onClick={() => buttonTab(4)}>정부지원<br />대환대출</button>
              <button className={buttonState === 5 ? style.tabbutton_on + " " + style.tabbutton: style.tabbutton} onClick={() => buttonTab(5)}>긴급재난<br />지원대출</button>
              <button className={buttonState === 6 ? style.tabbutton_on + " " + style.tabbutton: style.tabbutton} onClick={() => buttonTab(6)}>대출사기형</button>
          </div>
        </div>
      </div>
    </div>
  )
}
