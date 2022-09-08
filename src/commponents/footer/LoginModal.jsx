import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/modifyProfile/AlertModal.scss';

const LoginModal = ({ modalOpen, setModalOpen }) => {
  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <div className="alertModal-container">
        <div className="alertModal-box">
          <p>로그인이 필요한 페이지입니다</p>
          <div className="alertModal-btns">
            <button onClick={closeModal}>취소</button>
            <button onClick={() => navigate('/login')}>확인</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
