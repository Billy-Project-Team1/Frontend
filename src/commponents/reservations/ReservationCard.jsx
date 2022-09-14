import React from 'react';
import './ReservationCard.scss';
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  billyStateListThunk,
  deliveryDoneThunk,
  reservationCancelThunk,
} from '../../redux/modules/reservationSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReservationCard = ({ billyState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const is_login = localStorage.getItem('userId');
  const [cancelMessage, setCancelMessage] = useState({
    cancelMessage: '취소할게요',
  });

  useEffect(() => {
    dispatch(billyStateListThunk(billyState));
  }, [dispatch]);

  const billylist = useSelector((state) => state.billystate?.billyList);
  console.log(billylist);

  const rentalTotalDay = (a, b) => {
    return Math.floor(a / b);
  };
  //   function getFormatDate(date) {
  //     var month = 1 + date.getMonth();
  //     month = month >= 10 ? month : '0' + month;
  //     var day = date.getDate();
  //     day = day >= 10 ? day : '0' + day;
  //     return month + '.' + day;
  //   }
  //   var a = new Date();
  //   a = getFormatDate(a);

//   const bb = (a) => {
//     console.log(a)
//     function getFormatDate(date) {
//       var month = 1 + date.getMonth();
//       month = month >= 10 ? month : '0' + month;
//       var day = date.getDate();
//       day = day >= 10 ? day : '0' + day;
//       return month + '.' + day;
//     }
//     var dddd = new Date();
//     dddd = getFormatDate(a);
//   };
  const cancelHandler = (a, b) => {
    // console.log(b)
    dispatch(reservationCancelThunk({ a, b }));
    window.location.replace(`/mypage/${is_login}`);
  };

  const deliveryDoneHandler = (a) => {
    dispatch(deliveryDoneThunk(a));
    // window.location.replace(`/mypage/${is_login}`);
  };
  return (
    // .slice(0).reverse()
    <>
      {billylist?.map((item,index) => {
        return (
          <div className="bookedCard-container">
            <div className="bookedCard-titleWrap">
              <div className="bookedCard-title">{item.title}</div>
            </div>
            <div className="bookedCard-detailWrap">
              <img className="bookedCard-img" src={item.postImgUrl} />
              <div className="bookedCard-bodyBox">
                <div className="bookedCard-iconBox">
                  <div className="bookedCard-price">
                    <img src={dailycost} />
                    <p>{item.price}</p>
                  </div>
                  <div className="bookedCard-price">
                    <img src={deposit} />
                    <p>{item.deposit}</p>
                  </div>
                </div>
                <div>
                  예약일자 : {item.startDate}~{item.endDate}(
                  {rentalTotalDay(item.totalAmount, item.price)}박)
                </div>
                <div>
                  예약상태 :&nbsp;
                  {billyState === '1'
                    ? '예약 대기중'
                    : billyState === '2'
                    ? '예약중'
                    : billyState === '4'
                    ? '대여중'
                    : billyState === '5'
                    ? '거래 완료'
                    : billyState === '3'
                    ? '취소 완료'
                    : ''}
                </div>
                <div>대여자명 : {item.jullyNickname}</div>
              </div>
            </div>
            <div className="bookedCard-btnWrap">
              {billyState === '1' ? (
                <button
                  className="bookedCard-btn"
                  onClick={() =>
                    cancelHandler(item.reservationId, cancelMessage)
                  }
                >
                  예약 취소
                </button>
              ) : billyState === '2' ? (
                <button
                  className="bookedCard-btn"
                  onClick={() => deliveryDoneHandler(item.reservationId)}
                >
                  수령 완료
                </button>
              ) : billyState === '4' ? (
                <div style={{ marginBottom: '20px' }} />
              ) : billyState === '5' ? (
                <button className="bookedCard-btn">리뷰 작성</button>
              ) : billyState === '3' ? (
                <div style={{ marginBottom: '20px' }} />
              ) : (
                ''
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ReservationCard;
