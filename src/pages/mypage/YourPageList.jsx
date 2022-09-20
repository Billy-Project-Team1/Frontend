import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YourPageMiddle from '../../commponents/myProfile/YourPageMiddle';
import UploadCard from '../../commponents/profileCard/UploadCard';
import { getmyUpLoadData } from '../../redux/modules/memberSlice';

const YourPageList = () => {
  const dispatch = useDispatch();

  const [yourPageState, setYourPageState] = useState('1');
  useEffect(() => {
    dispatch(getmyUpLoadData());
  }, []);

  const myUploadList = useSelector((state) => state.member.myUploadList);
  // console.log(myUploadList)

  return (
    <div>
      <YourPageMiddle
        yourPageState={yourPageState}
        setYourPageState={setYourPageState}
      />
      {yourPageState === '1' ? (
        <div className="mypage_list_margin">
          {myUploadList.map((post,index) => {
            return <UploadCard post={post} key={index}/>;
          })}
        </div>
      ) : yourPageState ==='2'?('댓글'):('')}
    </div>
  );
};

export default YourPageList;
