import React from 'react';
import './MyProfileMiddle.scss';
import { FaHeart } from 'react-icons/fa';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const MyProfileMiddle = ({ myPageState, setMyPageState }) => {
  return (
    <div className="MyProfileMiddleWrap">
      <div className="MyProfileMiddleContainer">
        <div className="MyProfileMiddleBox" onClick={() => setMyPageState('1')}>
          <div className="MyPorfileMiddleIconContainer">
            <div className="MyProfileMiddleIconBox">
              {myPageState === '1' ? (
                <FaHeart className="MyProfileMiddleIconCheck" />
              ) : (
                <FaHeart className="MyProfileMiddleIcon" />
              )}
            </div>
          </div>
          {myPageState === '1' ? (
            <div className="MyProfileMiddleTextCheck">관심 목록</div>
          ) : (
            <div className="MyProfileMiddleText">관심 목록</div>
          )}
        </div>

        <div className="MyProfileMiddleBox" onClick={() => setMyPageState('2')}>
          <div className="MyPorfileMiddleIconContainer">
            <div className="MyProfileMiddleIconBox">
              {myPageState === '2' ? (
                <Icon
                  icon="mdi:hand-extended"
                  className="MyProfileMiddleIconCheck"
                />
              ) : (
                <Icon
                  icon="mdi:hand-extended"
                  className="MyProfileMiddleIcon"
                />
              )}
            </div>
          </div>
          {myPageState === '2' ? (
            <div className="MyProfileMiddleTextCheck">빌린 예약건</div>
          ) : (
            <div className="MyProfileMiddleText">빌린 예약건</div>
          )}
        </div>
        <div className="MyProfileMiddleBox" onClick={() => setMyPageState('3')}>
          <div className="MyPorfileMiddleIconContainer">
            <div className="MyProfileMiddleIconBox">
              {myPageState === '3' ? (
                <Icon
                  icon="mdi:hand-extended"
                  className="MyProfileMiddleIconTransCheck"
                />
              ) : (
                <Icon
                  icon="mdi:hand-extended"
                  className="MyProfileMiddleIconTrans"
                />
              )}
            </div>
          </div>
          {myPageState === '3' ? (
            <div className="MyProfileMiddleTextCheck">빌려준 예약건</div>
          ) : (
            <div className="MyProfileMiddleText">빌려준 예약건</div>
          )}
        </div>
        <div className="MyProfileMiddleBox" onClick={() => setMyPageState('4')}>
          <div className="MyPorfileMiddleIconContainer">
            <div className="MyProfileMiddleIconBox">
              {myPageState === '4' ? (
                <Icon
                  icon="fa-solid:shopping-bag"
                  className="MyProfileMiddleIconCheck"
                />
              ) : (
                <Icon
                  icon="fa-solid:shopping-bag"
                  className="MyProfileMiddleIcon"
                />
              )}
            </div>
          </div>
          {myPageState === '4' ? (
            <div className="MyProfileMiddleTextCheck">업로드 제품</div>
          ) : (
            <div className="MyProfileMiddleText">업로드 제품</div>
          )}
        </div>
        <div className="MyProfileMiddleBox" onClick={() => setMyPageState('5')}>
          <div className="MyPorfileMiddleIconContainer">
            <div className="MyProfileMiddleIconBox">
              {myPageState === '5' ? (
                <Icon
                  icon="ic:baseline-rate-review"
                  className="MyProfileMiddleIconCheck"
                />
              ) : (
                <Icon
                  icon="ic:baseline-rate-review"
                  className="MyProfileMiddleIcon"
                />
              )}
            </div>
          </div>
          {myPageState === '5' ? (
            <div className="MyProfileMiddleTextCheck">리뷰 관리</div>
          ) : (
            <div className="MyProfileMiddleText">리뷰 관리</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfileMiddle;
