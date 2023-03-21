import React from "react";
import style from "./Question.module.css";

export default function Question() {
  return (
    <>
      <div className={style.top_text}>나는 보이스 피싱에 얼마나 취약할까?</div>
      <div className={style.contents_title}>보이스 피싱 자가진단 O/X 퀴즈</div>
      <div className={style.contents_box}></div>
    </>
  );
}
