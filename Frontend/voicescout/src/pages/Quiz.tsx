import React from "react";
import style from "./Quiz.module.css";
import { Routes, Route } from "react-router-dom";
import Start from "components/quiz/Start";
import Question from "components/quiz/Question";
import Answer from "components/quiz/Answer";

export default function Quiz() {
  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="question" element={<Question />} />
            <Route path="answer" element={<Answer />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
