// React import
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux import
import { useDispatch, useSelector } from 'react-redux';
import {
	jullyReservationCntThunk,
	jullyStateChangeThunk,
	jullyStateListThunk,
} from '../../redux/modules/reservationSlice';
// Style & Img import
import './ReservationCard.scss';
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
// Component import
import CancelButton from './CancelButton';
import AlertButton from './AlertButton';
import AlertButtonJullyReturn from './AlertButtonJullyReturn';

const JullyReservationCard = ({ jullyState }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [reservationApproved, setReservationApproved] = useState({
		state: '2',
	});
	const [handleDone, setHandleDone] = useState({
		state: '4',
	});
	const [returnDone, setReturnDone] = useState({
		state: '5',
	});

	const [test, setTest] = useState(1);

	useEffect(() => {
		dispatch(jullyStateListThunk(jullyState));
	}, []);
	const jullylist = useSelector((state) => state.billystate?.jullyList);

	useEffect(() => {}, [JSON.stringify(jullylist)]);

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

	const jullyStateHandler = async (a, b) => {
		try {
			const response = await dispatch(jullyStateChangeThunk({ a, b })).unwrap();
			if (response) {
				const newTest = test + 1;
				setTest(newTest);
			}
		} catch {}
	};
	useEffect(() => {
		dispatch(jullyStateListThunk(jullyState));
		dispatch(jullyReservationCntThunk());
	}, [test]);

	return (
		<div className="reservationcard_first_container">
			{jullylist
				?.slice(0)
				.sort()
				.map((item, index) => {
					return (
						<div className="reservationcard_container" key={index}>
							<div className="reservationcard_small_container">
								<div className="reservationcard_title_wrap">
									<div
										className="reservationcard_title"
										onClick={() => navigate(`/detail/${item.postId}`)}
									>
										{item.title}
									</div>
								</div>
								<div className="reservationcard_detail_wrap">
									<img
										className="reservationcard_img"
										src={item.postImgUrl}
										onClick={() => navigate(`/detail/${item.postId}`)}
									/>
									<div className="reservationcard_body_box">
										<div className="reservationcard_icon_box">
											<div className="reservationcard_price">
												<img src={dailycost} />
												<p>{dailyPrice(item.price)}</p>
											</div>
											<div className="reservationcard_price">
												<img src={deposit} />
												<p>{depositPrice(item.deposit)}</p>
											</div>
										</div>
										<div className="reservationcard_contents">
											예약일자 : {rentalDate(item.startDate)}&nbsp;⎻&nbsp;
											{rentalDate(item.endDate)}&nbsp;(
											{rentalTotalDate(item.totalAmount, item.price)}박)
										</div>
										<div className="reservationcard_contents">
											예약상태 :&nbsp;
											{jullyState === '1'
												? '예약 대기중'
												: jullyState === '2'
												? '예약중'
												: jullyState === '4'
												? '대여중'
												: jullyState === '5'
												? '거래 완료'
												: jullyState === '3'
												? '취소 완료'
												: ''}
										</div>
										<div className="reservationcard_name_wrap">
											<div className="reservationcard_name">
												예약자명 : {item.billyNickname}
											</div>
										</div>
										<div className="reservationcard_alert_content">
											{jullyState === '2' && item.delivery === true
												? '• 거래 완료시 전달 완료 버튼을 체크해주세요.'
												: ''}
										</div>
										{jullyState === '3' ? (
											<div className="reservationcard_alert_content">
												취소사유 : {item.cancelMessage}
											</div>
										) : (
											''
										)}
									</div>
								</div>
								<div className="reservationcard_btn_wrap">
									{jullyState === '1' ? (
										<div className="jullyReservation_set_btn">
											<CancelButton item={item} jullyState={jullyState} />
											<button
												className="jullyReservation_btn"
												onClick={() =>
													jullyStateHandler(
														item.reservationId,
														reservationApproved
													)
												}
											>
												승인
											</button>
										</div>
									) : jullyState === '2' ? (
										item.delivery === true ? (
											<>
												<AlertButton
													jullyState={jullyState}
													jullyStateHandler={jullyStateHandler}
													JullyData={item.reservationId}
													JullyHandleDone={handleDone}
													test={test}
												/>
											</>
										) : (
											<CancelButton item={item} jullyState={jullyState} />
										)
									) : jullyState === '4' ? (
										<>
											<AlertButtonJullyReturn
												jullyState={jullyState}
												jullyStateHandler={jullyStateHandler}
												JullyData={item.reservationId}
												JullyReturnDone={returnDone}
												setTest={setTest}
												test={test}
											/>
										</>
									) : jullyState === '5' ? (
										<div style={{ marginBottom: '20px' }} />
									) : jullyState === '3' ? (
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
export default JullyReservationCard;
