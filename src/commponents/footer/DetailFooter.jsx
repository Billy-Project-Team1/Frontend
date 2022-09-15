import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './DetailFooter.scss';

const DetailFooter = ({ authorId, onReservationHandler={onReservationHandler}}) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  return (
    <div className="detail_footer">
      <div className="detail_footer_container">
        {userId === authorId ? (
          <div className="mydetail_footer_wrap">
            <div
              className="mydetail_reservation_btn"
              onClick={() => navigate('/chatList')}
            >
              예약현황
            </div>
            <div className="mydetail_chatlist_btn">채팅 목록보기</div>
          </div>
        ) : (
          <div className="detail_footer_wrap">
            <FaRegHeart className="detail_footer_icon" />
            <div
              className="detail_chat_btn"
              onClick={() => navigate('/chatList')}
            >
              채팅하기
            </div>
            <div className="detail_reservattion_btn" onClick={onReservationHandler}>대여 예약하기</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailFooter;
