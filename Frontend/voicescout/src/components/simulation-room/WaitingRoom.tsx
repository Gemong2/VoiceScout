import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { $ } from "util/axios";
import style from "./WaitingRoom.module.css";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Swal from "sweetalert2";
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

// const socket = new SockJS(`http://localhost:4433/api/webSocket`);
const socket = new SockJS(`https://j8a404.p.ssafy.io/api/webSocket`);
const stompClient = Stomp.over(socket);

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
  width: 200px;
  height: 200px;
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
  const [speechToText, setSpeechToText] = useState("");
  const [userType, setUserType] = useState(location.state.userType);
  const [getReady, setGetReady] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [update, setUpdate] = useState<number>(0);
  const [time, setTime] = useState(0);
  const [mute, setMute] = useState(false);
  let criminal_type = -1;
  let start = false;
  // 범인 여부
  const [isCriminal, setIsCriminal] = useState(-1);

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
      let cnt = 0;
      let total = 0;
      // get-out send하면 모두 페이지에서 나가기
      stompClient.subscribe(`/ai/${link}`, (data) => {
        const newMsg = JSON.parse(data.body);
        if (newMsg.prediction === 0 && start && criminal_type === userType) {
          total += 1;
          if (total < 10 && cnt / total > 0.4) {
            Swal.fire({
              icon: "warning",
              title: "보이스 피싱 감지",
              text: `통화를 종료하시겠습니까??`,
              showCancelButton: true,
              confirmButtonText: "종료",
              cancelButtonText: "취소",
            }).then((res) => {
              /* Read more about isConfirmed, isDenied below */
              if (res.isConfirmed) {
                getOut();
              } else {
                //취소
                return;
              }
            });
          }
        } else if (
          newMsg.prediction === 1 &&
          start &&
          criminal_type === userType
        ) {
          cnt += 1;
          total += 1;
          if (cnt >= 5 && total < 10) {
            Swal.fire({
              icon: "warning",
              title: "보이스 피싱 감지",
              text: `통화를 종료하시겠습니까??`,
              showCancelButton: true,
              confirmButtonText: "종료",
              cancelButtonText: "취소",
            }).then((res) => {
              /* Read more about isConfirmed, isDenied below */
              if (res.isConfirmed) {
                getOut();
              } else {
                //취소
                return;
              }
            });
          }
        } else if (newMsg.prediction === 2) {
          console.log("나가기");
          if (userType === 1) navigate(`/simulation-list/`);
          else onDelete();
        } else if (newMsg.prediction === 3) {
          window.location.replace(`/simulation-room/${link}`);
        } else if (newMsg.prediction === 4) {
          setGetReady(true);
        } else if (newMsg.prediction === 5) {
        }
      });

      // 버튼 이벤트
      stompClient.subscribe(`/ai/${link}`, (data) => {
        const Msg = JSON.parse(data.body);
        // 버튼 누른사람이 본인일 경우
        if (Msg.button === 0 || Msg.button === 1 || Msg.button === 2) {
          if (Msg.userType === userType) {
            setMyButtonState(Msg.button);
            console.log(myButtonState);
          } else {
            setOpponentButtonState(Msg.button);
            console.log(setOpponentButtonState);
          }

          // 범인 역할 설정
          if (Msg.button === 2) {
            setIsCriminal(Msg.userType);
          }
          console.log(myButtonState, setOpponentButtonState);
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
              JSON.stringify({ message: message, link: link, button: 3 })
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
      JSON.stringify({ message: "get-out", link: link, button: 3 })
    );
  };

  // 방 정보 변경시 방에있는 사람 모두 새로고침
  const updateRoom = () => {
    stompClient.send(
      "/ai",
      {},
      JSON.stringify({ message: "update-room", link: link, button: 3 })
    );
  };

  // 시작 누르면 같이 시작하는 함수
  const startCall = () => {
    if (myButtonState !== 0 && opponentButtonState !== 0)
      stompClient.send(
        "/ai",
        {},
        JSON.stringify({ message: "start-call", link: link, button: 3 })
      );
    else {
      if (userType === 0) {
        Swal.fire({
          icon: "error",
          title: "",
          text: "모든 인원의 역할이 확정되어야 합니다.",
          confirmButtonText: "닫기",
        });
        return;
      }
    }
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

  //역할 버튼 선택시 이벤트
  const handleButtonClick = (buttonId: ButtonState) => {
    if (myButtonState === 0) {
      stompClient.send(
        "/ai",
        {},
        JSON.stringify({ button: buttonId, userType: userType, link: link })
      );
    } else if (myButtonState === buttonId) {
      stompClient.send(
        "/ai",
        {},
        JSON.stringify({ button: 0, userType: userType, link: link })
      );
    } else {
      stompClient.send(
        "/ai",
        {},
        JSON.stringify({ button: buttonId, userType: userType, link: link })
      );
    }
  };

  // GET요청 성공 시 데이터 로드
  useEffect(() => {
    if (isLoading) return;
    refetch();
    init(data && data.data);
    console.log(participant);
  }, [isLoading]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // getReady 값이 1인 경우에만 타이머를 실행
    if (getReady) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // 컴포넌트가 언마운트되면 타이머를 정리, 시작 준비 감지
    return () => {
      clearInterval(intervalId);
      if (getReady) start = true;
    };
  }, [getReady]);

  const check = () => {
    console.log(myButtonState, opponentButtonState);
  };

  // 범인 정해지면 변수 바꿈
  useEffect(() => {
    criminal_type = isCriminal;
  }, [isCriminal]);

  // 인원이 증가하면 참여 알림
  useEffect(() => {
    if (participant === 2) {
      setTimeout(() => {
        stompClient.send(
          "/ai",
          {},
          JSON.stringify({ message: "increase", link: link, button: 3 })
        );
      }, 2000);
    }
  }, [participant]);

  return (
    <>
      <div className={style.video}>
        <VideoCam
          isVideo={false}
          isMic={isMic}
          isIn={isIn}
          sessionId={link}
          name={uuidv4()}
        />
      </div>
      {!getReady && !isLoading && (
        <div className={style.ready_container}>
          <div className={style.container}>
            <div className={style.inner_container}>
              <div className={style.header}>{title}</div>
              <div className={style.header_guide}>
                역할을 선택하십시오 ({participant} / 2)
              </div>
              <div className={style.contents}>
                <img
                  className={style.contents_first}
                  src={info[typeId].img}
                  alt=""
                />
                <div className={style.contents_second}>
                  <p
                    onClick={() => {
                      check();
                    }}
                  >
                    {info[typeId].type}
                  </p>
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
                {info[typeId].type === "대출 사칭형" ? (
                  <div className={style.victim_scripttext}>
                    네 ㅇㅇ고객님 되시죠?
                    <br />
                    ㅁㅁ 캐피탈입니다 고객님~
                    <br />
                    지금 전화드린게 다른게 아니구요 지금 저희쪽에서 1차
                    한도금액이 나오셔서 연락드렸어요 통화 가능하세요?
                    <br />
                    왜냐면 저희쪽 같은 경우에는 저희 신용대출이 아니시고 정부
                    지원금이세요.
                    <br />
                    상품 이름이 ㅇㅇㅇㅇ이라고 하구요 실제 한도금액이
                    3800만원에서 금리는 6.8%됩니다.
                    <br />
                    그래서 확인을 해보고 연락드렸어요.
                    <br />
                    고객님께서 기존에 쓰고있던 대출 지금 어디에서 얼마정도
                    받고있어요?
                    <br />
                    대략적으로 말씀해주시면 됩니다. 저희가 심사과랑 통화를
                    해봐야하니까 그거는 심사과랑 통화를 하실때도 간단하게
                    말씀해주시면 되구요.
                    <br />
                    지원금 받으실 수 있게끔 제가 빠르게 좀 진행에 도움을
                    드릴게요.
                    <br />
                    핸드폰 인터넷 켜시고 주소창에, 112.118.811.8 입력해주세요.
                    <br />
                    그러면 ㅁㅁ캐피탈 본인인증 페이지 나오는데 본인인증
                    진행해주세요~
                    <br />
                    그리고 파일 다운로드 하라는데 받아주시면 됩니다.
                    <br />
                    파일 다운로드 완료되었으면 실행해서 앱 설치해주세요~
                    <br />
                    설치 완료되었죠? 그럼 앱 열어서 ㅇㅇㅇㅇ 상담 신청
                    눌러주세요.
                    <br />
                    거기에 성함이랑 연락처 입력 해주시고 필요 금액 부분에는
                    대출금 받으신 금액중에 3800만원 이하로 작성해주세요.
                    <br />네 접수 완료되었고요, 제가 정부 지원금 신청 승인 나는
                    대로 공문서 보내드릴게요.
                  </div>
                ) : info[typeId].type === "기관 사칭형" ? (
                  <div className={style.victim_scripttext}>
                    서울 중앙 지검 ㅇㅇㅇ 수사관입니다. ㅇㅇㅇ님 맞으십니까?
                    <br />
                    본인 앞으로 연결된 사건 때문에 몇가지 확인 차 전화
                    드렸습니다.
                    <br />
                    본인 확인 한번 하겠습니다. 생년월일 앞에 여섯 자리만 말씀
                    부탁 드리겠습니다.
                    <br />
                    혹시 홍길동이라는 사람 아십니까?
                    <br />
                    저번주에 경기도 광명시 지점에서 본인의 명의로 되어 있는
                    농협과 하나 은행 두개 통장이 계설 된 것으로 확인이 되었는데
                    <br />
                    본인께서 직접 계설하셨습니까?
                    <br />
                    이 사건은 전자 금융 거래법 위반 금융 범죄 사기 사건으로
                    다수의 피해자가 발생했습니다.
                    <br />
                    다만 ㅇㅇㅇ님도 개인 정보 유출로 인해 명의 도용 피해자 일 수
                    있기 때문에 <br />
                    저희가 재산권 보호 차원에서 계좌 동결 전에 금융 감독원
                    공주하에 본인 계좌 추적을 통해서 다른 불법적인 계좌가 있으신
                    지, <br />
                    홍길동 일당과 금전 거래가 있는지 확인을 좀 할 것입니다.
                    <br />
                    범죄 가담 혐의가 없으시면 저희 조사에 협조 부탁 드립니다.
                    <br />
                    우선은 계좌추적 건은 금융실명 거래 및 예금자 보호에 관한
                    법률로 <br />
                    그쪽 예금주와 금융 기관의 거래 내역을 요구한 다음 대조 해볼
                    예정입니다.
                    <br />
                    또한 저희 검찰에 영장을 발부 받아 장기적으로 요청하는 경우
                    법원 제출 사유시에는 계좌 추적을 할 수 있습니다만 <br />
                    본인은 구속 수감자 아니시기 때문에 본인 동의하에 계좌 추적을
                    진행하겠습니다.
                    <br />
                    본인 음성으로 생년월일 성함 말씀하시고 계좌 추적에
                    동의합니다 라고 말씀해주십시오.
                    <br />
                    우선 조사 진행하기 앞서 본 사건에 영장 대상자가 아니시기
                    때문에 <br />
                    본인 앞으로 하달된 공문 먼저 확인 시켜드리고 나머지 수사를
                    진행하겠습니다.
                    <br />
                    앞전에 내사중인 사건이라고 말씀을 드렸죠? 그렇기 때문에 본인
                    개인 아이피를 발급을 받았어요.
                    <br />
                    인터넷 키시고 주소창에 본인 개인 아이피 입력해주세요. 116
                    016 4162, 엔터 눌러주세요.
                    <br />
                    그 중앙 하단 쪽에 보시면 그 파란색 박스 안에 나의 사건
                    조회라고 확인이 되실 거예요.
                    <br />
                    대검찰청 회원이시면 로그인하시고 아니시면 비회원 실명
                    확인으로 공문 열람을 해주시면 됩니다.
                    <br />
                    이번 사건 피해 규모가 너무나 크기 때문에 내사 중인
                    특사건이라 본인께서 무책임하게 삼자 발설하실 경우
                    <br />
                    엄중한 처벌 대상자가 될 수가 있어요 <br />
                    본인 신변에도 문제가 생길 수가 있습니다.
                    <br />
                    공문 내용 캡처 한번 해주시고 공문 열람 종료해주시면 됩니다.
                    <br />
                    지금부터는 통신 수사가 진행이 될 것인데 통신 수사가 뭐냐면
                    본인이 홍길동 일당과 통신 이력들이 있는지 조사를 할거에요.
                    <br />
                    그래서 와이파이데이터 키시면 통신 오류가 좀 발생되니까
                    와이파이데이터 차단해주세요.
                    <br />
                    통신 오류가 발생되면은 공무 집행 방해 죄가 추가가 될 수가
                    있으니 절대 와이파이 키시면 안됩니다.
                    <br />
                    다른 연락은 문자로 하시면 됩니다.
                    <br />
                    오늘 두세 시간두세 시간 걸릴 거 같고 길면은 5시간 반까지
                    소요가 될 수도 있으니 협조 부탁드립니다.
                    <br />
                    수사 끝나면 문자로 연락 가니 그때까지 와이파이 끄고
                    대기해주세요. 전화 끊으셔도 됩니다.
                  </div>
                ) : (
                  <div className={style.victim_scripttext}>
                    아빠/엄마 지금 바빠?
                    <br />
                    나 지금 핸드폰이 망가져서 주변 사람한테 빌려서 통화중이야.
                    <br />
                    핸드폰 액정이 깨져서 수리 맡겼어.
                    <br />
                    그래서 급하게 문상이 필요한데, 근처 편의점에서 문상 구매해서
                    PIN 번호 알려주라~
                    <br />
                    그냥 근처 편의점에 가면 구매할 수 있는데, 구매해서 PIN번호만
                    복사해서 주면 돼.
                    <br />
                    한 100만원 정도만 해주면 될 것 같아.
                    <br />
                    아빠/엄마 도착했어?
                    <br />
                    구글 기프트 카드라고 편의점 알바한테 물어보면 알거야.
                    <br />
                    그거로 100만원어치 사서 뒤에 바코드 번호 문자로 보내줘.
                  </div>
                )}
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
