// React import
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Redux import
import { useDispatch } from 'react-redux';
// Style import
import './DetailFooter.scss';
// Icon import
import { FaRegHeart, FaHeart } from 'react-icons/fa';
// Slice import
import { createChatRoom } from '../../redux/modules/ChatSlice';
import { dibsPost } from '../../redux/modules/postSlice';

const DetailFooter = ({
  authorId,
  detailPost,
  onReservationHandler,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');

  const onCreateChatRoom = async () => {
    try {
      const data = await dispatch(createChatRoom(detailPost.id)).unwrap();
      if (data) {
        return navigate(`/chat/room/${detailPost.id}/${data}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onDibsHander = () => {
    dispatch(dibsPost(detailPost.id));
  };

  // console.log(detailPost);

  return (
    <div className="detail_footer">
      <div className="detail_footer_container">
        {userId === authorId ? (
          <div className="mydetail_footer_wrap">
            <div
              className="mydetail_reservation_btn"
              onClick={() => navigate(`/mypage/${userId}`)}
            >
              예약현황
            </div>
            <div className="mydetail_chatlist_btn">채팅 목록보기</div>
          </div>
        ) : (
          <div className="detail_footer_wrap">
            {detailPost.like === true ? (
              <FaHeart
                className="detail_footer_icon"
                style={{color : '#EB0000'}}
                onClick={() => onDibsHander()}
              />
            ) : (
              <FaRegHeart
                className="detail_footer_icon"
                onClick={() => onDibsHander()}
              />
            )}

            <div className="detail_chat_btn" onClick={onCreateChatRoom}>
              채팅하기
            </div>
            <div
              className="detail_reservattion_btn"
              onClick={onReservationHandler}
            >
              대여 예약하기
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailFooter;
