import React, { Dispatch, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./CreateModal.module.css";
import Acquaintance from "img/type_acquaintance.png";
import Agency from "img/type_agency.png";
import Loans from "img/type_loans.png";

interface modal_type {
  setIsModal: Dispatch<boolean>;
  titleInput: string;
  lockedInput: boolean;
  passwordInput: string;
  typeInput: number;
}

export default function CreateModal({
  setIsModal,
  titleInput,
  lockedInput,
  passwordInput,
  typeInput,
}: modal_type) {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>(titleInput);
  const [locked, setLocked] = useState<boolean>(lockedInput);
  const [password, setPassword] = useState<string>(passwordInput);
  const [type, setType] = useState<number>(typeInput);

  const onTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onCreate = () => {
    // 유효성 검사
    if (
      !(typeof title === "string" && title.length >= 2 && title.length <= 15)
    ) {
      alert("방제는 2자 이상 15자 이하로 작성해야 합니다.");
      return;
    }
    if (
      locked &&
      !(
        typeof password === "string" &&
        password.length >= 2 &&
        title.length <= 10
      )
    ) {
      alert("비밀번호는 2자 이상 10자 이하로 작성해야 합니다.");
      return;
    }
    if (typeof type !== "number") {
      alert("방의 유형을 선택해야 합니다.");
      return;
    }
    navigate(`/simulation-room/${0}`, {
      state: {
        title: title,
        locked: locked,
        password: password,
        type: type,
      },
    });
  };

  return (
    <div className={style.container}>
      <div className={style.modal_header}>방 만들기</div>
      <div className={style.modal_contents}>
        <div className={style.title}>
          <input
            type="text"
            name="title"
            placeholder="방 제목"
            value={title}
            onChange={(e) => {
              onTitle(e);
            }}
          />
          <div className={style.title_check}>2~15자로 작성해주세요.</div>
        </div>
        <div className={style.passwd_grid}>
          <div></div>
          <input
            type="checkbox"
            checked={locked}
            onChange={() => setLocked(!locked)}
          />
          <p>비공개</p>
          <div>
            <input
              className={!locked ? style.locked : style.unlocked}
              type="password"
              name="password"
              placeholder="비밀번호"
              value={password}
              disabled={!locked ? true : false}
              onChange={(e) => onPassword(e)}
            />
            {locked ? (
              <span className={style.passwd_check}>
                2 ~ 10자로 입력해주세요
              </span>
            ) : (
              <span> &nbsp;</span>
            )}
          </div>
        </div>
        <div className={style.room_type}>
          <div>
            <img
              className={type === 0 ? style.img_selected : style.img}
              src={Loans}
              alt=""
              onClick={() => setType(0)}
            />
            <p>대출 사칭형</p>
          </div>
          <div>
            <img
              className={type === 1 ? style.img_selected : style.img}
              src={Agency}
              alt=""
              onClick={() => setType(1)}
            />
            <p>기관 사칭형</p>
          </div>
          <div>
            <img
              className={type === 2 ? style.img_selected : style.img}
              src={Acquaintance}
              alt=""
              onClick={() => setType(2)}
            />
            <p>지인 사칭형</p>
          </div>
        </div>
        <div className={style.btn_div}>
          <button
            onClick={() => {
              onCreate();
              setIsModal(false);
            }}
          >
            생성
          </button>
          <button
            onClick={() => {
              setIsModal(false);
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
