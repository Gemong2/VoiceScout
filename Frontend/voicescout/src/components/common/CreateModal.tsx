import React, { Dispatch, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { $ } from "util/axios";
import { v4 as uuidv4 } from "uuid";
import style from "./CreateModal.module.css";
import Acquaintance from "img/type_acquaintance.png";
import Agency from "img/type_agency.png";
import Loans from "img/type_loans.png";

interface modal_type {
  setIsModal: Dispatch<boolean>;
  seqInput: number;
  titleInput: string;
  lockedInput: boolean;
  passwordInput: string;
  typeIdInput: number;
  createInput: boolean;
  participantInput: number;
  linkInput: string;
}

export default function CreateModal({
  setIsModal,
  seqInput,
  titleInput,
  lockedInput,
  passwordInput,
  typeIdInput,
  participantInput,
  linkInput,
  createInput,
}: modal_type) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [seq, setSeq] = useState<number>(seqInput);
  const [title, setTitle] = useState<string>(titleInput);
  const [password, setPassword] = useState<string>(passwordInput);
  const [typeId, setType] = useState<number>(typeIdInput);
  const [link, setLink] = useState<string>(linkInput);
  const [participant, setParticipant] = useState<number>(participantInput);
  const [locked, setLocked] = useState<boolean>(lockedInput);
  const roomLink = uuidv4();

  // 방 생성시 사용하는 데이터 타입

  interface newData_type {
    title: string;
    password: string;
    typeId: number;
    link: string | undefined;
    participant: number;
    locked: boolean;
  }

  const newData: newData_type = {
    title: title,
    password: password,
    typeId: typeId,
    link: roomLink,
    participant: 1,
    locked: locked,
  };

  // 방 수정 시 사용하는 데이터 타입

  interface updateData_type {
    seq: number;
    title: string;
    password: string;
    typeId: number;
    participant: number;
    link: string | undefined;
    locked: boolean;
  }

  const updateData: updateData_type = {
    seq: seq,
    title: title,
    password: password,
    typeId: typeId,
    participant: participant,
    link: link,
    locked: locked,
  };

  const onTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 방 수정 시 사용되는 API 함수
  const res_put = () => {
    return $.put(`/rooms`, updateData);
  };

  const { mutate: onChange } = useMutation(res_put, {
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "",
        text: "수정되었습니다.",
        confirmButtonText: "닫기",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "",
        text: "실패했습니다.",
        confirmButtonText: "닫기",
      });
    },
  });

  const res_post = () => $.post(`/rooms`, newData);
  const { mutate: onCreate } = useMutation(res_post, {
    onSuccess: (data) => {
      // 방 생성관련 API 통신 성공 시 해당 방에 대한 데이터를 불러와서
      //navigate를 통해 state 데이터 전송하는 코드
      navigate(`/simulation-room/${data.data.link}`, {
        state: {
          seq: data.data.seq,
          title: data.data.title,
          password: data.data.password,
          typeId: data.data.typeId,
          link: data.data.link,
          participant: data.data.participant,
          locked: data.data.locked,
        },
      });
    },

    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "",
        text: "실패했습니다.",
        confirmButtonText: "닫기",
      });
      console.log(err);
    },
  });

  const isValid = () => {
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
    if (typeof typeId !== "number") {
      alert("방의 유형을 선택해야 합니다.");
      return;
    }
    if (createInput) {
      onCreate();
    } else {
      onChange();
    }
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
              className={typeId === 0 ? style.img_selected : style.img}
              src={Loans}
              alt=""
              onClick={() => setType(0)}
            />
            <p>대출 사칭형</p>
          </div>
          <div>
            <img
              className={typeId === 1 ? style.img_selected : style.img}
              src={Agency}
              alt=""
              onClick={() => setType(1)}
            />
            <p>기관 사칭형</p>
          </div>
          <div>
            <img
              className={typeId === 2 ? style.img_selected : style.img}
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
              isValid();
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
