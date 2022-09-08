import React from 'react';
import { useState } from 'react';
import { HiOutlineHome } from 'react-icons/hi'; //비활성화 메인
import { HiSearch } from 'react-icons/hi'; //비활성화 검색
import { HiOutlinePlusCircle } from 'react-icons/hi'; //비활성화 글작성
import { HiOutlineChat } from 'react-icons/hi'; //비활성화 채팅
import { HiOutlineUser } from 'react-icons/hi'; //비활성화 마이페이지
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
      navigate('/chat');
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

  // <HiSearch size="24" />

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-wrap">
          <div onClick={() => navigate('/')}>
            <HiOutlineHome
              className="footer-icon"
              style={{ color: pathname === '/' ? '#212121' : '#CCCCCC' }}
            />
          </div>
          <div onClick={() => navigate('/search')}>
            <HiSearch
              className="footer-icon"
              style={{ color: pathname === '/search' ? '#212121' : '#CCCCCC' }}
            />
          </div>
          <div
            onClick={() => {
              postingPage();
            }}
          >
            <HiOutlinePlusCircle
              className="footer-icon"
              style={{ color: pathname === '/posting' ? '#212121' : '#CCCCCC' }}
            />
          </div>
          <div
            onClick={() => {
              chattingPage();
            }}
          >
            <HiOutlineChat
              className="footer-icon"
              style={{ color: pathname === '/chat' ? '#212121' : '#CCCCCC' }}
            />
          </div>
          <div
            onClick={() => {
              myPage();
            }}
          >
            <HiOutlineUser
              className="footer-icon"
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
