import React from "react";
import style from "./Footer.module.css";
import voicescout from "img/logo_icon_with_name.png";
import ssafy from "img/ssafy.png";
import gitlab from "img/gitlab.png";
import jira from "img/jira.png";
import notion from "img/notion.png";

export default function Footer() {
  return (
    <div className={style.total}>
      <div className={style.footer}>
        <div className={style.inner_footer}>
          <div className={style.left_div}>
            <img src={voicescout} className={style.voicescout} alt="" />
            <img src={ssafy} className={style.ssafy} alt="" />
          </div>
          <div className={style.center_div}>
            <div>
              <p>SSAFY 8기 2학기 특화 프로젝트</p>
              <p>김동연 | 김정수 | 박금원 | 박서영 | 윤호산 | 조웅희</p>
            </div>
            <p>Copyright©VOICESCOUT All Rights Reserved.</p>
          </div>
          <div className={style.right_div}>
            <div className={style.ground}>
              <img src={gitlab} className={style.gitlab} alt="" />
            </div>
            <div className={style.ground} style={{ paddingTop: "10px" }}>
              <img src={jira} className={style.jira} alt="" />
            </div>
            <div className={style.ground}>
              <img src={notion} className={style.notion} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
