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
  passwordInput: string | undefined;
  typeIdInput: number;
  participantInput: number;
  linkInput: string;
}

export default function UpdataModal({
  setIsModal,
  seqInput,
  titleInput,
  lockedInput,
  passwordInput,
  typeIdInput,
  participantInput,
  linkInput,
}: modal_type) {
  const navigate = useNavigate();

  const [seq, setSeq] = useState<number>(seqInput);
  const [title, setTitle] = useState<string>(titleInput);
  const [password, setPassword] = useState<string | undefined>(passwordInput);
  const [typeId, setTypeId] = useState<number>(typeIdInput);
  const [link, setLink] = useState<string>(linkInput);
  const [participant, setParticipant] = useState<number>(participantInput);
  const [locked, setLocked] = useState<boolean>(lockedInput);

  interface updateData_type {
    seq: number;
    title: string;
    password: string | undefined;
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
      window.location.replace(`/simulation-room/${updateData.link}`);
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
    onChange();
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
              onClick={() => setTypeId(0)}
            />
            <p>대출 사칭형</p>
          </div>
          <div>
            <img
              className={typeId === 1 ? style.img_selected : style.img}
              src={Agency}
              alt=""
              onClick={() => setTypeId(1)}
            />
            <p>기관 사칭형</p>
          </div>
          <div>
            <img
              className={typeId === 2 ? style.img_selected : style.img}
              src={Acquaintance}
              alt=""
              onClick={() => setTypeId(2)}
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
