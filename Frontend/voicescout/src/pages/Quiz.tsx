import React from "react";
import style from "./Quiz.module.css";

export default function Quiz() {
  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
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
              <button className={style.start_btn}>시작</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
