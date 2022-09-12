import React from 'react';
import './Headers.scss';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const ModifyProfileHeader = ({ sumbitHandler }) => {
  const navigate = useNavigate();

  return (
    <div className="header_container">
      <div className="header_wrap">
        <div className="header_content">
          <HiOutlineChevronLeft
            style={{ marginRight: '22px' }}
            color="#656565"
            size="24px"
            onClick={() => navigate(-1)}
          />
          <div className="header_title">프로필 편집</div>
          <div className="header_done" onClick={sumbitHandler}>
            완료
          </div>
        </div>
        <div className="header_line"></div>
      </div>
    </div>
  );
};

export default ModifyProfileHeader;
