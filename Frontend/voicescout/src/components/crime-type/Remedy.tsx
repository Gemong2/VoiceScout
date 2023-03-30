import React from 'react'
import { useState, useRef, useEffect } from "react";
import style from "./Remedy.module.css";
import image1 from "img/vp_save_process.png";


export default function Remedy() {
  return (
    <div className={style.container}>
      <div className={style.notice}>※ 지급정지(금융회사) → 채권소멸절차(금감원·금융회사) → 전자금융거래 제한 및 피해금 환급(금감원)</div>
      <div className={style.remedy_box}>
        <br />
        <img className={style.img_size} src={image1} alt="image1" />
        <table>
          <thead>
            <tr>
              <th>절차</th>
              <th>내용</th>
              <th>근거법령</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>① 지급정지 및 피해구제 요청</td>
              <td>보이스피싱 피해자가 사기범에게 자금을 이체한 계좌(사기계좌)에 대한 지급정지(입출금·이체 금지)요청 및 피해구제 신청</td>
              <td>통신사기피해환급법(이하 '법') §3①</td>
            </tr>
            <tr>
              <td>② 지급정지</td>
              <td>	금융회사가 보이스피싱 사기이용계좌에 대한 지급정지 실시(입출금·이체 금지)</td>
              <td>법 §4①</td>
            </tr>
            <tr>
              <td>③ 지급정지 통보</td>
              <td>금융회사가 금감원, 명의인, 피해자 등에게 지급정지 사실을 통보</td>
              <td>법 §4②</td>
            </tr>
            <tr>
              <td>④ 채권소멸절차 개시 요청</td>
              <td>금융회사가 금감원에 사기이용계좌 명의인의 예금채권을 소멸하기 위한 절차 개시 공고 요청</td>
              <td>법 §5①</td>
            </tr>
            <tr>
              <td>⑤ 전자금융거래 제한</td>
              <td>금감원이 ③에 따라 통보받은 명의인을 전자금융거래 제한 대상자로 지정</td>
              <td>법 §13의2</td>
            </tr>
            <tr>
              <td>⑥ 채권소멸절차</td>
              <td><tr>④의 요청에 따라, 금감원이 채권소멸절차가 개시된 사실을 공고</tr><tr>(이의제기 등 없을시) 2개월 후 예금채권 소멸</tr></td>
              <td>법 §9①</td>
            </tr>
            <tr>
              <td>⑦ 피해금 환급</td>
              <td>채권소멸 후 금감원이 14일 내 피해환급금을 산정하여 피해금 환급 결정 → 금융회사를 통해 피해금 환급</td>
              <td>법 §10①</td>
            </tr>
            <tr>
              <td>⑧ 전자금융거래 제한 종료</td>
              <td>피해금 환급 지급이 종료된 경우 전자금융거래 제한 종료</td>
              <td>법 §8①</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
