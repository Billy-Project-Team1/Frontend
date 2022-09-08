import React from 'react';
import './Headers.scss';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const AddPostingHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="header_container">
      <div className="header_wrap">
        <div className="mypage_header_content">
          <HiOutlineChevronLeft
            style={{ marginRight: '22px' }}
            color="#656565"
            size="24px"
            onClick={() => navigate(-1)}
          />
          <div className="mypage_header_title">마이 페이지</div>
          {/* <div className="header_done">완료</div> */}
        </div>
        <div className="header_line"></div>
      </div>
    </div>
  );
};

export default AddPostingHeader;
