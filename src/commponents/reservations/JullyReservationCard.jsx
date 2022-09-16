import React from 'react';
import './ReservationCard.scss';
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  deliveryDoneThunk,
  jullyStateChangeThunk,
  jullyStateListThunk,
} from '../../redux/modules/reservationSlice';

const JullyReservationCard = ({ jullyState, setMyPageState }) => {
  const dispatch = useDispatch();

  const is_login = localStorage.getItem('userId');
  const [cancelMessage, setCancelMessage] = useState({
    cancelMessage: '취소할게요',
  });

  useEffect(() => {
    dispatch(jullyStateListThunk(jullyState));
  }, []);
  const jullylist = useSelector((state) => state.billystate.jullyList);
  console.log(jullylist);

  useEffect(() => {}, [JSON.stringify(jullylist)]);

  const rentalTotalDate = (a, b) => {
    return Math.floor(a / b);
  };

  function rentalDate(a) {
    var d = new Date(a);
    return (
      (d.getMonth() + 1 > 9
        ? (d.getMonth() + 1).toString()
        : '0' + (d.getMonth() + 1)) +
      '.' +
      (d.getDate() > 9
        ? d.getDate().toString()
        : '0' + d.getDate().toString()) +
      '(' +
      ('월화수목금토일'.charAt(d.getUTCDay()) + '') +
      ')'
    );
  }
  // console.log(rentalDate())

  const dailyPrice = (a) => {
    return a?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const depositPrice = (a) => {
    return a?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const jullyCancelHandler = async (a, b) => {
    try {
      const response = await dispatch(jullyStateChangeThunk({ a, b }));
      if (response) {
        return window.location.replace(`/mypage/${is_login}`);
        // setMyPageState('2'),
        // console.log('dffdfd')
      }
    } catch {}
  };

  const deliveryDoneHandler = async (e) => {
    try {
      const response = await dispatch(deliveryDoneThunk(e));
      if (response) {
        return window.location.replace(`/mypage/${is_login}`);
      }
    } catch {}
  };

  return (
    // .slice(0).reverse()
    <div className="bookedCard-firstContainer">
      {jullylist?.map((item, index) => {
        return (
          <div className="bookedCard-container">
            <div className="bookedCard-smallContainer">
              <div className="bookedCard-titleWrap">
                <div className="bookedCard-title">{item.title}</div>
              </div>
              <div className="bookedCard-detailWrap">
                <img className="bookedCard-img" src={item.postImgUrl} />
                <div className="bookedCard-bodyBox">
                  <div className="bookedCard-iconBox">
                    <div className="bookedCard-price">
                      <img src={dailycost} />
                      <p>{dailyPrice(item.price)}</p>
                    </div>
                    <div className="bookedCard-price">
                      <img src={deposit} />
                      <p>{depositPrice(item.deposit)}</p>
                    </div>
                  </div>
                  <div>
                    예약일자 : {rentalDate(item.startDate)}~
                    {rentalDate(item.endDate)}&nbsp;(
                    {rentalTotalDate(item.totalAmount, item.price)}박)
                  </div>
                  <div>
                    예약상태 :&nbsp;
                    {jullyState === '1'
                      ? '예약 대기중'
                      : jullyState === '2'
                      ? '예약중'
                      : jullyState === '4'
                      ? '대여중'
                      : jullyState === '5'
                      ? '거래 완료'
                      : jullyState === '3'
                      ? '취소 완료'
                      : ''}
                  </div>
                  <div className="reservationcard_nameWrap">
                    <div className="reservationcard_name">
                      예약자: {item.billyNickname}
                    </div>
                    <button className="reservationcard_chatbtn">
                      1:1 문의
                    </button>
                  </div>
                  <div className="reservationcard_alertcontent">
                    {jullyState === '2'
                      ? '• 거래 완료시 전달 완료 버튼을 체크해주세요.'
                      : ''}
                  </div>
                  {jullyState === '3' ? (
                    <div className="reservationcard_alertcontent">
                      취소사유 : {item.cancelMessage}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="bookedCard-btnWrap">
                {jullyState === '1' ? (
                  <div className="jullyReservation_btnSet">
                    <button
                      className="jullyReservation_btn"
                      onClick={() =>
                        jullyCancelHandler(item.reservationId, cancelMessage)
                      }
                    >
                      예약 취소
                    </button>
                    <button className="jullyReservation_btn">승인</button>
                  </div>
                ) : jullyState === '2' ? (
                  <div className="jullyReservation_btnSet">
                    <button
                      className="jullyReservation_btn"
                      onClick={() =>
                        jullyCancelHandler(item.reservationId, cancelMessage)
                      }
                    >
                      예약 취소
                    </button>
                    <button className="jullyReservation_btn">전달 완료</button>
                  </div>
                ) : jullyState === '4' ? (
                  <button className="bookedCard-btn">반납 완료</button>
                ) : jullyState === '5' ? (
                  <div style={{ marginBottom: '20px' }} />
                ) : jullyState === '3' ? (
                  <div style={{ marginBottom: '20px' }} />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default JullyReservationCard;
