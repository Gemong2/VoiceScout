import React from 'react'
import { useState, useRef, useEffect } from "react";
import style from "./CrimePrevention.module.css";

export default function CrimePrevention() {

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollHandler = (e: WheelEvent) => {
      e.preventDefault();
      const container = scrollRef.current;
      if (container) {
        const containerScrollPosition = container.scrollLeft;
        container.scrollTo({
          top: 0,
          left: containerScrollPosition + e.deltaY,
        });
      }
    };
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('wheel', scrollHandler, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', scrollHandler);
      }
    };
  }, [scrollRef]);
  return (
    <div>
        <h2>십계명</h2>
        <div className={style.content_scroll}>
          <div ref={scrollRef} className={style.square_rule}>
            <div className={style.rule}>범죄 연루되었다며 자금이체 또는 현금 전달 요구 시 응하지 말 것</div>
            <div className={style.rule}>메신저로 보내는 경찰, 검찰, 금감원의 공문은 모두 가짜임을 명심할 것</div>
            <div className={style.rule}>저금리 대출 위해 기존 대출금 상환 요구 시 응하지 말 것</div>
            <div className={style.rule}>어떠한 명목이든 대출과 관련하여 선입금 요구 시 응하지 말 것</div>
            <div className={style.rule}>어떠한 경우에도 은행직원이 직접 현금을 전달받는 경우는 없음을 명심할 것</div>
            <div className={style.rule}>수사기관·금융기관의 앱 설치 요구는 무조건 무시할 것</div>
            <div className={style.rule}>출처 불명의 인터넷주소(URL)는 누르지 말고 의심부터 할 것</div>
            <div className={style.rule}>구매하지 않은 결제문자는 정식업체 여부 및 대표번호 검색해볼 것</div>
            <div className={style.rule}>문화상품권, 구글기프트카드 핀번호 요구에 절대 응하지 말 것</div>
            <div className={style.rule}>가족 부상·납치 전화 시 반드시 112신고 등 주변 도움부터 요청할 것</div>
          </div>
        </div>
    </div>
  )
}
