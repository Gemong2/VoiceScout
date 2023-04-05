import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { $ } from "util/axios";
import style from "./WaitingRoom.module.css";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Acquaintance from "img/type_acquaintance.png";
import Agency from "img/type_agency.png";
import Loans from "img/type_loans.png";
import Victim from "img/victim.png";
import Criminal from "img/criminal.png";
import Mike from "img/mike.png";
import Mikemute from "img/mic_mute2.png"
import Headphonemute from "img/headphone.png";
import Headset from "img/headset.png";
import Calloff from "img/calloff2.png";
import UpdataModal from "components/common/UpdataModal";

export default function WaitingRoom() {
  const { isLoading, data, refetch } = useQuery(
    ["Room"],
    () => $.get(`/rooms/${location.state.seq}`),
    {
      refetchOnMount: "always",
    }
  );

  const navigate = useNavigate();
  const location = useLocation();
  let { params } = useParams();
  const stompClientRef = useRef<Stomp.Client | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [speechToText, setSpeechToText] = useState("");
  const [userType, setUserType] = useState(location.state.userType);
  const [getReady, setGetReady] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [time, setTime] = useState(0);

  const [seq, setSeq] = useState<number>(location.state.seq);
  const [title, setTitle] = useState<string>(location.state.title);
  const [password, setPassword] = useState<string>(location.state.password);
  const [typeId, setTypeId] = useState<number>(location.state.typeId);
  const [link, setLink] = useState<string>(location.state.link);
  const [participant, setParticipant] = useState<number>(
    location.state.participant
  );
  const [locked, setLocked] = useState<boolean>(location.state.locked);

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
  ];

  interface datas_type {
    seq: number;
    title: string;
    password: string;
    typeId: number;
    link: string;
    participant: number;
    locked: boolean;
  }

  const datas: datas_type = {
    seq: seq,
    title: title,
    password: password,
    typeId: typeId,
    link: link,
    participant: participant,
    locked: locked,
  };

  const init = (arr: datas_type) => {
    setTitle(arr.title);
    setLocked(arr.locked);
    setParticipant(arr.participant);
    setPassword(arr.password);
    setTypeId(arr.typeId);
  };

  const res_delete = () => {
    return $.delete(`/rooms/${location.state.seq}`);
  };
  const { mutate: onDelete } = useMutation(res_delete, {
    onSuccess: () => {
      navigate(`/simulation-list/`);
    },
  });

  const cntCheck = () => {
    if (userType === 0) {
      onDelete();
    } else {
      setParticipant(participant - 1);
      navigate(`/simulation-list/`);
    }
  };

  // 시간을 분:초 형태로 변환하는 함수
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  useEffect(() => {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    // const socket = new SockJS(`http://localhost:4433/api/webSocket`);
    const socket = new SockJS(`https://j8a404.p.ssafy.io/webSocket`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      console.log("Connected to WebSocket server");
    });
    const recognition = new SpeechRecognition();

    recognition.interimResults = true;
    recognition.lang = "ko-KR";
    recognition.continuous = true;
    recognition.maxAlternatives = 10000;

    recognition.addEventListener("result", (e) => {
      console.log("음성인식 테스트중");
      for (let i = e.resultIndex; i < e.results.length; i++) {
        let transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          setSpeechToText(() => {
            const message = transcript;
            console.log(`Sending "${message}" to server via WebSocket`);
            stompClient.send(
              "/ai",
              {},
              JSON.stringify({ message: message, link: link })
            );
            return message;
          });
        }
      }
    });

    recognition.addEventListener("end", recognition.start);

    recognition.start();
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket server");
      });
    };
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // getReady 값이 1인 경우에만 타이머를 실행
    if (getReady) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    // 컴포넌트가 언마운트되면 타이머를 정리
    return () => {
      clearInterval(intervalId);
    };
  }, [getReady]);



  return (
    <>
      {!getReady && !isLoading && (
        <div className={style.container}>
          <div className={style.inner_container}>
            <div className={style.header}>{title}</div>
            <div className={style.header_guide}>역할을 선택하십시오</div>
            <div className={style.contents}>
              <img
                className={style.contents_first}
                src={info[typeId].img}
                alt=""
              />
              <div className={style.contents_second}>
                <p>{info[typeId].type}</p>
                <div className={style.locked}>
                  {locked ? <span>비공개</span> : <span>공개</span>}
                </div>
              </div>
              <div className={style.contents_third}>{info[typeId].describe}</div>
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
                  cntCheck();
                }}
              >
                나가기
              </button>
            </div>
          </div>
        </div>
      )}
      {getReady && (
        <div className={style.simul_container}>
            <div className={style.simul_type}>
              <img
                className={style.contents_first}
                src={info[location.state.typeId].img}
                alt=""
              />
              <p>{info[location.state.typeId].type}</p>
            </div>
          <div className={style.simul_typerole}>
            <div className={style.simul_typecall}>
              <div className={style.simul_call}>
                {info[location.state.typeId].type === "대출 사칭형"
                  ? "1301"
                  : info[location.state.typeId].type === "기관 사칭형"
                  ? "1599-9999"
                  : "지인"}
              </div>
              <div className={style.simul_timer}>{formatTime(time)}</div>
            </div>
          </div>
          <div className={style.simul_profile}>
            <img className={style.simul_role} src={Criminal} alt="" />
          </div>
          <div className={style.mikesetting}>
            <div className={style.setting_div}>
              <img src={Mikemute} alt="mikemute" />
              <div className={style.setting_text}>소리 끔</div>
            </div>
            <div className={style.setting_div}>
              <img src={Headphonemute} alt="headphonemute" />
              <div className={style.setting_text}>상대<br />소리 끔</div>
            </div>
          </div>
          <div className={style.simul_calloff}>
            <img className={style.simul_callimg} src={Calloff} alt="" />
          </div>
        </div>
      )}
      {isModal && (
        <UpdataModal
          setIsModal={setIsModal}
          seqInput={seq}
          titleInput={title}
          passwordInput={password}
          typeIdInput={typeId}
          linkInput={link}
          participantInput={participant}
          lockedInput={locked}
        />
      )}
    </>
  );
}
