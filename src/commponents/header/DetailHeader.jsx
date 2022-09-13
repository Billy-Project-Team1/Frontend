import React from 'react';
import './Headers.scss';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const AddPostingHeader = ({ move }) => {
  const navigate = useNavigate();

  return (
    <div className="detail_header_container">
      <div className="detail_header_wrap">
        <div className="mypage_header_content">
          <HiOutlineChevronLeft
            style={{ marginRight: '22px' }}
            color="#656565"
            size="24px"
            onClick={() => navigate(-1)}
          />
          <div className="mypage_header_title">&nbsp;</div>
          <div className="detail_dot_icon"></div>
        </div>
        <div className="header_line"></div>
      </div>
    </div>
  );
};

export default AddPostingHeader;
