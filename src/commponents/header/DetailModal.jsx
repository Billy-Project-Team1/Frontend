import React from 'react';
import './DetailModal.scss';
import { useNavigate } from 'react-router-dom';

const DetailModal = () => {
	const navigate = useNavigate();
	// const [modalOpen, setModalOpen] = useState(false);
	
  // const modalClose = () => {
	// 	setModalOpen(!modalOpen);
	// 	console.log('222');
	// };

	console.log('1111');
	return (
		<div className="detail_modal_container">
			<div className="detail_btn_first">
				<div className="detail_edit_btn">게시물 수정하기</div>
				<div className="detail_del_btn">삭제</div>
			</div>
			<div className="detail_btn_second">
				<div className="detail_cancel_btn"
        // onClick={() => setModalOpen(false)}
        >
					취소
				</div>
			</div>
		</div>
	);
};

export default DetailModal;
