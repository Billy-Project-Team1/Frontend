import React from 'react';
import Footer from '../../commponents/footer/Footer';
import MyProfileHeader from '../../commponents/myProfile/MyProfileHeader';
import MypageHeader from '../../commponents/header/MypageHeader';

const Mypage = () => {
  return (
    <div>
      <MypageHeader />
      <MyProfileHeader />
      <Footer />
    </div>
  );
};

export default Mypage;
