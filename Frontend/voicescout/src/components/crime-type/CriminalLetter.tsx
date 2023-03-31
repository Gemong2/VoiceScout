import React from 'react'
import { useState, useRef, useEffect } from "react";
import style from "./CriminalLetter.module.css";
import guide from "img/guide.png";
import buttonone from "img/button_one.jpg";
import buttontwo from "img/button_two.jpg";
import buttonthree from "img/button_three.jpg";
import buttonfour from "img/button_four.jpg";
import buttonfive from "img/button_five.jpg";
import buttonsix from "img/button_six.jpg";
import CriminalLetterModal from './CriminalLetterModal';


export default function CriminalLetter() {

  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [content, setContent] = useState<string>("");

  // 모달창 노출
  const showModal = () => {
      setModalOpen(true);
  };
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (imageSrc: string) => {
    setModalContent(<img className={style.modal_img} src={imageSrc} alt="modal-image" />);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
    <div className={style.container}>
      <div className={style.wrap}>
        <img className={style.img_size} src={guide} alt="guide" />
        <div className={style.chat +" "+ style.ch1}>
          <div className={style.textbox}>아래 항목을 클릭해서 상세 문자내용을 확인해보세요</div>
          </div>
        </div>
        <div className={style.square}>
        <div ref={scrollRef} className={style.square_rule}>
          <button className={style.tabbutton +" "+ style.tabbutton_on} onClick={() => handleButtonClick(buttonone)}>대출사기문자</button>
          <button className={style.tabbutton +" "+ style.tabbutton_on} onClick={() => handleButtonClick(buttontwo)}>물품결제문자</button>
          <button className={style.tabbutton +" "+ style.tabbutton_on} onClick={() => handleButtonClick(buttonthree)}>생계지원대출</button>
          <button className={style.tabbutton +" "+ style.tabbutton_on} onClick={() => handleButtonClick(buttonfour)}>정부지원대환대출</button>
          <button className={style.tabbutton +" "+ style.tabbutton_on} onClick={() => handleButtonClick(buttonfive)}>긴급재난지원대출</button>
          <button className={style.tabbutton +" "+ style.tabbutton_on} onClick={() => handleButtonClick(buttonsix)}>대출사기문자</button>
        </div>
      </div>  
      {modalOpen && (
          <CriminalLetterModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {modalContent}
        </CriminalLetterModal>
        )}    
    </div>
  )
}