import React from 'react';
import ReservationCard from '../reservations/ReservationCard';

const billyReservation = ({ reservationsState }) => {
  if (reservationsState === '1') {
    return (
      <div>
        <ReservationCard billyState={reservationsState} />
      </div>
    );
  } else if (reservationsState === '2') {
    return (
      <div>
        <ReservationCard billyState={reservationsState} />
      </div>
    );
  } else if (reservationsState === '3') {
    return (
      <div>
        <ReservationCard billyState={reservationsState} />
      </div>
    );
  } else if (reservationsState === '4') {
    return (
      <div>
        <ReservationCard billyState={reservationsState} />
      </div>
    );
  } else if (reservationsState === '5') {
    return (
      <div>
        <ReservationCard billyState={reservationsState} />
      </div>
    );
  } else {
    return '';
  }
};

export default billyReservation;
