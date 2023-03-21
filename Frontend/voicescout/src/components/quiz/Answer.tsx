import React from "react";
import style from "./Answer.module.css";

export default function Answer() {
  return (
    <>
      <div className={style.top_text}>나는 보이스 피싱에 얼마나 취약할까?</div>
      <div className={style.contents_title}>보이스 피싱 자가진단 O/X 퀴즈</div>
      <div className={style.contents_box}>
        <div className={style.question_number}>1/10</div>
        <div className={style.quetion_text}>
          Q. 나는 검찰에게 전화가 오면, <br />
          모든 정보를 넘겨준다?
        </div>
        <div className={style.true_false}>
          <div className={style.option}>O</div>
          <div className={style.option}>X</div>
        </div>
      </div>
    </>
  );
}
