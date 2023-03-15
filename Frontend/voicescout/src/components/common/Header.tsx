import React from "react";
import style from "./Header.module.css";
import logo from "img/logo_icon_with_name.png";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className={style.header}>
      <div className={style.inner_header}>
        <div>
          <img className={style.logo} src={logo} alt="" />
        </div>
        <div className={style.menu_list}>
          <span className={style.menu}>범죄 수단 및 예방</span>
          <span className={style.menu}>통화 체험실</span>
          <span className={style.menu}>O/X 퀴즈</span>
        </div>
      </div>
    </div>
  );
}
