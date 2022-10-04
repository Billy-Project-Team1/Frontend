// React import
import React from 'react';
// Style & Icon import
import './YourPageMiddle.scss';
import { Icon } from '@iconify/react';

const YourPageList = ({ yourPageState, setYourPageState }) => {
	return (
		<div className="yourPageList_wrap">
			<div className="yourPageList_container">
				<div
					className="yourPageList_icon_wrap"
					onClick={() => setYourPageState('1')}
				>
					{yourPageState === '1' ? (
						<div className="yourPageList_icon_box">
							<Icon
								icon="fa-solid:shopping-bag"
								className="yourPageList_icon_upload_check"
							/>
							<div className="yourPageList_text_check">업로드 제품</div>
						</div>
					) : (
						<div className="yourPageList_icon_box">
							<Icon
								icon="fa-solid:shopping-bag"
								className="yourPageList_icon_upload"
							/>
							<div className="yourPageList_text">업로드 제품</div>
						</div>
					)}
				</div>
				<div
					className="yourPageList_icon_wrap"
					onClick={() => setYourPageState('2')}
				>
					{yourPageState === '2' ? (
						<div className="yourPageList_icon_box">
							<Icon
								icon="ic:baseline-rate-review"
								className="yourPageList_icon_review_check"
							/>
							<div className="yourPageList_text_check">대여자 리뷰</div>
						</div>
					) : (
						<div className="yourPageList_icon_box">
							<Icon
								icon="ic:baseline-rate-review"
								className="yourPageList_icon_review"
							/>
							<div className="yourPageList_text">대여자 리뷰</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default YourPageList;
