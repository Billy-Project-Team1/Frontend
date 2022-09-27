// React import
import React, { useState } from 'react';
// Component import
import AlertLargeModal from '../modal/AlertLargeModal';

const AlertButtonJullyReturn = ({
  billyState,
  jullyState,
  deliveryDoneHandler,
  billyData,
  jullyStateHandler,
  JullyData,
  JullyHandleDone,
  JullyReturnDone,
}) => {
  const [largeModalOpen, setLargeModalOpen] = useState(false);
  const isModal = () => {
    setLargeModalOpen(true);
  };

  return (
    <>
      {jullyState === '4' ? (
        <>
          <button className="reservationcard_btn" onClick={() => isModal()}>
            반납 완료
          </button>
          {largeModalOpen && (
            <AlertLargeModal
              setLargeModalOpen={setLargeModalOpen}
              body1="반납 완료시 대여가 확정됩니다."
              body2="반납을 완료하시겠습니까?"
              buttonType="반납 완료"
              onClickSubmit={jullyStateHandler}
              data={JullyData}
              data2={JullyReturnDone}
            />
          )}
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default AlertButtonJullyReturn;
