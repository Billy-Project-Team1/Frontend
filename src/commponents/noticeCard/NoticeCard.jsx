import React from 'react';
import './NoticeCard.scss';

const NoticeCard = () => {
  return (
    <div className="noticecard_wrap">
      <div className="noticecard_container">
        <div className="noticecard_img_box">
          <img className="noticecard_img" src="/logo192.png" />
        </div>
        <div className="noticecard_right">
          <div className="noticecard_right_top">
            <div className="noticecard_right_top_class">예약 완료</div>
            <div className="noticecard_right_top_clock">9월 12일</div>
          </div>
          <div className="noticecard_right_bottom">
            <div>아무튼 내가 최고 최고심 마우스 패드</div>
            <div>4월 19일 - 4월 20일 (0박)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
