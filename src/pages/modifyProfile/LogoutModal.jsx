import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../redux/modules/customCookies';
import { logOut } from '../../redux/modules/memberSlice';
import '../../commponents/footer/AlertSmallModal.scss';

const LogoutModal = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const refreshToken = getCookie('refreshToken');
  const token = localStorage.getItem('accessToken');

  const closeModal = () => {
    setModalOpen(false);
  };
  const logout = async() => {
    dispatch(logOut({ refreshToken, token }));
  };

  return (
    <div className="alertModal_container">
      <div className="alertModal_box">
        <p>로그아웃 하시겠습니까?</p>
        <div className="alertModal_btns">
          <button className="alertModal_whiteBtn" onClick={closeModal}>
            취소
          </button>
          <button className="alertModal_blueBtn" onClick={logout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
