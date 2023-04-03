import React from 'react'
import style from './CriminalLetterModal.module.css';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    // onRequestClose?: () => void; // onRequestClose 프로퍼티 추가
    children: React.ReactNode;
  }

export default function CriminalLetterModal({
    isOpen,
    onClose,
    children,
}: ModalProps) {
  return (
    <div className={style.modal_square} style={{ display: isOpen ? 'block' : 'none' }}>
            <div className={style.modal_line}>
              <div className={style.modal_text}>상세 내용</div>
              <button className={style.close} onClick={onClose}>
              X
              </button>
            </div>
        <div className={style.modalsize}>
            <div className={style.modal_img}>{children}</div>
        </div>
    </div>
  );
}