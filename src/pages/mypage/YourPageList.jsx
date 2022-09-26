// React import 
import React, { useState } from 'react';
// Redux import 
import {  useSelector } from 'react-redux';
// Component import
import YourPageMiddle from '../../commponents/myProfile/YourPageMiddle';
import UploadCard from '../../commponents/profileCard/UploadCard';
import ReviewCardYourPage from '../../commponents/Review/ReviewCardYourPage';

const YourPageList = ({profile}) => {
  const [yourPageState, setYourPageState] = useState('1');
  const myUploadList = useSelector((state) => state.member.myUploadList);
  console.log(myUploadList)

  return (
		<div>
			<YourPageMiddle
				yourPageState={yourPageState}
				setYourPageState={setYourPageState}
			/>
			{yourPageState === '1' ? (
				<div className="mypage_list_margin">
					{myUploadList.map((post, index) => {
						return <UploadCard post={post} key={index} />;
					})}
				</div>
			) : yourPageState === '2' ? (
				<ReviewCardYourPage profile={profile} />
			) : (
				''
			)}
		</div>
	);
};

export default YourPageList;
