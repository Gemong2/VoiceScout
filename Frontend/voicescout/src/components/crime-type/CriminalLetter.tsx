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


  // 모달창 노출
  const showModal = () => {
      setModalOpen(true);
  };
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (imageSrc: string) => {
    setModalContent(<img src={imageSrc} alt="modal-image" />);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  // const [buttonState, setButtonState] = useState(0);
  // const buttonTab = (index:number) => {
  //   setButtonState(index);
  // }
  // const Button_One = () => {
  //   return (
  //     <div className={style.modal_square}>
  //       <div className={style.modal_text}>상세 내용</div>
  //       <div className={style.modalsize}>
  //         <img className={style.modal_img} src={buttonone} alt="buttonone" />
  //       </div>
  //     </div>
  //   )
  // }
  // const Button_Two = () => {
  //   return (
  //     <div className={style.modal_square}>
  //       <div className={style.modalsize}>
  //       <img className={style.modal_img} src={buttontwo} alt="buttontwo" />
  //       </div>
  //     </div>
  //   )
  // }
  // const Button_Three = () => {
  //   return (
  //     <div className={style.modal_square}>
  //       <div className={style.modalsize}>
  //       <img className={style.modal_img} src={buttonthree} alt="buttonthree" />
  //       </div>
  //     </div>
  //   )
  // }
  // const Button_Four = () => {
  //   return (
  //     <div className={style.modal_square}>
  //       <div className={style.modalsize}>
  //       <img className={style.modal_img} src={buttonfour} alt="buttonfour" />
  //       </div>
  //     </div>
  //   )
  // }
  // const Button_Five = () => {
  //   return (
  //     <div className={style.modal_square}>
  //       <div className={style.modalsize}>
  //       <img className={style.modal_img} src={buttonfive} alt="buttonfive" />
  //       </div>
  //     </div>
  //   )
  // }
  // const Button_Six = () => {
  //   return (
  //     <div className={style.modal_square}>
  //       <div className={style.modalsize}>
  //       <img className={style.modal_img} src={buttonsix} alt="buttonsix" />
  //       </div>
  //     </div>
  //   )
  // }
  let content;

  // if (buttonState === 1 ) content = <Button_One />
  // else if (buttonState === 2) content = <Button_Two />
  // else if (buttonState === 3) content = <Button_Three />
  // else if (buttonState === 4) content = <Button_Four />
  // else if (buttonState === 5) content = <Button_Five />
  // else if (buttonState === 6) content = <Button_Six />

  

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
          <div className={style.textbox}>아래 항목을 클릭해서 상세 문자내용을 확인해보세요
            </div>
          </div>
        </div>
        <div className={style.square}>
          <div ref={scrollRef} className={style.square_rule}>
          <button onClick={() => handleButtonClick("img/button_one.jpg")}>대출사기문자</button>
            </div>
            {modalOpen && <CriminalLetterModal setModalOpen={setModalOpen} content={content} />}
      </div>      
    </div>
  )
}

{/* <button className={buttonState === 2 ? style.tabbutton_on + " " + style.tabbutton: style.tabbutton} onClick={() => buttonTab(2)}>물품결제문자</button>
<button className={buttonState === 3 ? style.tabbutton_on + " " + style.tabbutton: style.tabbutton} onClick={() => buttonTab(3)}>생계지원대출</button>
<button className={buttonState === 4 ? style.tabbutton_on + " " + style.tabbutton: style.tabbutton} onClick={() => buttonTab(4)}>정부지원<br />대환대출</button>
<button className={buttonState === 5 ? style.tabbutton_on + " " + style.tabbutton: style.tabbutton} onClick={() => buttonTab(5)}>긴급재난<br />지원대출</button>
<button className={buttonState === 6 ? style.tabbutton_on + " " + style.tabbutton: style.tabbutton} onClick={() => buttonTab(6)}>대출사기형</button> 
<div>{content}</div>
<button onClick={showModal}>모달 띄우기</button>
{modalOpen && <CriminalLetterModal setModalOpen={setModalOpen} content={content} /> */}