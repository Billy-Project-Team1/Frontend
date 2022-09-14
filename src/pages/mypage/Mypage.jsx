import React, { useState } from 'react';
import Footer from '../../commponents/footer/Footer';
import MyProfileHeader from '../../commponents/myProfile/MyProfileHeader';
import MypageHeader from '../../commponents/header/MypageHeader';
import MyProfileMiddle from '../../commponents/myProfile/MyProfileMiddle';
import BillyNavBar from '../../commponents/myProfile/BillyNavBar';
import BillyReservation from '../../commponents/reservations/BillyReservation';

const Mypage = () => {
  const [myPageState, setMyPageState] = useState('1');
  const [reservationsState, setReservationsState] = useState('1');

  return (
    <div>
      <MypageHeader />
      <MyProfileHeader />
      <MyProfileMiddle
        myPageState={myPageState}
        setMyPageState={setMyPageState}
      />
      {myPageState === '2' ? (
        <BillyNavBar
          reservationsState={reservationsState}
          setReservationsState={setReservationsState}
        />
      ) : myPageState === '3' ? (
        <BillyNavBar
          reservationsState={reservationsState}
          setReservationsState={setReservationsState}
        />
      ) : (
        ''
      )}
      {myPageState === '2' && reservationsState === '1' ? (
        <BillyReservation
          reservationsState={reservationsState}
          myPageState={myPageState}
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

      <Footer />
    </div>
  );
};

export default Mypage;
