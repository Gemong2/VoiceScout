import React from "react";
import style from "./Question.module.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Gauge = styled.div`
  margin-top: 20px;
  width: 700px;
  height: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px #a9a8a8;
  background: linear-gradient(to right, #f7b52c 10%, #cccccc 10%);
`;

export default function Question() {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.top_text}>나는 보이스 피싱에 얼마나 취약할까?</div>
      <div className={style.contents_title}>보이스 피싱 자가진단 O/X 퀴즈</div>
      <div className={style.contents_box}>
        <div className={style.question_number}>1/10</div>
        <Gauge />
        <div className={style.quetion_text}>
          Q. 나는 검찰에게 전화가 오면, <br />
          모든 정보를 넘겨준다?
        </div>
        <div className={style.true_false}>
          <div
            className={style.option}
            onClick={() => {
              navigate("/quiz/answer");
            }}
          >
            O
          </div>
          <div
            className={style.option}
            onClick={() => {
              navigate("/quiz/answer");
            }}
          >
            X
          </div>
        </div>
      </div>
    </>
  );
}
