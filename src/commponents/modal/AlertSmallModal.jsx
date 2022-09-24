// React import 
import React from 'react';
// Style import
import './AlertSmallModal.scss';

const AlertSmallModal = ({ setModalOn, body, onClickSubmit, buttonType }) => {

  const closeModal = () => {
    setModalOn(false);
  };
  return (
    <div className="alertModal_container">
      <div className="alertModal_box">
        <p>{body}</p>
        <div className="alertModal_btns">
          <button className='alertModal_whiteBtn' onClick={closeModal}>취소</button>
          <button
            className="alertModal_blueBtn"
            onClick={onClickSubmit}
          >
            {buttonType}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertSmallModal;