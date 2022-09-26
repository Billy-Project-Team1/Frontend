import React from 'react';
import NoticeCard from '../../commponents/noticeCard/NoticeCard';

import './Notice.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from '../../redux/modules/notificationSlice';
import Headers2 from '../../commponents/header/Headers2';

const Notice = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotification());
  }, []);

  const notice = useSelector((state) => state.notification.notification);
  console.log(notice);
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
