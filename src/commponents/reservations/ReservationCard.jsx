import React from 'react';
import './ReservationCard.scss';
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  billyStateListThunk,
  deliveryDoneThunk,
  reservationCancelThunk,
} from '../../redux/modules/reservationSlice';
import BillyAcceptButton from './BillyAcceptButton';

const ReservationCard = ({ billyState, setMyPageState }) => {
  const dispatch = useDispatch();
  const is_login = localStorage.getItem('userId');
  const [cancelMessage, setCancelMessage] = useState({
    cancelMessage: '취소할게요',
  });

  const billylist = useSelector((state) => state.billystate?.billyList);
  console.log(billylist);

  useEffect(() => {
    dispatch(billyStateListThunk(billyState));
  }, []);

  useEffect(() => {}, [JSON.stringify(billylist)]);

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

  const cancelHandler = async (a, b) => {
    // console.log(b)
    try {
      const response = await dispatch(reservationCancelThunk({ a, b }));
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
      {billylist?.map((item, index) => {
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
                  <div className="reservationcard_nameWrap">
                    <div className="reservationcard_name">
                      대여자 : {item.jullyNickname}
                    </div>
                    <button className="reservationcard_chatbtn">
                      1:1 문의
                    </button>
                  </div>
                  <div className="reservationcard_alertcontent">
                    {billyState === '2'
                      ? '• 거래 완료시 수령 완료 버튼을 체크해주세요.'
                      : ''}
                  </div>
                  {billyState === '3' ? (
                    <div className="reservationcard_alertcontent">
                      취소사유 : {item.cancelMessage}
                    </div>
                  ) : (
                    ''
                  )}
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
                  item.delivery === true ? (
                    <button className="bookedCard-waitBtn">승인 대기 중</button>
                  ) : (
                    <button
                      className="bookedCard-btn"
                      onClick={() => deliveryDoneHandler(item.reservationId)}
                    >
                      수령 완료
                    </button>
                  )
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
          </div>
        );
      })}
    </div>
  );
};
export default ReservationCard;
