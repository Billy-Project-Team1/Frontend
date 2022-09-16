import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jullyReservationCntThunk } from '../../redux/modules/reservationSlice';
import './BillyNavBar.scss';

// 줄리예약
const JullyNavBar = ({ reservationsState, setReservationsState,setMyPageState }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jullyReservationCntThunk());
  }, []);

  const JullyBoookingState = useSelector((state) => state.billystate.jullyState);
  console.log(JullyBoookingState)

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
                <div className="myProfileNavBar-IconCheck">{JullyBoookingState.state1}</div>
              ) : (
                <div className="myProfileNavBar-Icon">{JullyBoookingState.state1}</div>
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
                <div className="myProfileNavBar-IconCheck">{JullyBoookingState.state2}</div>
              ) : (
                <div className="myProfileNavBar-Icon">{JullyBoookingState.state2}</div>
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
          onClick={() => setReservationsState('4')}
        >
          <div className="myProfileNavBar-IconContainer">
            <div className="myProfileNavBar-IconBox">
              {reservationsState === '4' ? (
                <div className="myProfileNavBar-IconCheck">{JullyBoookingState.state4}</div>
              ) : (
                <div className="myProfileNavBar-Icon">{JullyBoookingState.state4}</div>
              )}
            </div>
          </div>
          {reservationsState === '4' ? (
            <div className="myProfileNavBar-TextCheck">대여중</div>
          ) : (
            <div className="myProfileNavBar-Text">대여중</div>
          )}
        </div>

        <div
          className="myProfileNavBar-Box"
          onClick={() => setReservationsState('5')}
        >
          <div className="myProfileNavBar-IconContainer">
            <div className="myProfileNavBar-IconBox">
              {reservationsState === '5' ? (
                <div className="myProfileNavBar-IconCheck">{JullyBoookingState.state5}</div>
              ) : (
                <div className="myProfileNavBar-Icon">{JullyBoookingState.state5}</div>
              )}
            </div>
          </div>
          {reservationsState === '5' ? (
            <div className="myProfileNavBar-TextCheck">거래 완료</div>
          ) : (
            <div className="myProfileNavBar-Text">거래 완료</div>
          )}
        </div>

        <div
          className="myProfileNavBar-Box"
          onClick={() => setReservationsState('3')}
        >
          <div className="myProfileNavBar-IconContainer">
            <div className="myProfileNavBar-IconBox">
              {reservationsState === '3' ? (
                <div className="myProfileNavBar-IconCheck">{JullyBoookingState.state3}</div>
              ) : (
                <div className="myProfileNavBar-Icon">{JullyBoookingState.state3}</div>
              )}
            </div>
          </div>
          {reservationsState === '3' ? (
            <div className="myProfileNavBar-TextCheck">취소 완료</div>
          ) : (
            <div className="myProfileNavBar-Text">취소 완료</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JullyNavBar;
