// React import
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Style import
import './DetailModal.scss';

const DetailModal = ({ showModal, postId, setModalOn }) => {
	const navigate = useNavigate();

	const modalTrue = () => {
		setModalOn(true);
		showModal();
	};

	return (
		<div className="detailModal_background">
			<div className="detailModal_wrap">
				<div className="detailModal_container">
					<div className="detailModal_btn_first">
						<div
							className="detailModal_edit_btn"
							onClick={() => navigate(`/modifyPosting/${postId}`)}
						>
							게시물 수정하기
						</div>
						<div className="detailModal_del_btn" onClick={modalTrue}>
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

export default DetailModal;
