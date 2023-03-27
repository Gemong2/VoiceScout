import React, { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import style from "./CreateModal.module.css";
import Acquaintance from "img/type_acquaintance.png";
import Agency from "img/type_agency.png";
import Loans from "img/type_loans.png";

interface modal_type {
  setIsModal: Dispatch<boolean>;
}

export default function CreateModal({ setIsModal }: modal_type) {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.modal_header}>방 만들기</div>
      <div className={style.modal_contents}>
        <div className={style.title}>
          <input type="text" name="title" placeholder="방 제목" />
        </div>
        <div className={style.passwd_grid}>
          <div></div>
          <input type="checkbox" />
          <p>비공개</p>
          <input type="password" name="password" placeholder="비밀번호" />
        </div>
        <div className={style.room_type}>
          <div>
            <img src={Loans} alt="" />
            <p>대출 사칭형</p>
          </div>
          <div>
            <img src={Agency} alt="" />
            <p>기관 사칭형</p>
          </div>
          <div>
            <img src={Acquaintance} alt="" />
            <p>지인 사칭형</p>
          </div>
        </div>
        <div className={style.btn_div}>
          <button
            onClick={() => {
              navigate("/simulation-room");
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
