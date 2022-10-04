// React import
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// Redux import
import { jullyStateChangeThunk } from '../../redux/modules/reservationSlice';
// Component import
import AlertLargeModal from '../modal/AlertLargeModal';

const AlertButtonJullyReturn = ({
	jullyState,
	JullyData,
	JullyReturnDone,
	setTest,
	test,
}) => {
	const dispatch = useDispatch();
	const [largeModalOpen, setLargeModalOpen] = useState(false);
	const isModal = () => {
		setLargeModalOpen(true);
	};
	const jullyStateHandler = async (a, b) => {
		try {
			const response = await dispatch(jullyStateChangeThunk({ a, b })).unwrap();
			if (response) {
				const newTest = test + 1;
				setTest(newTest);
				setLargeModalOpen(false);
			}
		} catch {}
	};

	return (
		<>
			{jullyState === '4' ? (
				<>
					<button className="reservationcard_btn" onClick={isModal}>
						반납 완료
					</button>
					{largeModalOpen && (
						<AlertLargeModal
							setLargeModalOpen={setLargeModalOpen}
							body1="반납 완료시 대여가 확정됩니다."
							body2="반납을 완료하시겠습니까?"
							buttonType="반납 완료"
							onClickSubmit={jullyStateHandler}
							data={JullyData}
							data2={JullyReturnDone}
						/>
					)}
				</>
			) : (
				''
			)}
		</>
	);
};

export default AlertButtonJullyReturn;
