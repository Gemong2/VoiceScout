import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Header.module.css";
import logo from "img/logo_icon_with_name.png";

type Props = {};

export default function Header({}: Props) {
  const navigate = useNavigate();

  return (
    <div className={style.header}>
      <div className={style.inner_header}>
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          <img className={style.logo} src={logo} alt="" />
        </div>
        <div className={style.menu_list}>
          <div
            onClick={() => {
              navigate("/crime-type");
            }}
          >
            <span className={style.menu}>범죄 수단 및 예방</span>
          </div>
          <div
            onClick={() => {
              navigate("/call-room");
            }}
          >
            <span className={style.menu}>통화 체험실</span>
          </div>
          <div
            onClick={() => {
              navigate("/quiz");
            }}
          >
            <span className={style.menu}>O/X 퀴즈</span>
          </div>
        </div>
      </div>
    </div>
  );
}
