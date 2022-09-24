import React from 'react';
import NoticeHeader from '../header/NoticeHeader';
import NoticeCard from '../noticeCard/NoticeCard';
import './Notice.scss';

const Notice = () => {
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
