import React, { useState } from 'react';
import MyProfileMiddle from '../../commponents/myProfile/MyProfileMiddle';
import BillyNavBar from '../../commponents/reservations/BillyNavBar';
import BillyReservation from '../../commponents/reservations/BillyReservation';
import DibsCard from '../../commponents/profileCard/DibsCard';
import UploadCard from '../../commponents/profileCard/UploadCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getmyDibsData,
  getmyUpLoadData,
} from '../../redux/modules/memberSlice';
import './MyPageList.scss';
import JullyNavBar from '../../commponents/reservations/JullyNavBar';
import JullyReservation from '../../commponents/reservations/JullyReservation';

const Mypage = () => {
  const dispatch = useDispatch();
  const [myPageState, setMyPageState] = useState('1');
  const [reservationsState, setReservationsState] = useState('1');
  useEffect(() => {
    dispatch(getmyUpLoadData());
    dispatch(getmyDibsData());
  }, []);

  const myDipList = useSelector((state) => state.member.myDibsList);
  const myUploadList = useSelector((state) => state.member.myUploadList);
  // console.log(myDipList);
  
  return (
    <div>
      <MyProfileMiddle
        myPageState={myPageState}
        setMyPageState={setMyPageState}
      />

      {myPageState === '2' ? (
        <BillyNavBar
          reservationsState={reservationsState}
          setReservationsState={setReservationsState}
          setMyPageState={setMyPageState}
        />
      ) : myPageState === '3' ? (
        <JullyNavBar
          reservationsState={reservationsState}
          setReservationsState={setReservationsState}
        />
      ) : (
        ''
      )}

      {/* 빌린예약건 */}
      {myPageState === '2' && reservationsState === '1' ? (
        <BillyReservation
          reservationsState={reservationsState}
          myPageState={myPageState}
          setMyPageState={setMyPageState}
        />
      ) : (
        ''
      )}
      {myPageState === '2' && reservationsState === '2' ? (
        <BillyReservation
          reservationsState={reservationsState}
          myPageState={myPageState}
        />
      ) : (
        ''
      )}
      {myPageState === '2' && reservationsState === '3' ? (
        <BillyReservation
          reservationsState={reservationsState}
          myPageState={myPageState}
        />
      ) : (
        ''
      )}
      {myPageState === '2' && reservationsState === '4' ? (
        <BillyReservation
          reservationsState={reservationsState}
          myPageState={myPageState}
        />
      ) : (
        ''
      )}
      {myPageState === '2' && reservationsState === '5' ? (
        <BillyReservation
          reservationsState={reservationsState}
          myPageState={myPageState}
        />
      ) : (
        ''
      )}
      {/* 빌려준 예약건 */}
      {myPageState === '3' && reservationsState === '1' ? (
        <JullyReservation
          reservationsState={reservationsState}
          myPageState={myPageState}
          setMyPageState={setMyPageState}
        />
      ) : (
        ''
      )}
      {myPageState === '3' && reservationsState === '2' ? (
        <JullyReservation
          reservationsState={reservationsState}
          myPageState={myPageState}
        />
      ) : (
        ''
      )}
      {myPageState === '3' && reservationsState === '3' ? (
        <JullyReservation
          reservationsState={reservationsState}
          myPageState={myPageState}
        />
      ) : (
        ''
      )}
      {myPageState === '3' && reservationsState === '4' ? (
        <JullyReservation
          reservationsState={reservationsState}
          myPageState={myPageState}
        />
      ) : (
        ''
      )}
      {myPageState === '3' && reservationsState === '5' ? (
        <JullyReservation
          reservationsState={reservationsState}
          myPageState={myPageState}
        />
      ) : (
        ''
      )}

      {myPageState === '1' ? (
        <div className="mypage_list_margin">
          {myDipList.map((post) => {
            return <DibsCard post={post} />;
          })}{' '}
        </div>
      ) : myPageState === '4' ? (
        <div className="mypage_list_margin">
          {myUploadList.map((post) => {
            return <UploadCard post={post} />;
          })}
        </div>
      ) : (
        ''
      )}

    </div>
  );
};

export default Mypage;
