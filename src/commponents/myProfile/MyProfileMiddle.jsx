import React from 'react';
import './MyProfileMiddle.scss';
import { FaHeart } from 'react-icons/fa';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const MyProfileMiddle = ({ myPageState, setMyPageState }) => {
  return (
    <div className="MyProfileMiddle_Wrap">
      <div className="MyProfileMiddle_Container">
        <div className="MyProfileMiddle_Box" onClick={() => setMyPageState('1')}>
          <div className="MyPorfileMiddle_Icon_Container">
            <div className="MyProfileMiddle_Icon_Box">
              {myPageState === '1' ? (
                <FaHeart className="MyProfileMiddle_Icon_Check" />
              ) : (
                <FaHeart className="MyProfileMiddle_Icon" />
              )}
            </div>
          </div>
          {myPageState === '1' ? (
            <div className="MyProfileMiddle_Text_Check">관심 목록</div>
          ) : (
            <div className="MyProfileMiddle_Text">관심 목록</div>
          )}
        </div>

        <div className="MyProfileMiddle_Box" onClick={() => setMyPageState('2')}>
          <div className="MyPorfileMiddle_Icon_Container">
            <div className="MyProfileMiddle_Icon_Box">
              {myPageState === '2' ? (
                <Icon
                  icon="mdi:hand-extended"
                  className="MyProfileMiddle_Icon_Check"
                />
              ) : (
                <Icon
                  icon="mdi:hand-extended"
                  className="MyProfileMiddle_Icon"
                />
              )}
            </div>
          </div>
          {myPageState === '2' ? (
            <div className="MyProfileMiddle_Text_Check">빌린 예약건</div>
          ) : (
            <div className="MyProfileMiddleText">빌린 예약건</div>
          )}
        </div>
        <div className="MyProfileMiddle_Box" onClick={() => setMyPageState('3')}>
          <div className="MyPorfileMiddle_Icon_Container">
            <div className="MyProfileMiddle_Icon_Box">
              {myPageState === '3' ? (
                <Icon
                  icon="mdi:hand-extended"
                  className="MyProfileMiddle_Icon_Trans_Check"
                />
              ) : (
                <Icon
                  icon="mdi:hand-extended"
                  className="MyProfileMiddle_Icon_Trans"
                />
              )}
            </div>
          </div>
          {myPageState === '3' ? (
            <div className="MyProfileMiddle_Text_Check">빌려준 예약건</div>
          ) : (
            <div className="MyProfileMiddle_Text">빌려준 예약건</div>
          )}
        </div>
        <div className="MyProfileMiddle_Box" onClick={() => setMyPageState('4')}>
          <div className="MyPorfileMiddle_Icon_Container">
            <div className="MyProfileMiddle_Icon_Box">
              {myPageState === '4' ? (
                <Icon
                  icon="fa-solid:shopping-bag"
                  className="MyProfileMiddle_Icon_Check"
                />
              ) : (
                <Icon
                  icon="fa-solid:shopping-bag"
                  className="MyProfileMiddle_Icon"
                />
              )}
            </div>
          </div>
          {myPageState === '4' ? (
            <div className="MyProfileMiddle_Text_Check">업로드 제품</div>
          ) : (
            <div className="MyProfileMiddle_Text">업로드 제품</div>
          )}
        </div>
        <div className="MyProfileMiddle_Box" onClick={() => setMyPageState('5')}>
          <div className="MyPorfileMiddle_Icon_Container">
            <div className="MyProfileMiddle_Icon_Box">
              {myPageState === '5' ? (
                <Icon
                  icon="ic:baseline-rate-review"
                  className="MyProfileMiddle_Icon_Check"
                />
              ) : (
                <Icon
                  icon="ic:baseline-rate-review"
                  className="MyProfileMiddle_Icon"
                />
              )}
            </div>
          </div>
          {myPageState === '5' ? (
            <div className="MyProfileMiddle_Text_Check">리뷰 관리</div>
          ) : (
            <div className="MyProfileMiddle_Text">리뷰 관리</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfileMiddle;
