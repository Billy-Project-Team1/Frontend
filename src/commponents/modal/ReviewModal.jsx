// React import
import React from 'react';
// Component import
import '../../commponents/header/DetailModal.scss';

const ReviewModal = ({ showModal, setModalOn }) => {
	const modalTrue = () => {
		setModalOn(true);
		showModal();
	};

	return (
		<div className="detailModal_background">
			<div className="detailModal_wrap">
				<div className="detailModal_container">
					<div className="detailModal_btn_first">
						<div className="detailModal_edit_btn">댓글 수정하기</div>
						<div className="detailModal_del_btn" onClick={() => modalTrue()}>
							삭제
						</div>
					</div>
					<div className="detailModal_btn_second">
						<div className="detailModal_cancel_btn" onClick={showModal}>
							취소
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReviewModal;
