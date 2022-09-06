import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/modules/memberSlice';
import './LogoutModal.scss';

const LogoutModal = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };
  const logout = () => {
    dispatch(logOut());
    Navigate('/');
  };

  return (
    <div className="logoutModal-container">
      <div className="logoutModal-box">
        <p>정말로 로그아웃 하시겠습니까?</p>
        <div className="logoutModal-btns">
          <button onClick={closeModal}>취소</button>
          <button onClick={logout}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
