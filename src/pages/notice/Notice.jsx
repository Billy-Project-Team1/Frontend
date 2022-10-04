// React import
import React, { useEffect } from 'react';
// Redux import
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from '../../redux/modules/notificationSlice';
// Component import
import NoticeCard from '../../commponents/noticeCard/NoticeCard';
import Headers2 from '../../commponents/header/Headers2';
// Style import
import './Notice.scss';

const Notice = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getNotification());
	}, []);

	const notice = useSelector((state) => state.notification.notification);
	return (
		<>
			<Headers2 pageName="알림" />
			<div className="notice_wrap">
				<NoticeCard />
			</div>
		</>
	);
};

export default Notice;
