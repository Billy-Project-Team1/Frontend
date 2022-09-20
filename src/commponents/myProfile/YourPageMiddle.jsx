import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getmyUpLoadData } from '../../redux/modules/memberSlice';
import { Icon } from '@iconify/react';
import './YourPageMiddle.scss';

const YourPageList = ({yourPageState, setYourPageState}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getmyUpLoadData());
  }, []);

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
                className="yourPageList_icon_check"
              />
              <div className="yourPageList_text_check">업로드 제품</div>
            </div>
          ) : (
            <div className="yourPageList_icon_box">
              <Icon
                icon="fa-solid:shopping-bag"
                className="yourPageList_icon"
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
                className="yourPageList_icon_check"
              />
              <div className="yourPageList_text_check">대여자 리뷰</div>
            </div>
          ) : (
            <div className="yourPageList_icon_box">
              <Icon
                icon="ic:baseline-rate-review"
                className="yourPageList_icon"
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
