import React from 'react';
import NoticeCard from '../../commponents/noticeCard/NoticeCard';
import NoticeHeader from '../../commponents/header/NoticeHeader';

import './Notice.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from '../../redux/modules/notificationSlice';

const Notice = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotification());
  }, []);

  const notice = useSelector((state) => state.notification.notification);
  console.log(notice);
  return (
    <>
      <NoticeHeader pageName="알림" />
      <div className="notice_wrap">
        <NoticeCard />
      </div>
    </>
  );
};

export default Notice;
