import React, { useState } from 'react';
import CancelPage from './CancelPage';

const CancelButton = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <button className="reservationcard_btn" onClick={() => showModal()}>
        예약 취소
      </button>
      {modalOpen && (
        <CancelPage
          setModalOpen={setModalOpen}
          title={item.title}
          dailyPrice={item.price}
          depositPrice={item.deposit}
          img={item.postImgUrl}
          startDate={item.startDate}
          endDate={item.endDate}
          totalAmount={item.totalAmount}
        />
      )}
    </>
  );
};

export default CancelButton;
