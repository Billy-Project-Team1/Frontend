import React from 'react';
import BillyReservation from '../reservations/ReservationCard';
import './BillyReservation.scss';

const billyReservation = ({ reservationsState }) => {
  const billyState = () => {
    if (reservationsState === '1') {
      return (
        <div>
          <BillyReservation />
        </div>
      );
    } else if (reservationsState === '2') {
      return <h1>예약중</h1>;
    } else if (reservationsState === '3') {
      return <h1>대여중</h1>;
    } else if (reservationsState === '4') {
      return <h1>거래완료</h1>;
    } else if (reservationsState === '5') {
      return <h1>취소완료</h1>;
    }
  };
  const btnSetting = () => {
    if (reservationsState === '1') {
      return <button className="reservationBtn">예약 취소</button>;
    } else if (reservationsState === '2') {
      return <button>수령 완료</button>;
    } else if (reservationsState === '4') {
      return <button>리뷰 작성</button>;
    }
  };
  return (
    <div>
      <div>{billyState()}</div>
      <div>{btnSetting()}</div>
    </div>
  );
};

export default billyReservation;
