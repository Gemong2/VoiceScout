import React, { useState } from "react";
import style from "./RoomList.module.css";
import Acquaintance from "img/type_acquaintance.png";
import Agency from "img/type_agency.png";
import Loans from "img/type_loans.png";
import CreateModal from "components/common/CreateModal";

export default function RoomList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModal, setIsModal] = useState(false);
  const info = [
    {
      type: `수사기관 사칭형`,
      describe: `수사기관을 사칭하여 피해자를 기망하여
       금전 편취하는 사기 수법`,
      img: Agency,
    },
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
    type: number;
    count: number;
    locked: boolean;
    password: string | null;
  }

  const datas: data_type[] = [
    {
      seq: 0,
      title: `1번 체험방`,
      type: 0,
      count: 1,
      locked: false,
      password: null,
    },
    {
      seq: 1,
      title: `2번 체험방`,
      type: 1,
      count: 2,
      locked: true,
      password: "1234",
    },
    {
      seq: 2,
      title: `3번 체험방`,
      type: 2,
      count: 1,
      locked: false,
      password: null,
    },
    {
      seq: 3,
      title: `4번 체험방`,
      type: 0,
      count: 2,
      locked: false,
      password: null,
    },
    {
      seq: 4,
      title: `5번 체험방`,
      type: 1,
      count: 1,
      locked: false,
      password: null,
    },
    {
      seq: 5,
      title: `6번 체험방`,
      type: 2,
      count: 2,
      locked: true,
      password: "1234",
    },
    {
      seq: 6,
      title: `7번 체험방`,
      type: 0,
      count: 1,
      locked: true,
      password: "1234",
    },
    {
      seq: 7,
      title: `8번 체험방`,
      type: 1,
      count: 1,
      locked: false,
      password: null,
    },
    {
      seq: 8,
      title: `9번 체험방`,
      type: 2,
      count: 1,
      locked: true,
      password: "1234",
    },
    {
      seq: 9,
      title: `10번 체험방`,
      type: 0,
      count: 2,
      locked: false,
      password: null,
    },
    {
      seq: 10,
      title: `11번 체험방`,
      type: 1,
      count: 1,
      locked: false,
      password: null,
    },
    {
      seq: 11,
      title: `12번 체험방`,
      type: 2,
      count: 2,
      locked: true,
      password: "1234",
    },
  ];
  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.room_list}>
            {!isLoading &&
              datas.map((data) => {
                return (
                  <div key={data.seq}>
                    <div className={style.room_container}>
                      <div className={style.room_title}>{data.title}</div>
                      <div className={style.room_main}>
                        <img
                          className={style.main_img}
                          src={info[data.type].img}
                          alt=""
                        ></img>
                        <div className={style.main_contents}>
                          <h2>{info[data.type].type}</h2>
                          <span>{info[data.type].describe}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
          {isModal && (
            <CreateModal
              setIsModal={setIsModal}
              titleInput=""
              lockedInput={false}
              passwordInput=""
              typeInput={0}
            />
          )}
        </div>
      </div>
    </>
  );
}
