import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();
  const returnHomepage = () => {
    navigate('/');
  };
  useEffect(() => {
    let timer = setTimeout(() => returnHomepage(), 3000);
  }, []);
  return (
    <div className="notfound_wrap">
      <div className="notfound_container">
        <div>404</div>
        <div>페이지를 찾을수 없습니다</div>
      </div>
    </div>
  );
};

export default NotFound;
