import React from 'react';
import './ReservationCard.scss';

const BillyAcceptButton = ({ deliveryDoneHandler, delivery,reservationId }) => {
  return (
    <div>
      {delivery === true ? (
        <button className="bookedCard-waitBtn">승인 대기 중</button>
      ) : (
        <button className="bookedCard-btn"onClick={() => deliveryDoneHandler(reservationId)}>
          수령완료
        </button>
      )}
    </div>
  );
};

export default BillyAcceptButton;
