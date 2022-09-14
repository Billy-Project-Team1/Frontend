import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { billyReservationCntThunk } from '../../redux/modules/reservationSlice';
import './BillyNavBar.scss';

// 빌리예약
const BillyNavBar = ({ reservationsState, setReservationsState }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(billyReservationCntThunk());
  }, []);

  const bookedState = useSelector((state) => state.billystate.billyState);
  console.log(bookedState);

  return (
    <div className="myProfileNavBar-Wrap">
      <div className="myProfileNavBar-Container">
        <div
          className="myProfileNavBar-Box"
          onClick={() => setReservationsState('1')}
        >
          <div className="myProfileNavBar-IconContainer">
            <div className="myProfileNavBar-IconBox">
              {reservationsState === '1' ? (
                <div className="myProfileNavBar-IconCheck">
                  {bookedState.state1}
                </div>
              ) : (
                <div className="myProfileNavBar-Icon">{bookedState.state1}</div>
              )}
            </div>
          </div>
          {reservationsState === '1' ? (
            <div className="myProfileNavBar-TextCheck">예약 대기중</div>
          ) : (
            <div className="myProfileNavBar-Text">예약 대기중</div>
          )}
        </div>

        <div
          className="myProfileNavBar-Box"
          onClick={() => setReservationsState('2')}
        >
          <div className="myProfileNavBar-IconContainer">
            <div className="myProfileNavBar-IconBox">
              {reservationsState === '2' ? (
                <div className="myProfileNavBar-IconCheck">
                  {bookedState.state2}
                </div>
              ) : (
                <div className="myProfileNavBar-Icon">{bookedState.state2}</div>
              )}
            </div>
          </div>
          {reservationsState === '2' ? (
            <div className="myProfileNavBar-TextCheck">예약중</div>
          ) : (
            <div className="myProfileNavBar-Text">예약중</div>
          )}
        </div>

        <div
          className="myProfileNavBar-Box"
          onClick={() => setReservationsState('3')}
        >
          <div className="myProfileNavBar-IconContainer">
            <div className="myProfileNavBar-IconBox">
              {reservationsState === '3' ? (
                <div className="myProfileNavBar-IconCheck">
                  {bookedState.state3}
                </div>
              ) : (
                <div className="myProfileNavBar-Icon">{bookedState.state3}</div>
              )}
            </div>
          </div>
          {reservationsState === '3' ? (
            <div className="myProfileNavBar-TextCheck">대여중</div>
          ) : (
            <div className="myProfileNavBar-Text">대여중</div>
          )}
        </div>

        <div
          className="myProfileNavBar-Box"
          onClick={() => setReservationsState('4')}
        >
          <div className="myProfileNavBar-IconContainer">
            <div className="myProfileNavBar-IconBox">
              {reservationsState === '4' ? (
                <div className="myProfileNavBar-IconCheck">
                  {bookedState.state4}
                </div>
              ) : (
                <div className="myProfileNavBar-Icon">{bookedState.state4}</div>
              )}
            </div>
          </div>
          {reservationsState === '4' ? (
            <div className="myProfileNavBar-TextCheck">거래 완료</div>
          ) : (
            <div className="myProfileNavBar-Text">거래 완료</div>
          )}
        </div>

        <div
          className="myProfileNavBar-Box"
          onClick={() => setReservationsState('5')}
        >
          <div className="myProfileNavBar-IconContainer">
            <div className="myProfileNavBar-IconBox">
              {reservationsState === '5' ? (
                <div className="myProfileNavBar-IconCheck">
                  {bookedState.state5}
                </div>
              ) : (
                <div className="myProfileNavBar-Icon">{bookedState.state5}</div>
              )}
            </div>
          </div>
          {reservationsState === '5' ? (
            <div className="myProfileNavBar-TextCheck">취소 완료</div>
          ) : (
            <div className="myProfileNavBar-Text">취소 완료</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillyNavBar;
