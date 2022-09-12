import React from 'react';
import Footer from '../../commponents/footer/Footer';
import MyProfileHeader from '../../commponents/myProfile/MyProfileHeader';
import MypageHeader from '../../commponents/header/MypageHeader';
import MyProfileMiddle from '../../commponents/myProfile/MyProfileMiddle';

const Mypage = () => {
  return (
    <div>
      <MypageHeader />
      <MyProfileHeader />
      <MyProfileMiddle />
      <Footer />
    </div>
  );
};

export default Mypage;
