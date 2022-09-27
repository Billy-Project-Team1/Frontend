// React import
import React, { useState } from 'react';
import { useEffect } from 'react';
// Component import
import AlertLargeModal from '../modal/AlertLargeModal';

const AlertButton = ({
  billyState,
  jullyState,
  deliveryDoneHandler,
  billyData,
  jullyStateHandler,
  JullyData,
  JullyHandleDone,
  JullyReturnDone,
  test
}) => {
  const [largeModalOpen, setLargeModalOpen] = useState(false);
  const isModal = () => {
    setLargeModalOpen(true);
  };

  useEffect(()=>{
    setLargeModalOpen(false)
  },[test])

  return (
    <>
      {billyState === '2' ? (
        <>
          <button className="reservationcard_btn" onClick={isModal}>
            수령 완료
          </button>
          {largeModalOpen && (
            <AlertLargeModal
              setLargeModalOpen={setLargeModalOpen}
              body1="수령 완료시 대여가 확정됩니다."
              body2="수령을 완료하시겠습니까?"
              buttonType="수령 완료"
              onClickSubmit={deliveryDoneHandler}
              data={billyData}
            />
          )}
        </>
      ) : jullyState === '2' ? (
        <>
          <button className="reservationcard_btn" onClick={() => isModal()}>
            전달 완료
          </button>
          {largeModalOpen && (
            <AlertLargeModal
              setLargeModalOpen={setLargeModalOpen}
              body1="전달 완료시 대여가 확정됩니다."
              body2="전달을 완료하시겠습니까?"
              buttonType="전달 완료"
              onClickSubmit={jullyStateHandler}
              data={JullyData}
              data2={JullyHandleDone}
            />
          )}
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default AlertButton;
