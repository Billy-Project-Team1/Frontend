// React import
import React, { useEffect, useState } from 'react';
// Redux import
import { useDispatch } from 'react-redux';
// Style import
import './CancelPage.scss';
// Image import
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
// Icon import
import { HiOutlineChevronLeft } from 'react-icons/hi';
// Slice import
import {
	billyReservationCntThunk,
	billyStateListThunk,
	jullyReservationCntThunk,
	jullyStateChangeThunk,
	jullyStateListThunk,
	reservationCancelThunk,
} from '../../redux/modules/reservationSlice';

const CancelPage = ({
	setModalOpen,
	title,
	dailyPrice,
	depositPrice,
	img,
	startDate,
	endDate,
	totalAmount,
	reservationId,
	billyState,
	jullyState,
}) => {
	const dispatch = useDispatch();
	const closeModal = () => {
		setModalOpen(false);
	};
	const [cancelMessage, setCancelMessage] = useState({
		cancelMessage: '',
	});
	const [jullyCancelMessage, setJullyCancelMessage] = useState({
		cancelMessage: '',
		state: '3',
	});

	const [reload, setReload] = useState(false);
	const [stateReload, setStateReload] = useState(false);
	const [btnState, setBtnState] = useState(false);
	const [JullyBtnState, JullySetBtnState] = useState(false);

	const dailyPriceComma = (a) => {
		return a?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};
	const depositComma = (a) => {
		return a?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};
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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCancelMessage({ ...cancelMessage, [name]: value });
		if (cancelMessage.cancelMessage.length >= 0) {
			setBtnState(true);
		} else {
			setBtnState(false);
		}
	};

	const jullyhandleChange = (e) => {
		const { name, value } = e.target;
		setJullyCancelMessage({ ...jullyCancelMessage, [name]: value });
		if (jullyCancelMessage.cancelMessage.length >= 0) {
			JullySetBtnState(true);
		} else {
			JullySetBtnState(false);
		}
	};

	const cancelHandler = async (a, b) => {
		try {
			const response = await dispatch(
				reservationCancelThunk({ a, b })
			).unwrap();
			if (response) {
				setReload(true);
			}
		} catch {}
	};
	useEffect(() => {
		if (billyState !== undefined && reload == true) {
			async function fetchBillyState() {
				dispatch(billyStateListThunk(billyState));
				const response = await dispatch(billyReservationCntThunk()).unwrap();
				if (response) {
					closeModal();
				}
			}
			fetchBillyState();
		}
	}, [reload]);

	const jullyCancelHandler = async (a, b) => {
		try {
			const response = await dispatch(jullyStateChangeThunk({ a, b })).unwrap();
			if (response) {
				setStateReload(true);
			}
		} catch {}
	};
	useEffect(() => {
		if (jullyState !== undefined && stateReload == true) {
			async function fetchJullyState() {
				dispatch(jullyStateListThunk(jullyState));
				const response = await dispatch(jullyReservationCntThunk()).unwrap();
				if (response) {
					closeModal();
				}
			}
			fetchJullyState();
		}
	}, [stateReload]);

	return (
		<div className="cancelpage_modal">
			<div className="cancelpage_wrap">
				<div className="cancelpage_header_wrap">
					<div className="cancelpage_header_content">
						<HiOutlineChevronLeft
							color="#212121"
							size="24px"
							cursor="pointer"
							onClick={closeModal}
						/>
						<div className="cancelpage_header_title">대여 예약 취소</div>
					</div>
				</div>
				<div className="cancelpage_container">
					<img className="cancelpage_img" src={img} />
					<div className="cancelpage_content_box">
						<div className="cancelpage_title">{title}</div>
						<div className="cancelpagae_price_wrap">
							<div className="cancelpage_price_box">
								<img className="cancelpage_icon" src={dailycost} />
								<p>{dailyPriceComma(dailyPrice)}</p>
							</div>
							<div className="cancelpage_price_box">
								<img className="cancelpage_icon" src={deposit} />
								<p>{depositComma(depositPrice)}</p>
							</div>
						</div>
						<div className="cancelpage_date">
							예약일자 : {rentalDate(startDate)}~{rentalDate(endDate)}&nbsp;(
							{rentalTotalDate(totalAmount, dailyPrice)}박)
						</div>
					</div>
				</div>
				<div className="cancelpage_body">취소 사유</div>
				<div className="cnaclepage_select_body">
					{billyState === '1' ? (
						<select
							name="cancelMessage"
							value={cancelMessage.cancelMessage}
							onChange={handleChange}
							className="cancelpage_select"
						>
							<option value="" disabled>
								사유를 선택해주세요
							</option>
							<option value="단순변심">상품이 마음에 들지 않아요</option>
							<option value="예약날짜 변경">
								다른 날짜로 재예약할 예정이에요
							</option>
							<option value="주문 취소">
								더 이상 필요하지 않아요
							</option>
						</select>
					) : jullyState === '1' ? (
						<select
							name="cancelMessage"
							value={jullyCancelMessage.cancelMessage}
							onChange={jullyhandleChange}
							className="cancelpage_select"
						>
							<option value="" disabled>
								사유를 선택해주세요
							</option>
							<option value="상품 삭제">상품이 삭제되었어요</option>
							<option value="대여 불가">
								해당 제품을 아직 수령받지 못했어요
							</option>
							<option value="상품불량/파손">
								상품 파손으로 대여 불가능한 상태에요
							</option>
						</select>
					) : jullyState === '2' ? (
						<select
							name="cancelMessage"
							value={jullyCancelMessage.cancelMessage}
							onChange={jullyhandleChange}
							className="cancelpage_select"
						>
							<option value="" disabled>
								사유를 선택해주세요
							</option>
							<option value="상품 삭제">상품이 삭제되었어요</option>
							<option value="대여 불가">
							해당 제품을 아직 수령받지 못했어요
							</option>
							<option value="상품불량/파손">
								상품 파손으로 대여 불가능한 상태에요
							</option>
						</select>
					) : (
						''
					)}
				</div>
				<div className="cancelpage_cancel_btn_wrap">
					{billyState === '1' ? (
						<button
							className="cancelpage_cancel_btn"
							onClick={() => cancelHandler(reservationId, cancelMessage)}
							disabled={btnState ? false : true}
						>
							예약 취소하기
						</button>
					) : jullyState === '1' ? (
						<button
							className="cancelpage_cancel_btn"
							onClick={() =>
								jullyCancelHandler(reservationId, jullyCancelMessage)
							}
							disabled={JullyBtnState ? false : true}
						>
							예약 취소하기
						</button>
					) : jullyState === '2' ? (
						<button
							className="cancelpage_cancel_btn"
							onClick={() =>
								jullyCancelHandler(reservationId, jullyCancelMessage)
							}
							disabled={JullyBtnState ? false : true}
						>
							예약 취소하기
						</button>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};

export default CancelPage;
