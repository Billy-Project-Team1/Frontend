import React from 'react';
import { HiHome } from 'react-icons/hi'; //활성화 메인
import { HiSearch } from 'react-icons/hi'; //비활성화 검색
import { HiOutlinePlusCircle } from 'react-icons/hi'; //비활성화 글작성
import { HiOutlineChat } from 'react-icons/hi'; //비활성화 채팅
import { HiOutlineUser } from 'react-icons/hi'; //비활성화 마이페이지
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div>
      <HiHome onClick={() => navigate('/')} style={{fill:pathname === '/'? '':}}/>
    </div>
  );
};

export default Footer;
