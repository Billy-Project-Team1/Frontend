import React from 'react';
import './MyProfileMiddle.scss';
import { FaHeart } from 'react-icons/fa';
import { Icon } from '@iconify/react';

const MyProfileMiddle = ({ myPageState, setMyPageState }) => {
  return (
    <div className="MyProfileMiddle_wrap">
      <div className="MyProfileMiddle_container">
        <div className="MyProfileMiddle_box" onClick={() => setMyPageState('1')}>
          <div className="MyPorfileMiddle_icon_container">
            <div className="MyProfileMiddle_icon_box">
              {myPageState === '1' ? (
                <FaHeart className="MyProfileMiddle_icon_check" />
              ) : (
                <FaHeart className="MyProfileMiddle_icon" />
              )}
            </div>
          </div>
          {myPageState === '1' ? (
            <div className="MyProfileMiddle_text_check">관심 목록</div>
          ) : (
            <div className="MyProfileMiddle_text">관심 목록</div>
          )}
        </div>

        <div className="MyProfileMiddle_box" onClick={() => setMyPageState('2')}>
          <div className="MyPorfileMiddle_icon_container">
            <div className="MyProfileMiddle_icon_box">
              {myPageState === '2' ? (
                <Icon
                  icon="mdi:hand-extended"
                  className="MyProfileMiddle_icon_check"
                />
              ) : (
                <Icon
                  icon="mdi:hand-extended"
                  className="MyProfileMiddle_icon"
                />
              )}
            </div>
          </div>
          {myPageState === '2' ? (
            <div className="MyProfileMiddle_text_check">빌린 예약건</div>
          ) : (
            <div className="MyProfileMiddle_text">빌린 예약건</div>
          )}
        </div>
        <div className="MyProfileMiddle_box" onClick={() => setMyPageState('3')}>
          <div className="MyPorfileMiddle_icon_container">
            <div className="MyProfileMiddle_icon_box">
              {myPageState === '3' ? (
                <Icon
                  icon="mdi:hand-extended"
                  className="MyProfileMiddle_icon_trans_check"
                />
              ) : (
                <Icon
                  icon="mdi:hand-extended"
                  className="MyProfileMiddle_icon_trans"
                />
              )}
            </div>
          </div>
          {myPageState === '3' ? (
            <div className="MyProfileMiddle_text_check">빌려준 예약건</div>
          ) : (
            <div className="MyProfileMiddle_text">빌려준 예약건</div>
          )}
        </div>
        <div className="MyProfileMiddle_box" onClick={() => setMyPageState('4')}>
          <div className="MyPorfileMiddle_icon_container">
            <div className="MyProfileMiddle_icon_box">
              {myPageState === '4' ? (
                <Icon
                  icon="fa-solid:shopping-bag"
                  className="MyProfileMiddle_icon_check"
                />
              ) : (
                <Icon
                  icon="fa-solid:shopping-bag"
                  className="MyProfileMiddle_icon"
                />
              )}
            </div>
          </div>
          {myPageState === '4' ? (
            <div className="MyProfileMiddle_text_check">업로드 제품</div>
          ) : (
            <div className="MyProfileMiddle_text">업로드 제품</div>
          )}
        </div>
        <div className="MyProfileMiddle_box" onClick={() => setMyPageState('5')}>
          <div className="MyPorfileMiddle_icon_container">
            <div className="MyProfileMiddle_icon_box">
              {myPageState === '5' ? (
                <Icon
                  icon="ic:baseline-rate-review"
                  className="MyProfileMiddle_icon_check"
                />
              ) : (
                <Icon
                  icon="ic:baseline-rate-review"
                  className="MyProfileMiddle_icon"
                />
              )}
            </div>
          </div>
          {myPageState === '5' ? (
            <div className="MyProfileMiddle_text_check">리뷰 관리</div>
          ) : (
            <div className="MyProfileMiddle_text">리뷰 관리</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfileMiddle;
