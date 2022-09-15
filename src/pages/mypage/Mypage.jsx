import React, { useState } from 'react';
import Footer from '../../commponents/footer/Footer';
import MyProfileHeader from '../../commponents/myProfile/MyProfileHeader';
import MypageHeader from '../../commponents/header/MypageHeader';
import MyProfileMiddle from '../../commponents/myProfile/MyProfileMiddle';
import BillyNavBar from '../../commponents/myProfile/BillyNavBar';
import BillyReservation from '../../commponents/reservations/BillyReservation';
import DibsCard from '../../commponents/profileCard/DibsCard';
import UploadCard from '../../commponents/profileCard/UploadCard';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getmyDibsData,
  getmyUpLoadData,
} from '../../redux/modules/memberSlice';
import './Mypage.scss';

const Mypage = () => {
  const dispatch = useDispatch();
  const [myPageState, setMyPageState] = useState('1');
  const [reservationsState, setReservationsState] = useState('1');
  const { id } = useParams();
  useEffect(() => {
    dispatch(getmyUpLoadData());
    dispatch(getmyDibsData());
  }, []);

  const myDipList = useSelector((state) => state.member.myDibsList);
  const myUploadList = useSelector((state) => state.member.myUploadList);
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

      <Footer />
    </div>
  );
};

export default Mypage;
