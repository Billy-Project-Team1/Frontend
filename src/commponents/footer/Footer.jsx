import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  HiOutlineHome,
  HiSearch,
  HiOutlinePlusCircle,
  HiOutlineChat,
  HiOutlineUser,
} from 'react-icons/hi'; //비활성화 메인
import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.scss';
import LoginModal from './LoginModal';

const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  //로그인 모달
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  //로그인 함수
  const is_login = localStorage.getItem('userId');

  const postingPage = () => {
    if (is_login) {
      navigate('/posting');
    } else {
      showModal();
    }
  };
  const chattingPage = () => {
    if (is_login) {
      navigate('/chatList');
    } else {
      showModal();
    }
  };
  const myPage = () => {
    if (is_login) {
      navigate(`/mypage/${is_login}`);
    } else {
      showModal();
    }
  };
  // useEffect(() => {
  //   document.body.style.cssText = `
  //     position: fixed;
  //     top: -${window.scrollY}px;
  //     overflow-y: scroll;
  //     width: 100%;`;
  //   return () => {
  //     const scrollY = document.body.style.top;
  //     document.body.style.cssText = '';
  //     window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  //   };
  // }, []);

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
              style={{ color: pathname === '/chatList' ? '#212121' : '#CCCCCC' }}
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
        {modalOpen && (
          <LoginModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
        )}
      </div>
    </div>
  );
};

export default Footer;
