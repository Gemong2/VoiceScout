import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import style from "./WaitingRoom.module.css";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Acquaintance from "img/type_acquaintance.png";
import Agency from "img/type_agency.png";
import Loans from "img/type_loans.png";
import Victim from "img/victim.png";
import Criminal from "img/criminal.png";
import Mike from "img/mike.png";
import Headset from "img/headset.png";
import CreateModal from "components/common/CreateModal";

export default function WaitingRoom() {
  const [speechToText, setSpeechToText] = useState("");
  const location = useLocation();
  const [isModal, setIsModal] = useState(false);

  const info = [
    {
      type: `대출 사칭형`,
      describe: `금융기관을 사칭, 피싱사이트로 유인하여
      피해자 명의로 대출 편취하는 사기 수법`,
      img: Loans,
    },
    {
      type: `기관 사칭형`,
      describe: `수사기관을 사칭하여 피해자를 기망하여
       금전 편취하는 사기 수법`,
      img: Agency,
    },
    {
      type: `지인 사칭형`,
      describe: `지인을 사칭해 문자나 전화로 돈을 요구하는
      사기 수법`,
      img: Acquaintance,
    },
    {
      type: `대출 사칭형`,
      describe: `금융기관을 사칭, 피싱사이트로 유인하여
       피해자 명의로 대출 편취하는 사기 수법`,
      img: Loans,
    },
  ];

  interface data_type {
    seq: number;
    title: string;
    count: number;
    locked: boolean;
    password: string | null;
  }

  const data: data_type[] = [
    {
      seq: 0,
      title: location.state.title,
      count: 1,
      locked: location.state.locked,
      password: location.state.password,
    },
  ];

  useEffect(() => {
    const socket = new SockJS("http://localhost:80800/websocket");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log("Connected to WebSocket server");
    });

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();

    recognition.interimResults = true;
    recognition.lang = "ko-KR";
    recognition.continuous = true;
    recognition.maxAlternatives = 10000;

    recognition.addEventListener("result", (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        let transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          setSpeechToText(() => {
            const newSpeechToText = transcript;
            console.log(`Sending "${newSpeechToText}" to server via WebSocket`);
            stompClient.send("/app/transcript", {}, newSpeechToText);
            return newSpeechToText;
          });
        }
      }
    });

    recognition.addEventListener("end", recognition.start);

    recognition.start();

    return () => {
      recognition.stop();
      stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket server");
      });
    };
  }, []);

  return (
    <>
      <div className={style.header}>{data[0].title}</div>
      <div className={style.header_guide}>역할을 선택하십시오</div>
      <div className={style.contents}>
        <img
          className={style.contents_first}
          src={info[location.state.type].img}
          alt=""
        />
        <div className={style.contents_second}>
          <p>{info[location.state.type].type}</p>
          <div className={style.locked}>
            {data[0].locked ? <span>비공개</span> : <span>공개</span>}
          </div>
        </div>
        <div className={style.contents_third}>
          {info[location.state.type].describe}
        </div>
      </div>
      <div className={style.information}>
        <div className={style.blank}></div>
        <img className={style.main_img} src={Victim} alt="" />
        <img className={style.sub_img} src={Criminal} alt="" />
        <div className={style.roles}>
          <div className={style.main_role}>피해자</div>
          <div className={style.sub_role}>피싱범</div>
        </div>
        <div className={style.settings}>
          <img src={Mike} alt="" />
          <img src={Headset} alt="" />
        </div>
      </div>
      <div className={style.btn_div}>
        <button
          className={style.setting_btn}
          onClick={() => {
            setIsModal(true);
          }}
        >
          설정
        </button>
        <button className={style.start_btn}>시작</button>
        <button className={style.out_btn}>나가기</button>
      </div>
      {isModal && (
        <CreateModal
          setIsModal={setIsModal}
          titleInput={location.state.title}
          lockedInput={location.state.locked}
          passwordInput={location.state.password}
          typeInput={location.state.type}
        />
      )}
    </>
  );
}
