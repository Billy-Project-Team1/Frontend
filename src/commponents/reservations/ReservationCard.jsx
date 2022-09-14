import React from 'react';
import './ReservationCard.scss';
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';

const ReservationCard = () => {
  return (
    <div className="bookedCard-container">
      <div className="bookedCard-titleWrap">
        <div className="bookedCard-title">제목</div>
      </div>
      <div className="bookedCard-detailWrap">
        <div className="bookedCard-img" />
        <div className="bookedCard-bodyBox">
          <div className="bookedCard-iconBox">
            <div className="bookedCard-price">
              <img src={dailycost} />
              <p>30,000원</p>
            </div>
            <div className="bookedCard-price">
              <img src={deposit} />
              <p>50,000원</p>
            </div>
          </div>
          <div>예약일자 : 00.00(월)~00.00(월)(0박)</div>
          <div>예약상태 : 예약 대기중</div>
          <div>대여자명 : 강아지얌얌이</div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
