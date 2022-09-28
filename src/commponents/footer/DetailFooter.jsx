// React import
import React, { useState } from 'react';
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
import AlertSmallModal from '../modal/AlertSmallModal';
import { reservationThunk } from '../../redux/modules/reservationSlice';

const DetailFooter = ({ authorId, detailPost, pickDate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const [modalOn, setModalOn] = useState(false);
  const modalTrue = () => {
    setModalOn(true);
  };
  const login = () => {
    navigate('/login');
  };
  const onDibsHander = () => {
    if (userId) {
      dispatch(dibsPost(detailPost.id));
    } else {
      modalTrue();
    }
  };
  const onCreateChatRoom = async () => {
    if (userId) {
      try {
        const data = await dispatch(createChatRoom(detailPost.id)).unwrap();
        if (data) {
          return navigate(`/chat/room/${detailPost.id}/${data}`);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      modalTrue();
    }
  };
  const onReservationHandler = async () => {
    if (userId) {
      try {
        const response = await dispatch(reservationThunk(pickDate)).unwrap();
        if (response) {
          return window.location.replace(`/mypage/${userId}`);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      modalTrue();
    }
  };

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
            <div className="mydetail_chatlist_btn" onClick={()=> navigate('/chatList')}>채팅 목록보기</div>
          </div>
        ) : (
          <div className="detail_footer_wrap">
            {detailPost.like === true ? (
              <FaHeart
                className="detail_footer_icon"
                style={{ color: '#EB0000' }}
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
      {modalOn && (
        <AlertSmallModal
          setModalOn={setModalOn}
          body="로그인이 필요한 페이지입니다."
          buttonType="로그인"
          onClickSubmit={login}
        />
      )}
    </div>
  );
};

export default DetailFooter;
