import React from "react";
import style from "./Start.module.css";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.top_blank}></div>
      <div className={style.main_contents}>
        <div className={style.main_text_grid}>
          <span>
            보이스피싱
            <br />
            자가진단
            <br />
            O/X퀴즈
          </span>
        </div>
        <div className={style.main_btn_grid}>
          <button
            className={style.start_btn}
            onClick={() => {
              navigate("/quiz/question");
            }}
          >
            시작
          </button>
        </div>
      </div>
    </>
  );
}
