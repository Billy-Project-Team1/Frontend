import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../../pages/modifyProfile/AlertModal.scss';
import './AlertSmallModal.scss';

const LoginModal = ({ setModalOpen }) => {
  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="alertModal_container">
      <div className="alertModal_box">
        <p>로그인이 필요한 페이지입니다</p>
        <div className="alertModal_btns">
          <button className='alertModal_whiteBtn' onClick={closeModal}>취소</button>
          <button
            className="alertModal_blueBtn"
            onClick={() => navigate('/login')}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
