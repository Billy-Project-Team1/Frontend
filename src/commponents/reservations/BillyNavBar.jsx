import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { billyReservationCntThunk } from '../../redux/modules/reservationSlice';
import './BillyNavBar.scss';

// 빌리예약
const BillyNavBar = ({ reservationsState, setReservationsState,setMyPageState }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(billyReservationCntThunk());
  }, []);

  const bookedState = useSelector((state) => state.billystate.billyState);
  console.log(bookedState);

  return (
    <div className="myProfileNavBar_wrap">
      <div className="myProfileNavBar_container">
        <div
          className="myProfileNavBar_box"
          onClick={() => setReservationsState('1')}
        >
          <div className="myProfileNavBar_icon_container">
            <div className="myProfileNavBar_icon_box">
              {reservationsState === '1' ? (
                <div className="myProfileNavBar_icon_check">{bookedState.state1}</div>
              ) : (
                <div className="myProfileNavBar_icon">{bookedState.state1}</div>
              )}
            </div>
          </div>
          {reservationsState === '1' ? (
            <div className="myProfileNavBar_text_check">예약 대기중</div>
          ) : (
            <div className="myProfileNavBar_text">예약 대기중</div>
          )}
        </div>

        <div
          className="myProfileNavBar_box"
          onClick={() => setReservationsState('2')}
        >
          <div className="myProfileNavBar_icon_container">
            <div className="myProfileNavBar_icon_box">
              {reservationsState === '2' ? (
                <div className="myProfileNavBar_icon_check">{bookedState.state2}</div>
              ) : (
                <div className="myProfileNavBar_icon">{bookedState.state2}</div>
              )}
            </div>
          </div>
          {reservationsState === '2' ? (
            <div className="myProfileNavBar_text_check">예약중</div>
          ) : (
            <div className="myProfileNavBar_text">예약중</div>
          )}
        </div>

        <div
          className="myProfileNavBar_box"
          onClick={() => setReservationsState('4')}
        >
          <div className="myProfileNavBar_icon_container">
            <div className="myProfileNavBar_icon_box">
              {reservationsState === '4' ? (
                <div className="myProfileNavBar_icon_check">{bookedState.state4}</div>
              ) : (
                <div className="myProfileNavBar_icon">{bookedState.state4}</div>
              )}
            </div>
          </div>
          {reservationsState === '4' ? (
            <div className="myProfileNavBar_text_check">대여중</div>
          ) : (
            <div className="myProfileNavBar_text">대여중</div>
          )}
        </div>

        <div
          className="myProfileNavBar_box"
          onClick={() => setReservationsState('5')}
        >
          <div className="myProfileNavBar_icon_container">
            <div className="myProfileNavBar_icon_box">
              {reservationsState === '5' ? (
                <div className="myProfileNavBar_icon_check">{bookedState.state5}</div>
              ) : (
                <div className="myProfileNavBar_icon">{bookedState.state5}</div>
              )}
            </div>
          </div>
          {reservationsState === '5' ? (
            <div className="myProfileNavBar_text_check">거래 완료</div>
          ) : (
            <div className="myProfileNavBar_text">거래 완료</div>
          )}
        </div>

        <div
          className="myProfileNavBar_box"
          onClick={() => setReservationsState('3')}
        >
          <div className="myProfileNavBar_icon_container">
            <div className="myProfileNavBar_icon_box">
              {reservationsState === '3' ? (
                <div className="myProfileNavBar_icon_check">{bookedState.state3}</div>
              ) : (
                <div className="myProfileNavBar_icon">{bookedState.state3}</div>
              )}
            </div>
          </div>
          {reservationsState === '3' ? (
            <div className="myProfileNavBar_text_check">취소 완료</div>
          ) : (
            <div className="myProfileNavBar_text">취소 완료</div>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default BillyNavBar;
