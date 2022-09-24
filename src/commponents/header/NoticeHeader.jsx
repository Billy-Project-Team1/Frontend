import React from 'react';
import './Headers.scss';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const Headers = ({ pageName, onClickSave, type }) => {
  const navigate = useNavigate();

  return (
    <div className="header_container">
      <div className="header_wrap">
        <div className="header_content">
          <HiOutlineChevronLeft
            style={{ marginRight: '17px' }}
            color="#212121"
            size="24px"
            onClick={() => navigate(-1)}
          />
          <div className="header_title">{pageName}</div>
          <div className="header_none" onClick={onClickSave}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
