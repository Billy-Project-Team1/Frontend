// React import
import React, { useState } from 'react';
// Component import
import CancelPage from './CancelPage';

const CancelButton = ({ item, billyState, jullyState }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const showModal = () => {
		setModalOpen(true);
	};

	return (
		<>
			{billyState === '1' ? (
				<>
					{' '}
					<button className="reservationcard_btn" onClick={() => showModal()}>
						예약 취소
					</button>
					{modalOpen && (
						<CancelPage
							setModalOpen={setModalOpen}
							title={item.title}
							dailyPrice={item.price}
							depositPrice={item.deposit}
							img={item.postImgUrl}
							startDate={item.startDate}
							endDate={item.endDate}
							totalAmount={item.totalAmount}
							reservationId={item.reservationId}
							billyState={billyState}
						/>
					)}
				</>
			) : jullyState === '1' ? (
				<>
					<button className="jullyReservation_btn" onClick={() => showModal()}>
						예약 취소
					</button>
					{modalOpen && (
						<CancelPage
							setModalOpen={setModalOpen}
							title={item.title}
							dailyPrice={item.price}
							depositPrice={item.deposit}
							img={item.postImgUrl}
							startDate={item.startDate}
							endDate={item.endDate}
							totalAmount={item.totalAmount}
							reservationId={item.reservationId}
							jullyState={jullyState}
						/>
					)}
				</>
			) : jullyState === '2' ? (
				<>
					<button className="reservationcard_btn" onClick={() => showModal()}>
						예약 취소
					</button>
					{modalOpen && (
						<CancelPage
							setModalOpen={setModalOpen}
							title={item.title}
							dailyPrice={item.price}
							depositPrice={item.deposit}
							img={item.postImgUrl}
							startDate={item.startDate}
							endDate={item.endDate}
							totalAmount={item.totalAmount}
							reservationId={item.reservationId}
							jullyState={jullyState}
						/>
					)}
				</>
			) : (
				''
			)}
		</>
	);
};

export default CancelButton;
