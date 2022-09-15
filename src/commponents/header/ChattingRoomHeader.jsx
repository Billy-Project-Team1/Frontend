import React from 'react';
import './Headers.scss';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const ChattingRoomHeader = ({ onPostingHandler }) => {
  const navigate = useNavigate();

  return (
    <div className="header_container">
      <div className="header_wrap">
        <div className="header_content">
          <HiOutlineChevronLeft
            style={{ marginRight: '22px' }}
            color="#212121"
            size="24px"
            onClick={() => navigate(-1)}
          />
          <div className="header_title">채팅 목록</div>
          <div className="header_done">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
        <div className="header_line"></div>
      </div>
    </div>
  );
};

export default ChattingRoomHeader;
