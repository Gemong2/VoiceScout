import React from 'react'
import style from './CriminalLetterModal.module.css';


// interface ModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onRequestClose?: () => void; // onRequestClose 프로퍼티 추가
//     children: React.ReactNode;
//   }

// export default function CriminalLetterModal(props: ModalProps) {
//   return (
//     <div className={style.modal_overlay}>
//       <div className={style.modal_content}>
//         <button className={style.close_btn} onClick={onClose || onRequestClose}>
//           <img src="/img/icon_close.png" alt="close-button" />
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// }
interface PropsType {
    setModalOpen: (open: boolean) => void;
    content?: React.ReactNode;

  }

  export default function CriminalLetterModal({ setModalOpen, content }: PropsType) {
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={style.container}>
            <button className={style.close} onClick={closeModal}>
                X
            </button>
            <p>모달창입니다.</p>
        </div>
    );
}
