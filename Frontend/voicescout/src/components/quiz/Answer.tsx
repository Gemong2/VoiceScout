import React from "react";
import style from "./Answer.module.css";
import { useNavigate } from "react-router-dom";

export default function Answer() {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.contents_title}>정답</div>
      <div className={style.contents_box}>
        <div className={style.answer_box_grid}>
          <div className={style.blank} />
          <div className={style.answer_box}>
            <div className={style.option}>O</div>
          </div>
          <div className={style.blank} />
        </div>
        <div className={style.answer_text}>
          검찰은 010으로 전화하지 않습니다. <br />
          사칭 전화에 주의해주세요.
        </div>
        <div className={style.btn_div}>
          <button
            className={style.start_btn}
            onClick={() => {
              navigate("/quiz/question");
            }}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}
