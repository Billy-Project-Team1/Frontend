import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../redux/modules/CustomCookie';
import { logOut } from '../../redux/modules/memberSlice';
import './AlertModal.scss';

const LogoutModal = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = getCookie('refreshToken');
  const token = localStorage.getItem('token');

  const closeModal = () => {
    setModalOpen(false);
  };
  const logout = () => {
    dispatch(logOut({ refreshToken, token }));
    navigate('/');
  };

  return (
    <div className="alertModal-container">
      <div className="alertModal-box">
        <p>정말로 로그아웃 하시겠습니까?</p>
        <div className="alertModal-btns">
          <button onClick={closeModal}>취소</button>
          <button onClick={logout}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
