import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { $ } from "util/axios";
import style from "./WaitingRoom.module.css";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Acquaintance from "img/type_acquaintance.png";
import Agency from "img/type_agency.png";
import Loans from "img/type_loans.png";
import Victim from "img/victim.png";
import Criminal from "img/criminal.png";
import Mic from "img/mic.png";
import MicMute from "img/mic.png";
import Micmute2 from "img/mic_mute2.png";
import Headphonemute from "img/headphone.png";
import Headset from "img/headset.png";
import Calloff from "img/calloff2.png";
import UpdataModal from "components/common/UpdataModal";
import VideoCam from "./WebRTC/VideoCam";
import { v4 as uuidv4 } from "uuid";

const socket = new SockJS(`http://localhost:4433/api/webSocket`);
// const socket = new SockJS(`https://j8a404.p.ssafy.io/api/webSocket`);
const stompClient = Stomp.over(socket);
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
  const [update, setUpdate] = useState<number>(0);
  const [time, setTime] = useState(0);
  const [mute, setMute] = useState(false);

  const [seq, setSeq] = useState<number>(location.state.seq);
  const [title, setTitle] = useState<string>(location.state.title);
  const [password, setPassword] = useState<string>(location.state.password);
  const [typeId, setTypeId] = useState<number>(location.state.typeId);
  const [link, setLink] = useState<string>(location.state.link);
  const [participant, setParticipant] = useState<number>(
    location.state.participant
  );
  const [locked, setLocked] = useState<boolean>(location.state.locked);

  const [myButtonState, setMyButtonState] = useState<ButtonState>(0);
  const [opponentButtonState, setOpponentButtonState] =
    useState<ButtonState>(0);

  // OpenVidu 변수
  const [isMic, setIsMic] = useState(true);
  const [isIn, setIsIn] = useState(true);

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

  type ButtonState = 0 | 1 | 2;

  type ButtonProps = {
    color: string;
    selected: boolean;
    opponentSelected: boolean;
    backgroundImage: string;
  };

  const Button = styled.button<ButtonProps>`
    background-image: ${(props) => `url(${props.backgroundImage})`};
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    border: none;
    margin-right: 10px;
    cursor: pointer;
    color: ${(props) => props.color};
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    opacity: ${(props) => (props.disabled ? "0.5" : "1")};
    background-color: ${(props) =>
      props.selected
        ? "#f7b52c"
        : props.opponentSelected
        ? "#4287f5"
        : "#787878"};
  `;

  const res_delete = () => {
    return $.delete(`/rooms/${location.state.seq}`);
  };
  const { mutate: onDelete } = useMutation(res_delete, {
    onSuccess: () => {
      navigate(`/simulation-list/`);
    },
  });

  const res_put = () => {
    return $.put(`/rooms`, datas);
  };

  // 방에 남아있는 사람 0명이면 자동으로 방 삭제
  const { mutate: onChange } = useMutation(res_put);

  // 웹소켓과 음성인식 이벤트
  useEffect(() => {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    stompClient.connect({}, () => {
      console.log("Connected to WebSocket server");

      // get-out send하면 모두 페이지에서 나가기
      stompClient.subscribe(`/ai/${link}`, (data) => {
        const newMsg = JSON.parse(data.body);
        if (newMsg.prediction === 2) {
          if (userType === 1) navigate(`/simulation-list/`);
          else onDelete();
        } else if (newMsg.prediction === 3) {
          window.location.replace(`/simulation-room/${link}`);
        } else if (newMsg.prediction === 4) {
          setGetReady(true);
        }
      });
    });

    const recognition = new SpeechRecognition();

    recognition.interimResults = true;
    recognition.lang = "ko-KR";
    recognition.continuous = false;
    recognition.maxAlternatives = 1000;

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

    return () => {
      stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket server");
      });
    };
  }, []);

  // 방 나갈때 보내는 통신
  const getOut = () => {
    stompClient.send(
      "/ai",
      {},
      JSON.stringify({ message: "get-out", link: link })
    );
  };

  // 방 정보 변경시 방에있는 사람 모두 새로고침
  const updateRoom = () => {
    stompClient.send(
      "/ai",
      {},
      JSON.stringify({ message: "update-room", link: link })
    );
  };

  // 시작 누르면 같이 시작하는 함수
  const startCall = () => {
    stompClient.send(
      "/ai",
      {},
      JSON.stringify({ message: "start-call", link: link })
    );
  };

  if (update === 1) {
    updateRoom();
    setUpdate(0);
  }

  // 시간을 분:초 형태로 변환하는 함수
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const handleButtonClick = (buttonId: ButtonState) => {
    if (myButtonState === 0) {
      setMyButtonState(buttonId);
      stompClient.send("/button", {}, JSON.stringify({ buttonId: buttonId }));

      if (opponentButtonState === buttonId) {
        alert("다른 사용자가 이미 해당 역할을 선택했습니다.");
        setOpponentButtonState(0);
        stompClient.send("/button", {}, JSON.stringify({ buttonId: 0 }));
      }
    } else if (myButtonState === buttonId) {
      setMyButtonState(0);
      stompClient.send("/button", {}, JSON.stringify({ buttonId: 0 }));
    } else {
      setMyButtonState(buttonId);
      stompClient.send("/button", {}, JSON.stringify({ buttonId: buttonId }));
    }
  };

  // 소켓에서 보이스피싱 알람 주는 것

  // socket.addEventListener("message",(event) => {
  //   const data = JSON.parse(event.data);
  //   const { variable } = data; // 변수값 읽기

  //   if (variable>=10){
  //     alert("보이스 피싱 위험")
  //   }
  // })

  // GET요청 성공 시 데이터 로드
  useEffect(() => {
    if (isLoading) return;
    refetch();
    init(data && data.data);
  }, [isLoading]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // getReady 값이 1인 경우에만 타이머를 실행
    if (getReady) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
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
        <div className={style.ready_container}>
          <div className={style.container}>
            <div className={style.inner_container}>
              <div className={style.header}>{title}</div>
              <div className={style.header_guide}>
                <div>역할을 선택하십시오</div>
                <div className={style.video}>
                  <VideoCam
                    isVideo={false}
                    isMic={isMic}
                    isIn={isIn}
                    sessionId={link}
                    name={uuidv4()}
                  />
                </div>
              </div>
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
                <div className={style.contents_third}>
                  {info[typeId].describe}
                </div>
              </div>
              <div className={style.information}>
                <div className={style.blank}></div>
                <Button
                  className={style.information_button}
                  color="gray"
                  disabled={opponentButtonState === 1}
                  onClick={() => handleButtonClick(1)}
                  selected={myButtonState === 1}
                  backgroundImage={Victim}
                  opponentSelected={opponentButtonState === 1}
                ></Button>
                <Button
                  className={style.information_button}
                  color="gray"
                  disabled={opponentButtonState === 2}
                  onClick={() => handleButtonClick(2)}
                  selected={myButtonState === 2}
                  backgroundImage={Criminal}
                  opponentSelected={opponentButtonState === 2}
                ></Button>
                <div className={style.roles}>
                  <div className={style.mainrole_position}>
                    <div
                      className={
                        myButtonState === 1
                          ? style.main_role
                          : myButtonState === 0
                          ? style.sub_role
                          : style.sub_role
                      }
                    >
                      피해자
                    </div>
                  </div>
                  <div className={style.subrole_position}>
                    <div
                      className={
                        myButtonState === 2
                          ? style.main_role
                          : myButtonState === 0
                          ? style.sub_role
                          : style.sub_role
                      }
                    >
                      피싱범
                    </div>
                  </div>
                </div>
                <div className={style.settings}>
                  <img src={mute ? MicMute : Mic} alt="" />
                  <img src={Headset} alt="" />
                </div>
              </div>
              <div className={style.btn_div}>
                <button
                  className={style.setting_btn}
                  onClick={() => {
                    setIsModal(true);
                    setUpdate(0);
                  }}
                  disabled={userType === 0 ? false : true}
                >
                  설정
                </button>
                <button
                  className={style.start_btn}
                  onClick={() => {
                    startCall();
                  }}
                  disabled={userType === 0 ? false : true}
                >
                  시작
                </button>
                <button
                  className={style.out_btn}
                  onClick={() => {
                    if (userType === 0) getOut();
                    else {
                      setParticipant(participant - 1);
                      onChange();
                      navigate(`/simulation-list/`);
                    }
                  }}
                >
                  나가기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {getReady && myButtonState === 1 && (
        <div className={style.simul_container}>
          <div className={style.simul_type}>
            <img
              className={style.contents_first}
              src={info[typeId].img}
              alt=""
            />
            <p>{info[typeId].type}</p>
          </div>
          <div className={style.simul_typerole}>
            <div className={style.simul_typecall}>
              <div className={style.simul_call}>
                {info[typeId].type === "대출 사칭형"
                  ? "1301"
                  : info[typeId].type === "기관 사칭형"
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
              <img src={Micmute2} alt="" />
              <div className={style.setting_text}>소리 끔</div>
            </div>
            <div className={style.setting_div}>
              <img src={Headphonemute} alt="" />
              <div className={style.setting_text}>
                상대
                <br />
                소리 끔
              </div>
            </div>
          </div>
          <div className={style.simul_calloff}>
            <img
              className={style.simul_callimg}
              src={Calloff}
              alt=""
              onClick={() => {
                getOut();
              }}
            />
          </div>
        </div>
      )}
      {getReady && myButtonState === 2 && (
        <div className={style.simul_container}>
          <div className={style.simul_type}>
            <img
              className={style.contents_first}
              src={info[typeId].img}
              alt=""
            />
            <p>{info[typeId].type}</p>
          </div>
          <div className={style.simul_typerole}>
            <div className={style.simul_typecall}>
              <div className={style.simul_call}>피해자</div>
              <div className={style.simul_timer}>{formatTime(time)}</div>
            </div>
          </div>
          <div className={style.script}>
            <div className={style.victim_script}>
              <div className={style.victim_scripttext}>
                {info[typeId].type === "대출 사칭형"
                  ? "서울중앙지방검찰청 첨단범죄 수사팀 팀장을 맡고 있는 김정수 검사입니다. 대포통장 관련 수사 과정에서 금융사기단을 검거하여 조사중인데, 본인 명의 계좌가 범죄에 이용되고 있습니다. 계좌번호 00-0-0 맞으시죠? 금융사기단과 공범인지 아닌지 확인해야 합니다. 공동 불법행위자로서 손해 배상 책임이 있기 때문에 본인이 연루되지 않았다는 사실을 증명해주셔야 합니다. 금융감독원에서 확인 전화가 갈 예정입니다. 동의하십니까?"
                  : info[typeId].type === "기관 사칭형"
                  ? "안녕하세요. KB국민은행입니다."
                  : "엄마 나야."}
              </div>
            </div>
          </div>
          <div className={style.simul_calloff}>
            <img
              className={style.simul_callimg}
              src={Calloff}
              alt=""
              onClick={() => {
                getOut();
              }}
            />
          </div>
        </div>
      )}
      {isModal && (
        <UpdataModal
          setIsModal={setIsModal}
          setUpdate={setUpdate}
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
