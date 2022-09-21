import React from 'react';
import '../../commponents/footer/AlertLargeModal.scss';

const ApprovalModal = ({ setModalOpen,word,onClickSave,buttonType,data,data2 }) => {

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="alertModalLargeModal_container">
      <div className="alertModalLargeModal_box">
        <p>{word} 완료시 대여가 확정됩니다</p>
        <p>{word}을 완료하시겠습니까?</p>
        <div className="alertModalLargeModal_btns">
          <button className="alertModal_whiteBtn" onClick={()=>closeModal()}>
            취소
          </button>
          <button className="alertModal_blueBtn" onClick={()=>onClickSave(data,data2)} >
            {buttonType}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;
