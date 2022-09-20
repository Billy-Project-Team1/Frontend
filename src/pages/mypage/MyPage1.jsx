import React from 'react';
import Footer from '../../commponents/footer/Footer';
import MyProfileHeader from '../../commponents/myProfile/MyProfileHeader';
import MypageHeader from '../../commponents/header/MypageHeader';
import { useSelector } from 'react-redux';
import MyPageList from './MyPageList';
import YourPageList from './YourPageList';
import AddPostingHeader from '../../commponents/header/MypageHeader';

const Mypage = () => {
  const profile = useSelector((state) => state.myprofile.myProfile);
  const myUserId = localStorage.getItem('userId');

  return (
    <div>
      {myUserId === profile.userId ? (
        <AddPostingHeader pageName="마이 페이지" />
      ) : (
        <AddPostingHeader pageName="프로필" />
      )}

      <MyProfileHeader />
      {myUserId === profile.userId ? <MyPageList /> : <YourPageList />}

      <Footer />
    </div>
  );
};

export default Mypage;
