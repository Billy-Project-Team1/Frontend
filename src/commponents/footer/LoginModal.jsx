import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../../pages/modifyProfile/AlertModal.scss';
import './LoginModal.scss';

const LoginModal = ({ modalOpen, setModalOpen }) => {
  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="loginModal-container">
      <div className="loginModal-box">
        <p>로그인이 필요한 페이지입니다</p>
        <div className="loginModal-btns">
          <button onClick={closeModal}>취소</button>
          <button onClick={() => navigate('/login')}>로그인</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
