import React from 'react';
import './MainListCard.scss';
import carrotImg from '../../static/image/carrotImg.jpg';

const MainListCard = () => {
  return (
    <div className="MainListCardContainer">
      <img className="MainListCardImg" src={carrotImg} />
      <div className="MainListCardRightBox">
        <div className="MainListCardTitle">
          아무튼 내가 최고 최고심 마우스 패드
        </div>
        <div className="MainListCardPlace">서울시 서초구 양재동</div>
        <div>
            
        </div>
      </div>
    </div>
  );
};

export default MainListCard;
