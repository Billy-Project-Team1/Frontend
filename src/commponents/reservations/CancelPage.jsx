import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AddPostingHeader from '../header/AddPostingHeader';
import './CancelPage.scss';
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../redux/modules/postSlice';

const CancelPage = () => {
//     const location = useLocation();
//     const title = location.state.title;
//     const price = location.state.price;
//   {
    /* <div>{title}</div>
      <div>{price}</div> */
      const dispatch = useDispatch();


  return (
    <div>
      <AddPostingHeader pageName="대여 예약 취소" />
      <div className="cancelpage_wrap">
        <div className="cancelpage_container">
          <div className="cancelpage_img"></div>
          <div className="cancelpage_content_box">
            <p>title</p>
            <div className="cancelpagae_price_wrap">
              <div className="cancelpage_price_box">
                <img className="cancelpage_icon" src={dailycost} />
                <p>5000</p>
              </div>
              <div className="cancelpage_price_box">
                <img className="cancelpage_icon" src={deposit} />
                <p>490000</p>
              </div>
            </div>
          </div>
        </div>
        <div className='cancelpage_body'>취소 사유</div>
      </div>
    </div>
  );
};

export default CancelPage;
