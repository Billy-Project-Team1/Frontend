import React from 'react';
import Headers from '../../commponents/header/Headers';

const ModifyPosting = () => {
	const onPostingHandler = async (e) => {

	};
	return (
		<div>
			<Headers
				pageName="글 수정하기"
				onClickSave={onPostingHandler}
				type="완료"
			/>
		</div>
	);
};

export default ModifyPosting;
