// React import
import React, { useState } from 'react';
// Redux import
import { useSelector } from 'react-redux';
// Style import
import './MyPageList.scss';
// Components import
import MyProfileMiddle from '../../commponents/myProfile/MyProfileMiddle';
import BillyNavBar from '../../commponents/reservations/BillyNavBar';
import BillyReservation from '../../commponents/reservations/BillyReservation';
import DibsCard from '../../commponents/profileCard/DibsCard';
import UploadCard from '../../commponents/profileCard/UploadCard';
import JullyNavBar from '../../commponents/reservations/JullyNavBar';
import JullyReservation from '../../commponents/reservations/JullyReservation';
import ReviewCard from '../../commponents/Review/ReviewCard';
import ReviewCardStarAvg from '../../commponents/Review/ReviewCardStarAvg';

const Mypage = ({ totalAvg, profile }) => {
  const [myPageState, setMyPageState] = useState('1');
  const [reservationsState, setReservationsState] = useState('1');
  const myDipList = useSelector((state) => state.member.myDibsList);
  const myUploadList = useSelector((state) => state.member.myUploadList);

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
          {myDipList.map((post, index) => {
            return <DibsCard post={post} key={index} />;
          })}
        </div>
      ) : myPageState === '4' ? (
        <div className="mypage_list_margin">
          {myUploadList.map((post, index) => {
            return <UploadCard post={post} key={index} />;
          })}
        </div>
      ) : myPageState === '5' ? (
        <>
          <ReviewCardStarAvg totalAvg={totalAvg} />
          <ReviewCard profile={profile} />
          {/* <ReviewCardContent profile={profile} /> */}

          {/* <ReviewCard totalAvg={totalAvg} profile={profile} /> */}
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Mypage;
