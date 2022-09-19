import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyProfileMiddle from '../../commponents/myProfile/MyProfileMiddle';
import UploadCard from '../../commponents/profileCard/UploadCard';
import { getmyUpLoadData } from '../../redux/modules/memberSlice';

const YourPageList = () => {
    const dispatch = useDispatch();
    const [myPageState, setMyPageState] = useState('1');

    useEffect(() => {
        dispatch(getmyUpLoadData());
        
      }, []);
    
  const myUploadList = useSelector((state) => state.member.myUploadList);

  return <div>
    <MyProfileMiddle myPageState={myPageState} setMyPageState={setMyPageState}/>
    {myPageState === '4'? (
        <div className='mypage_list_margin'>{myUploadList.map((post) => {
            return <UploadCard post={post} />;
          })}</div>
    ): myPageState === '5'?(
        <div>리뷰</div>
    ):('')}
  </div>;
};

export default YourPageList;
