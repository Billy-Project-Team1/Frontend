import React, { useEffect } from 'react';
import Footer from '../../commponents/footer/Footer';
import MyProfileHeader from '../../commponents/myProfile/MyProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import MyPageList from './MyPageList';
import YourPageList from './YourPageList';
import Headers2 from '../../commponents/header/Headers2';
import { useParams } from 'react-router-dom';
import { getProfileThunk } from '../../redux/modules/profileSlice';
import { getmyDibsData, getmyUpLoadData } from '../../redux/modules/memberSlice';


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
			{myUserId === profile.userId ? <MyPageList /> : <YourPageList />}

			<Footer />
		</div>
	);
};

export default Mypage;
