// React import
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux import
import { useDispatch, useSelector } from 'react-redux';
// Stlye import
import './ReservationCard.scss';
// Image import
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
// Slice import
import {
  billyReservationCntThunk,
  billyStateListThunk,
  deliveryDoneThunk,
} from '../../redux/modules/reservationSlice';
// Component import
import CancelButton from './CancelButton';
import AlertLargeModal from '../modal/AlertLargeModal';
import AlertButton from './AlertButton';

const ReservationCard = ({ billyState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reload, setReload] = useState();
  // const [largeModalOpen, setLargeModalOpen] = useState(false);
  // const isModal = () => {
  //   setLargeModalOpen(true);
  // };
  useEffect(() => {
    dispatch(billyStateListThunk(billyState));
  }, []);

  const billylist = useSelector((state) => state.billystate?.billyList);
  // console.log(billylist)

  useEffect(() => {}, [JSON.stringify(billylist)]);

  const rentalTotalDate = (a, b) => {
    return Math.floor(a / b);
  };

  function rentalDate(a) {
    var d = new Date(a);
    return (
      (d.getMonth() + 1 > 9
        ? (d.getMonth() + 1).toString()
        : '0' + (d.getMonth() + 1)) +
      '.' +
      (d.getDate() > 9
        ? d.getDate().toString()
        : '0' + d.getDate().toString()) +
      '(' +
      ('월화수목금토일'.charAt(d.getUTCDay()) + '') +
      ')'
    );
  }

  const dailyPrice = (a) => {
    return a?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const depositPrice = (a) => {
    return a?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const deliveryDoneHandler = async (e) => {
    try {
      const response = await dispatch(deliveryDoneThunk(e)).unwrap();
      if (response) {
        setReload(response);
      }
    } catch {}
  };
  useEffect(() => {
    dispatch(billyStateListThunk(billyState));
    dispatch(billyReservationCntThunk());
  }, [reload]);

  return (
    <div className="reservationcard_first_container">
      {billylist
        ?.slice(0)
        .reverse()
        .map((item, index) => {
          return (
						<div className="reservationcard_container" key={index}>
							<div className="reservationcard_small_container">
								<div className="reservationcard_title_wrap">
									<div className="reservationcard_title">{item.title}</div>
								</div>
								<div className="reservationcard_detail_wrap">
									<img className="reservationcard_img" src={item.postImgUrl} />
									<div className="reservationcard_body_box">
										<div className="reservationcard_icon_box">
											<div className="reservationcard_price">
												<img src={dailycost} />
												<p>{dailyPrice(item.price)}원</p>
											</div>
											<div className="reservationcard_price">
												<img src={deposit} />
												<p>{depositPrice(item.deposit)}원</p>
											</div>
										</div>
										<div className="reservationcard_contents">
											예약일자 : {rentalDate(item.startDate)}&nbsp;⎻&nbsp;
											{rentalDate(item.endDate)}&nbsp;(
											{rentalTotalDate(item.totalAmount, item.price)}박)
										</div>
										<div className="reservationcard_contents">
											예약상태 :&nbsp;
											{billyState === '1'
												? '예약 대기중'
												: billyState === '2'
												? '예약중'
												: billyState === '4'
												? '대여중'
												: billyState === '5'
												? '거래 완료'
												: billyState === '3'
												? '취소 완료'
												: ''}
										</div>
										<div className="reservationcard_name_wrap">
											<div className="reservationcard_name">
												대여자 : {item.jullyNickname}
											</div>
										</div>
										<div className="reservationcard_alert_content">
											{billyState === '2'
												? '• 거래 완료시 수령 완료 버튼을 체크해주세요.'
												: ''}
										</div>
										{billyState === '3' ? (
											<div className="reservationcard_alert_content">
												취소사유 : {item.cancelMessage}
											</div>
										) : (
											''
										)}
									</div>
								</div>
								<div className="reservationcard_btn_wrap">
									{billyState === '1' ? (
										<CancelButton item={item} billyState={billyState} />
									) : billyState === '2' ? (
										item.delivery === true ? (
											<button className="reservationcard_wait_btn">
												승인 대기 중
											</button>
										) : (
											<>
												<AlertButton
													billyState={billyState}
													deliveryDoneHandler={deliveryDoneHandler}
													billyData={item.reservationId}
												/>
											</>
										)
									) : billyState === '4' ? (
										<div style={{ marginBottom: '20px' }} />
									) : billyState === '5' ? (
										<button
											className="reservationcard_btn"
											onClick={() =>
												navigate(
													`/reviewPosting/${item.postId}/${item.reservationId}`
												)
											}
										>
											리뷰 작성
										</button>
									) : billyState === '3' ? (
										<div style={{ marginBottom: '20px' }} />
									) : (
										''
									)}
								</div>
							</div>
						</div>
					);
        })}
    </div>
  );
};
export default ReservationCard;
