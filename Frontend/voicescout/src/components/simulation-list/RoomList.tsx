import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./RoomList.module.css";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { $ } from "util/axios";
import Acquaintance from "img/type_acquaintance.png";
import Agency from "img/type_agency.png";
import Loans from "img/type_loans.png";
import CreateModal from "components/common/CreateModal";
import Refresh from "img/refresh.png";
import Question from "img/question.png";
import Lock from "img/lock.png";
import UnLock from "img/unlock.png";
import { v4 as uuidv4 } from "uuid";

export default function RoomList() {
  // 토큰 생성
  sessionStorage.setItem("access-token", uuidv4());
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const info = [
    {
      type: `수사기관 사칭형`,
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

  // 고유번호, 방제, 방유형, 유형설명, 방이미지, 인원수, 잠금유무, 비밀번호(null 허용)
  interface data_type {
    seq: number;
    title: string;
    password: string | null;
    typeId: number;
    link: string;
    participant: number;
    locked: boolean;
  }

  const roomChk = (e: data_type) => {
    if (e.participant === 2) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "인원이 가득찼습니다.",
        confirmButtonText: "닫기",
      });
      return;
    }
    if (e.locked) {
      Swal.fire({
        title: "암호를 입력하세요.",
        input: "password",
        inputPlaceholder: "비밀번호입력",
      }).then((res) => {
        if (typeof res.value === "string" && res.value === e.password) {
          navigate(`/simulation-room/${e.title}`, {
            state: {
              seq: e.seq,
              title: e.title,
              password: e.password,
              link: e.link,
              locked: e.locked,
              typeId: e.typeId,
              participant: e.participant + 1,
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "",
            text: "비밀번호가 일치하지 않습니다.",
            confirmButtonText: "닫기",
          });
        }
      });
    } else {
      navigate(`/simulation-room/${e.link}`, {
        state: {
          seq: e.seq,
          title: e.title,
          password: e.password,
          link: e.link,
          locked: e.locked,
          typeId: e.typeId,
          participant: e.participant + 1,
          userType: 1,
        },
      });
      window.location.replace(`/simulation-room/${e.link}`);
    }
  };

  const { isLoading, data, refetch } = useQuery(["RoomList"], () =>
    $.get(`/rooms`)
  );

  return (
    <>
      <div className={style.container}>
        <div className={style.guide_refresh_div}>
          <img
            src={Refresh}
            alt=""
            onClick={() => {
              refetch();
            }}
          />
        </div>
        <div className={style.inner_container}>
          <div className={style.room_list}>
            {!isLoading &&
              data &&
              data.data &&
              data.data.map((content: data_type) => {
                return (
                  <div key={content.seq}>
                    <button
                      className={style.room_container}
                      onClick={() => {
                        roomChk(content);
                      }}
                      disabled={content.participant === 2 ? true : false}
                    >
                      <div className={style.room_title}>
                        <div>
                          {content.locked ? (
                            <img src={Lock} alt=""></img>
                          ) : (
                            <img src={UnLock} alt=""></img>
                          )}
                        </div>
                        <div>
                          <p>{content.title}</p>
                        </div>
                      </div>
                      <div className={style.room_main}>
                        <img
                          className={style.main_img}
                          src={info[content.typeId].img}
                          alt=""
                        ></img>
                        <div className={style.main_contents}>
                          <h2>{info[content.typeId].type}</h2>
                          <span>{info[content.typeId].describe}</span>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
          </div>
          {isModal && <CreateModal setIsModal={setIsModal} />}
        </div>
          <div className={style.btn}>
            <button
              onClick={() => {
                setIsModal(true);
              }}
            >
              방 만들기
            </button>
          </div>
      </div>
    </>
  );
}
