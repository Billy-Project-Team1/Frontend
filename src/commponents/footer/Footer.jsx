// React importy
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Style import
import './Footer.scss';
// Icon import
import {
  HiOutlineHome,
  HiSearch,
  HiOutlinePlusCircle,
  HiOutlineChat,
  HiOutlineUser,
} from 'react-icons/hi';
// Component import
import AlertSmallModal from '../modal/AlertSmallModal';

const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  //로그인 모달
  const [modalOn, setModalOn] = useState(false);
  const modalTrue = () => {
    setModalOn(true);
  };
  //로그인 함수
  const is_login = localStorage.getItem('userId');

  const postingPage = () => {
    if (is_login) {
      navigate('/posting');
    } else {
      modalTrue();
    }
  };
  const chattingPage = () => {
    if (is_login) {
      navigate('/chatList');
    } else {
      modalTrue();
    }
  };
  const myPage = () => {
    if (is_login) {
      navigate(`/mypage/${is_login}`);
    } else {
      modalTrue();
    }
  };
  const login =()=>{
    navigate('/login')
  }

  return (
    <div className="footer">
      <div className="footer_container">
        <div className="footer_wrap">
          <div onClick={() => navigate('/')}>
            <HiOutlineHome
              className="footer_icon"
              style={{ color: pathname === '/' ? '#212121' : '#CCCCCC' }}
            />
          </div>
          <div onClick={() => navigate('/search')}>
            <HiSearch
              className="footer_icon"
              style={{ color: pathname === '/search' ? '#212121' : '#CCCCCC' }}
            />
          </div>
          <div
            onClick={() => {
              postingPage();
            }}
          >
            <HiOutlinePlusCircle
              className="footer_icon"
              style={{ color: pathname === '/posting' ? '#212121' : '#CCCCCC' }}
            />
          </div>
          <div
            onClick={() => {
              chattingPage();
            }}
          >
            <HiOutlineChat
              className="footer_icon"
              style={{
                color: pathname === '/chatList' ? '#212121' : '#CCCCCC',
              }}
            />
          </div>
          <div
            onClick={() => {
              myPage();
            }}
          >
            <HiOutlineUser
              className="footer_icon"
              style={{
                color:
                  pathname === `/mypage/${is_login}` ? '#212121' : '#CCCCCC',
              }}
            />
          </div>
        </div>
        {modalOn && (
          <AlertSmallModal
            setModalOn={setModalOn}
            body="로그인이 필요한 페이지입니다."
            buttonType="로그인"
            onClickSubmit={login}
          />
        )}
      </div>
    </div>
  );
};

export default Footer;
