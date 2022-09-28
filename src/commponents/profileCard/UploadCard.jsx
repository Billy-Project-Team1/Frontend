import React from 'react';
import '../mainListCard/MainListCard.scss';
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UploadCard = ({ post }) => {
  const postPrice = post.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const navigate = useNavigate();

  const postDeposit = post.deposit
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (post.length === 0) {
    return;
  }

  return (
    <div
      className="MainListWrap"
      onClick={() => navigate(`/detail/${post.id}`)}
    >
      <div className="MainListCardContainer">
        <div className="MainListCardBox">
          <img className="MainListCardImg" src={post.imgUrl} />
          <div className="MainListCardRightContainer">
            <div className="MainListCardRightBox">
              <div className="MainListCardTitle">
                <div>{post.title}</div>
              </div>
              <div className="MainListCardPlace">{post.location}</div>
              <div className="MainListCardBottomBox">
                <div className="MainListCardPriceBox">
                  <div className="MainListCardIconBox">
                    <img className="MainListCardIcon" src={dailycost} />
                  </div>
                  {postPrice}원
                </div>
                <div className="MainListCardPriceBox">
                  <div className="MainListCardIconBox">
                    <img className="MainListCardIcon" src={deposit} />
                  </div>
                  {postDeposit}원
                </div>
              </div>
              <div className="MainListCardReview">
                <div className="MainListCardStarBox">
                  <FaStar className="MainListCardStar" />
                </div>
                &nbsp;
                <div>{post.avg}</div>
                &nbsp;
                <div>({post.reviewCount})</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCard;
