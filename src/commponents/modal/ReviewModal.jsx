// React import
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux import
import { useDispatch } from 'react-redux';
// Style import
import '../../commponents/header/DetailModal.scss';

const ReviewModal = ({ showModal, postId, setModalOn }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const modalTrue = () => {
		setModalOn(true);
		showModal();
	};
  
	return (
		<div className="detailModal_background">
			<div className="detailModal_container">
				<div className="detailModal_btn_first">
					<div
						className="detailModal_edit_btn"
						onClick={() => navigate(`/modifyPosting/${postId}`)}
					>
						댓글 수정하기
					</div>
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
	);
};

export default ReviewModal;
