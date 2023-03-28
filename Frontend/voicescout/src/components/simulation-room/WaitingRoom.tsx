import React from "react";
import style from "./WaitingRoom.module.css";
import Agency from "img/type_agency.png";
import Victim from "img/victim.png";
import Criminal from "img/criminal.png";
import Mike from "img/mike.png";
import Headset from "img/headset.png";

export default function WaitingRoom() {
  interface data_type {
    seq: number;
    title: string;
    type: string;
    describe: string;
    img: string;
    count: number;
    locked: boolean;
    password: string | null;
  }

  const data: data_type[] = [
    {
      seq: 0,
      title: `1번 체험방`,
      type: `수사기관 사칭형`,
      describe: `수사기관을 사칭하여 피해자를 기망하여
       금전 편취하는 사기 수법`,
      img: Agency,
      count: 1,
      locked: false,
      password: null,
    },
  ];
  return (
    <>
      <div className={style.header}>{data[0].title}</div>
      <div className={style.header_guide}>역할을 선택하십시오</div>
      <div className={style.contents}>
        <img className={style.contents_first} src={data[0].img} alt="" />
        <div className={style.contents_second}>
          <p>{data[0].type}</p>
          <div className={style.locked}>
            {data[0].locked ? <span>비공개</span> : <span>공개</span>}
          </div>
        </div>
        <div className={style.contents_third}>{data[0].describe}</div>
      </div>
      <div className={style.information}>
        <div className={style.blank}></div>
        <img className={style.main_img} src={Victim} alt="" />
        <img className={style.sub_img} src={Criminal} alt="" />
        <div className={style.roles}>
          <div className={style.main_role}>피해자</div>
          <div className={style.sub_role}>피싱범</div>
        </div>
        <div className={style.settings}>
          <img src={Mike} alt="" />
          <img src={Headset} alt="" />
        </div>
      </div>
    </>
  );
}
