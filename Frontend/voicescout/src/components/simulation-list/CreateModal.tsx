import React, { Dispatch, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./CreateModal.module.css";
import Acquaintance from "img/type_acquaintance.png";
import Agency from "img/type_agency.png";
import Loans from "img/type_loans.png";
import { isDisabled } from "@testing-library/user-event/dist/utils";

interface modal_type {
  setIsModal: Dispatch<boolean>;
}

export default function CreateModal({ setIsModal }: modal_type) {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>();
  const [locked, setLocked] = useState<boolean>(false);
  const [password, setPassword] = useState<string>();
  const [type, setType] = useState<number>();

  const onTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
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
            onChange={onTitle}
          />
        </div>
        <div className={style.passwd_grid}>
          <div></div>
          <input type="checkbox" onChange={() => setLocked(!locked)} />
          <p>비공개</p>
          <input
            className={!locked ? style.locked : style.unlocked}
            type="password"
            name="password"
            placeholder="비밀번호"
            disabled={!locked ? true : false}
          />
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
              navigate("/simulation-room", { state: {} });
            }}
          >
            확인
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
