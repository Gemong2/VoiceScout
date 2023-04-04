import React, { useState, useEffect, useRef } from "react";
import style from "./Main.module.css";
import Phone from "img/phone.png";
import Logo from "img/logo.png";
import { useNavigate } from "react-router-dom";

interface Props {
  target1: number;
  target2: number;
  target3: number;
  duration: number;
}
export default function Main({ target1, target2, target3, duration }: Props) {

  const navigate = useNavigate();

  const count1Ref = useRef(0);
  const count2Ref = useRef(0);
  const count3Ref = useRef(0);
  const [count1Display, setCount1Display] = useState(0);
  const [count2Display, setCount2Display] = useState(0);
  const [count3Display, setCount3Display] = useState(0);

  const startAnimation = () => {
    let start = Date.now();
    const intervalId = setInterval(() => {
      const timePassed = Date.now() - start;
      const progress = timePassed / duration;

      if (progress >= 1) {
        count1Ref.current = target1;
        count2Ref.current = target2;
        count3Ref.current = target3;
        setCount1Display(count1Ref.current);
        setCount2Display(count2Ref.current);
        setCount3Display(count3Ref.current);
      } else {
        count1Ref.current = Math.floor(target1 * progress);
        count2Ref.current = Math.floor(target2 * progress);
        count3Ref.current = Math.floor(target3 * progress);
        setCount1Display(count1Ref.current);
        setCount2Display(count2Ref.current);
        setCount3Display(count3Ref.current);
      }
    }, 10);
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const getTransitionDelay = (count: number) => {
    const delay = Math.floor((count / (target1 + target2 + target3)) * duration);
    return `${delay}ms`;
  }
  
  return (
    <div className={style.main_container}>
      <div className={style.main_theme}>
        <div className={style.main_contents}>
          <div>
            <img className={style.phone_img} src={Phone} alt="" />
          </div>
          <div>
            <div>
              <img className={style.logo_img} src={Logo} alt="" />
            </div>
            <div className={style.main_text}>
              <span className={style.keyword}>보이스피싱</span>
              <br />
              <span>아는 만큼 예방할 수 있습니다.</span>
            </div>
          </div>
        </div>
      </div>
        <div className={style.guy_img}>
          <div className={style.main_second + " " + style.main_column}>
            <div className={style.guy_text}>모의 체험을 통해<br />
            실제 상황에서<br />대처할 수 있습니다.</div>
          </div>
        </div>
        <div className={style.third}>
          <div className={style.third_title}>
            통계로 확인하는 보이스 피싱 현황
          </div>
          <div className={style.numbers}>
            <div className={style.number} style={{ transitionDelay: getTransitionDelay(count1Display) }}>
              {count1Display.toLocaleString()}억
            </div>
            <div className={style.number} style={{ transitionDelay: getTransitionDelay(count2Display) }}>
              {count2Display.toLocaleString()}건
            </div>
            <div className={style.number} style={{ transitionDelay: getTransitionDelay(count3Display) }}>
              {count3Display.toLocaleString()}명
            </div>
          </div>
          <div className={style.third_textlist}>
            <div className={style.third_text}>보이스피싱 누적 피해액</div>
            <div className={style.third_text}>보이스피싱 누적 피해건수</div>
            <div className={style.third_text}>보이스피싱 누적 피해자수</div>
          </div>
          <button onClick={() => {
            navigate(`/crime-type/*`);
          }}>보이스 피싱에 대해 더 알고 싶다면</button>
        </div>
    </div>
  );
}
