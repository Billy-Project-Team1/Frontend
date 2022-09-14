import React from 'react';
import './DetailModal.scss';
import { useNavigate } from 'react-router-dom';

const DetailModal = ({showModal}) => {
	const navigate = useNavigate();

	return (
		<div className="detail_modal_background">
			<div className="detail_modal_container">
				<div className="detail_btn_first">
					<div className="detail_edit_btn">게시물 수정하기</div>
					<div className="detail_del_btn">삭제</div>
				</div>
				<div className="detail_btn_second">
					<div className="detail_cancel_btn" onClick={showModal}>
						취소
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailModal;
