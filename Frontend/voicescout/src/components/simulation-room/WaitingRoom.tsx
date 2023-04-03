import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import Calloff from "img/calloff2.png";
import CreateModal from "components/common/CreateModal";

export default function WaitingRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const [speechToText, setSpeechToText] = useState("");
  const [userType, setUserType] = useState(0);
  const [getReady, setGetReady] = useState(false);
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
      seq: location.state.seq,
      title: location.state.title,
      count: location.state.participant,
      locked: location.state.locked,
      password: location.state.password,
    },
  ];

  useEffect(() => {
    const socket = new SockJS("http://localhost:4433/webSocket");
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
            const message = transcript;
            console.log(`Sending "${message}" to server via WebSocket`);
            stompClient.send("/ai", {}, message);
            return message;
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
      {!getReady && (
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
            <img className={style.my_img} src={Victim} alt="" />
            <img className={style.your_img} src={Criminal} alt="" />
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
            <button
              className={style.start_btn}
              onClick={() => {
                setGetReady(true);
              }}
            >
              시작
            </button>
            <button
              className={style.out_btn}
              onClick={() => {
                navigate(`/simulation-list/`);
              }}
            >
              나가기
            </button>
          </div>
        </>
      )}
      {getReady && (
        <>
        <div className={style.role}>
        <div className={style.simul_type}>
          <img
            className={style.contents_first}
            src={info[location.state.type].img}
            alt=""
          />
            <p>{info[location.state.type].type}</p>
        </div>
        <div className={style.simul_call}>{info[location.state.type].type === '대출 사칭형'? '1301' : 
        info[location.state.type].type === '기관 사칭형' ? '1599-9999' : '지인' }</div>
        <div className={style.simul_timer}>00:21</div>
        <div className={style.simul_profile}>
        <img className={style.simul_role} src={Criminal} alt="" /></div>
        <div className={style.simul_calloff}>
        <img className={style.simul_callimg} src={Calloff} alt="" /></div>
        </div>
        

        </>
      )}
      {isModal && (
        <CreateModal
          setIsModal={setIsModal}
          seqInput={location.state.seq}
          titleInput={location.state.title}
          passwordInput={location.state.password}
          typeIdInput={location.state.type}
          linkInput={location.state.link}
          participantInput={location.state.participant}
          lockedInput={location.state.locked}
          createInput={false}
        />
      )}
    </>
  );
}
