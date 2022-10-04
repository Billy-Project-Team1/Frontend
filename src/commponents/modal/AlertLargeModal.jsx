// React import
import React from 'react';
// Style import
import '../../commponents/modal/AlertLargeModal.scss';

const AlertLargeModal = ({
	setLargeModalOpen,
	body1,
	body2,
	onClickSubmit,
	buttonType,
	data,
	data2,
}) => {
	const closeModal = () => {
		setLargeModalOpen(false);
	};

	return (
		<div className="alertModalLargeModal_container">
			<div className="alertModalLargeModal_box">
				<p>{body1}</p>
				<p>{body2}</p>
				<div className="alertModalLargeModal_btns">
					<button className="alertModal_whiteBtn" onClick={closeModal}>
						취소
					</button>
					<button
						className="alertModal_blueBtn"
						onClick={() => onClickSubmit(data, data2)}
					>
						{buttonType}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AlertLargeModal;
