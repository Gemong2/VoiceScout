import React from "react";
import style from "./Main.module.css";
import Phone from "img/phone.png";
import Logo from "img/logo.png";

export default function Main() {
  return (
    <div className={style.main_theme}>
      <div className={style.main_contents}>
        <div>
          <img className={style.phone_img} src={Phone} alt="" />
        </div>
        <div>
          <div>
            <img className={style.logo_img} src={Logo} alt="" />
          </div>
          <div className={style.main_text}>
            <span className={style.keyword}>보이스피싱</span>
            <br />
            <span>아는 만큼 예방할 수 있습니다.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
