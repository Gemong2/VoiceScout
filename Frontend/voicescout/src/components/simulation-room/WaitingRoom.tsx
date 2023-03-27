import React from "react";
import style from "./WaitingRoom.module.css";
import Agency from "img/type_agency.png";

export default function WaitingRoom() {
  return (
    <>
      <div className={style.header}>보이스 피싱 실전 대비반</div>
      <div className={style.header_guide}>역할을 선택하십시오</div>
      <div className={style.contents}>
        <img className={style.contents_first} src={Agency} alt="" />
        <div className={style.contents_second}>
          <p>대출 사칭형</p>
          <select name="is_public" id="">
            <option value="true">공개</option>
            <option value="false">비공개</option>
          </select>
        </div>
        <div className={style.contents_third}></div>
        <div className={style.contents_fourth}></div>
      </div>
    </>
  );
}
