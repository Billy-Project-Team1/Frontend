import React from 'react';
import './MainListCard.scss';
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
import carrotImg from '../../static/image/carrotImg.jpg';
import { FaStar } from 'react-icons/fa';

const MainListCard = () => {
  return (
    <div className="MainListWrap">
      <div className="MainListCardContainer">
        <div className="MainListCardBox">
          <img className="MainListCardImg" src={carrotImg} />
          <div className="MainListCardRightContainer">
            <div className="MainListCardRightBox">
              <div className="MainListCardTitle">
                <div>코스트코 책장</div>
              </div>
              <div className="MainListCardPlace">서울시 서초구 양재동</div>
              <div className="MainListCardBottomBox">
                <div className="MainListCardPriceBox">
                  <div className="MainListCardIconBox">
                    <img className="MainListCardIcon" src={dailycost} />
                  </div>
                  49,000원
                </div>
                <div className="MainListCardPriceBox">
                  <div className="MainListCardIconBox">
                    <img className="MainListCardIcon" src={deposit} />
                  </div>
                  100,000원
                </div>
                <div className="MainListCardReview">
                  <div className="MainListCardStarBox">
                    <FaStar className="MainListCardStar" />
                  </div>
                  <div>5.0</div>
                  &nbsp; 
                  <div>(1)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainListCard;
