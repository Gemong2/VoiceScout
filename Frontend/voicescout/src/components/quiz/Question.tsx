import React, { useState } from "react";
import style from "./Question.module.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Gauge = styled.div<{ number: Number }>`
  margin-top: 20px;
  width: 700px;
  height: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px #a9a8a8;
  background: linear-gradient(
    to right,
    #f7b52c ${(props) => `${props.number}%`},
    #cccccc ${(props) => `${props.number}%`}
  );
`;

export default function Question() {
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);
  const [isQuiz, setIsQuiz] = useState(true);

  interface questionType {
    id: number;
    text: string;
  }

  interface answerType {
    id: number;
    answer: string;
    text: string;
  }

  const question_data: questionType[] = [
    {
      id: 1,
      text: `Q. 보이스피싱을 당한 경우,
      사기이용계좌의 지급정지는
      112로 신고해야 한다?`,
    },
    {
      id: 2,
      text: `Q. 타인에게 현금을
      인출 또는 이체할 수 있는 수단을
      대여 또는 양도해도 된다?`,
    },
    {
      id: 3,
      text: `Q. 출처가 불분명한 문자 메시지의
      인터넷 주소(URL), 어플리케이션
      다운로드를 클릭해도 된다?`,
    },
    {
      id: 4,
      text: `Q. 전화, 문자 등으로 대출권유를
      받은 경우, 제도권 금융회사 여부를
      확인할 수 있다?`,
    },
    {
      id: 5,
      text: `Q. 100만원 이상 송금받은 계좌에 한해
      30분간 ATM에서 출금 및 이체가 정지된다?`,
    },
    {
      id: 6,
      text: `Q. 보이스피싱 예방을 위해 운영하는
      '보이스피싱 지킴이'는 경찰청 홈페이지에서
      확인할 수 있다?`,
    },
    {
      id: 7,
      text: `Q. '당신의 계좌가 범죄에 연루되어 있습니다.
      아래 URL 링크를 클릭하여 보안앱을 설치하세요'
      http:/www.****** 클릭하시겠습니까?`,
    },
    {
      id: 8,
      text: `Q. 고수익 아르바이트라고 속아서 현금(보이스피싱 피해금)을
      단순히 인출/전달한 경우에는 실형을 받지 않는다?`,
    },
    {
      id: 9,
      text: `Q. 실시간으로 발신자를 식별하여 보이스피싱
      의심전화 번호를 감지하는 어플은
      현재 개발중에 있다?`,
    },
    {
      id: 10,
      text: `Q. 보이스피싱 피해 금액이 가장 높은 연령층은
      40-50대이다?`,
    },
  ];
  const answer_data: answerType[] = [
    {
      id: 1,
      answer: "O",
      text: `보이스피싱을 당한 경우
      사기이용계좌의 지급정지 및 피해신고는
      국번없이 112(경찰청)으로 신속히 신고하세요!`,
    },
    {
      id: 2,
      answer: "X",
      text: `타인에게 현금 인출 또는 이체할 수 있는 수단을 대여 또는 양도해서는 안됩니다.
      통장, 체크카드의 양도와 대여 모두 불법으로,
      대여해 준 사람도 각종 범죄에 연루될 수 있어요!`,
    },
    {
      id: 3,
      answer: "X",
      text: `택배 사칭 등을 통해 악성코드가 포함된 문자를발송하고,
      URL을 누르면 악성코드가 설치되는 피해사례가 늘고있습니다.
      출처가 불분명한 메시지는 바로 삭제하세요!`,
    },
    {
      id: 4,
      answer: "O",
      text: `전화, 문자 등으로 대출 권유를 받는 경우 금융소비자정보포털 파인에서
      제도권 금융회사 여부를 확인할 수 있습니다.
      단, 보이스피싱 의심시 유선전화를 통해 해당기관에 사실 여부를 꼭 확인하세요!`,
    },
    {
      id: 5,
      answer: "O",
      text: `지연 이체 및 인출제도란 100만원 이상 송금받은
      계좌에 한해 30분간 ATM에서 출금 및 이체를 정지하는 제도입니다.
      소비자가 보이스피싱에 속아 돈을 보내게 된 경우 조직이 돈을 빠르게
      찾지 못하게 하고자 마련된 방책이죠!`,
    },
    {
      id: 6,
      answer: "X",
      text: `보이스피싱 예방을 위하여 운영하는 시스템으로
      '보이스피싱 지킴이'는 금융감독원에서
      사이버범죄 및 인터넷 사기 예방을 위하여 운영하는 시스템인
      '사이버 안전 지킴이'는 경찰청에서 관리 운영되고 있어요`,
    },
    {
      id: 7,
      answer: "X",
      text: `최근 저금리 대출을 빌미로 원격조정 앱 설치를 유도하여
      악성 코드를 심은 뒤 보이스피싱 조직의 금융계좌로 입금을 유도하는
      수법이 증가하고 있습니다.
      절대 앱 설치를 유도 혹은 URL 링크가 첨부퇸 메시지를 누르지 마세요!`,
    },
    {
      id: 8,
      answer: "X",
      text: `구인구직 사이트에서 정상적인 회사처럼 광고하여 취준생을 고용한 뒤
      '수금책'으로 활용하는 사례가 증가하고 있습니다.
      '현금을 인출(전달)해달라', '통장(카드)를 달라'고 요구하는 경우
      100% 보이스피싱이며 이에 가담한 사람은 형사처벌을 받게 되요!`,
    },
    {
      id: 9,
      answer: "X",
      text: `통화내용을 분석해 축적된 보이스피싱 사례와 문맥, 단어를 대조해
      보이스피싱 위험도를 판별하는 'IBK 피싱스톱' 어플과
      스팸전화 등 악성 전화번호를 실시간 업데이트 및 관리하여
      사전에 보이스피싱 전화번호를 필터링하는 '후후'어플을 즉시 사용할 수 있어요`,
    },
    {
      id: 10,
      answer: "O",
      text: `21년 기준 연력별 피해금액은
      40-50대: 873억원, 60대: 614억원,
      20-30대: 173억원, 20대미만 0.4억원으로 조사되었습니다.
      연령대별로 차이가 있지만 모든 연령대가 보이스피싱의 피해자가 될 수 있어요`,
    },
  ];

  return (
    <>
      {number >= 10 && (
        <>
          <div className={style.end_contents_top}></div>
          <div className={style.end_contents_box}>
            <div className={style.end_text}>
              문제를 모두 풀었습니다. <br />
              더 많은 정보를 공부하려면 <br />
              상단에 범죄 수단 및 예방 탭을, <br />
              보이스피싱 모의체험은 통화 체험실 탭을 <br />
              클릭해주세요!
            </div>
          </div>
        </>
      )}
      {isQuiz && number < 10 && (
        <>
          <div className={style.top_text}>
            나는 보이스 피싱에 얼마나 취약할까?
          </div>
          <div className={style.contents_title}>
            보이스 피싱 자가진단 O/X 퀴즈
          </div>
          <div className={style.question_box}>
            <div className={style.question_number}>{number + 1}/10</div>
            <Gauge number={(number + 1) * 10} />
            <div className={style.quetion_text}>
              {question_data[number].text}
            </div>
            <div className={style.true_false}>
              <div
                className={style.option}
                onClick={() => {
                  setIsQuiz(false);
                }}
              >
                O
              </div>
              <div
                className={style.option}
                onClick={() => {
                  setIsQuiz(false);
                }}
              >
                X
              </div>
            </div>
          </div>
        </>
      )}
      {!isQuiz && number < 10 && (
        <>
          <div className={style.answer_contents_title}>정답</div>
          <div className={style.answer_contents_box}>
            <div className={style.answer_box_grid}>
              <div className={style.blank} />
              <div className={style.answer_box}>
                <div className={style.answer_option}>
                  {answer_data[number].answer}
                </div>
              </div>
              <div className={style.blank} />
            </div>
            <div className={style.answer_text}>{answer_data[number].text}</div>
            <div className={style.btn_div}>
              <button
                className={style.start_btn}
                onClick={() => {
                  setNumber(number + 1);
                  setIsQuiz(true);
                }}
              >
                다음
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
