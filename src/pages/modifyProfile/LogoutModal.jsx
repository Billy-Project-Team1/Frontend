import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../redux/modules/customCookies';
import { logOut } from '../../redux/modules/memberSlice';
import '../../commponents/footer/AlertModal.scss';

const LogoutModal = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = getCookie('refreshToken');
  const token = localStorage.getItem('accessToken');

  const closeModal = () => {
    setModalOpen(false);
  };
  const logout = () => {
    dispatch(logOut({ refreshToken, token }));
    window.location.replace('/');
  };

  return (
    <div className="alertModal-container">
      <div className="alertModal-box">
        <p>로그아웃 하시겠습니까?</p>
        <div className="alertModal-btns">
          <button className="alertModal-whiteBtn" onClick={closeModal}>
            취소
          </button>
          <button className="alertModal-blueBtn" onClick={logout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
