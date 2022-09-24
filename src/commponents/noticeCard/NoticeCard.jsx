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
            <div>1</div>
            <div>2</div>
          </div>
          <div className="noticecard_right_bottom">
            <div>3</div>
            <div>4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
