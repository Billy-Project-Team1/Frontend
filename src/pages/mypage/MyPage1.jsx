// React import
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Redux import
import { useDispatch, useSelector } from 'react-redux';
// Slice import 
import { getmyDibsData, getmyUpLoadData } from '../../redux/modules/memberSlice';
import { getProfileThunk } from '../../redux/modules/profileSlice';
// component import
import MyProfileHeader from '../../commponents/myProfile/MyProfileHeader';
import MyPageList from './MyPageList';
import YourPageList from './YourPageList';
import Headers2 from '../../commponents/header/Headers2';
import Footer from '../../commponents/footer/Footer';

const Mypage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileThunk(id));
    dispatch(getmyDibsData());
    dispatch(getmyUpLoadData(id));
  }, []);

  const profile = useSelector((state) => state.myprofile.myProfile);
  const myUserId = localStorage.getItem('userId');

  return (
		<div>
			{myUserId === profile.userId ? (
				<Headers2 pageName="마이 페이지" />
			) : (
				<Headers2 pageName="프로필" />
			)}

			<MyProfileHeader profile={profile} />
			{myUserId === profile.userId ? (
				<MyPageList totalAvg={profile.totalAvg} profile={profile} />
			) : (
				<YourPageList profile={profile} />
			)}

			<Footer />
		</div>
	);
};

export default Mypage;
